import {useEffect, useRef, useState, type MutableRefObject} from 'react';
import type {Polyline, Map as YMap, Placemark as YPlacemark} from 'yandex-maps';

import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {selectTaskCommonData, taskSliceActions, type MapData} from '@store/slices/task-slice';

const ACTIVE_PLACEMARK_PRESET = 'islands#yellowIcon';
const ACTIVE_PLACEMARK_STRETCHY_PRESET = 'islands#yellowStretchyIcon';

interface UseYandexMapLoaderArgs {
  mapRef: MutableRefObject<HTMLDivElement | null>;
  mapData: MapData | undefined;
}

export const useYandexMapLoader = ({mapData, mapRef}: UseYandexMapLoaderArgs) => {
  const dispatch = useAppDispatch();
  const mapInstanceRef = useRef<YMap | null>(null); // карта
  const geoObjectsRef = useRef<YPlacemark[]>([]); // метки
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routeObjects = useRef<(Polyline | any)[]>([]); // маршруты

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [ymaps, setYmaps] = useState<typeof window.ymaps | null>(null);

  const {selectedPlacemarkId} = useAppSelector(selectTaskCommonData) ?? {};

  const {placemarks, connections} = mapData ?? {};

  // Загрузка карты
  useEffect(() => {
    const loadYandexMap = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.ymaps) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${import.meta.env.VITE_YMAPS_API_KEY}&lang=ru_RU`;
        script.type = 'text/javascript';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Не удалось загрузить Yandex Maps API'));
        document.head.appendChild(script);
      });
    };

    loadYandexMap()
      .then(() => {
        window.ymaps.ready(() => {
          setIsLoaded(true);
          setYmaps(window.ymaps);
        });
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, []);

  // Когда данных с бэка нету, стираем предыдущие данные с карты
  useEffect(() => {
    if (mapData === undefined && mapInstanceRef.current) {
      mapInstanceRef.current.destroy();
      mapInstanceRef.current = null;
      geoObjectsRef.current = [];
      routeObjects.current = []; 
    }
  }, [mapData]);

  // Иниицализируем карту, добавляем центральную точку
  useEffect(() => {
    if (!isLoaded || !ymaps || !mapRef.current || mapInstanceRef.current) return;
    if (!placemarks?.length) return;

    const center = placemarks?.[0]?.coordinates;

    if (!center) {
      console.error('Центральная точка не найдена')
      return;
    }

    mapInstanceRef.current = new ymaps.Map(mapRef.current, {
      center,
      zoom: 3,
      controls: ['zoomControl'],
    });
  }, [isLoaded, placemarks, ymaps, mapRef]);

  // маркеры
  useEffect(() => {
    if (!isLoaded || !ymaps || !mapInstanceRef.current || !mapData) return;

    const map = mapInstanceRef.current;
    map.geoObjects.removeAll();

    geoObjectsRef.current = [];

    placemarks?.forEach(p => {
      const currentPreset = (() => {
        if (p.id !== selectedPlacemarkId) {
          return p.labelType;
        }

        return p.labelType?.includes('Stretchy') ? ACTIVE_PLACEMARK_STRETCHY_PRESET : ACTIVE_PLACEMARK_PRESET;
      })();

      const yaPlacemark = new ymaps.Placemark(
        p.coordinates,
        {
          id: p.id,
          iconCaption: p.name,
          iconContent: p.labelType.includes('Stretchy') ? p.name : undefined,
        },
        {
          draggable: p.draggable,
          preset: currentPreset,
        }
      );

      if (p.draggable && p.tileId) {
        yaPlacemark.events.add('dragend', () => {
          const coords = yaPlacemark.geometry?.getCoordinates() as [number, number];
          dispatch(taskSliceActions.addTileMarkerCoordinates({tileId: p.tileId!, coordinates: coords}))
        })
      }

      map.geoObjects.add(yaPlacemark);
      geoObjectsRef.current.push(yaPlacemark);
    });

    // автоцентрирование
    if (geoObjectsRef.current.length > 0) {
      const geoQueryResult = ymaps.geoQuery(geoObjectsRef.current);
      const bounds = geoQueryResult.getBounds();

      if (bounds) {
        map.setBounds(bounds, {checkZoomRange: true});
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapData, selectedPlacemarkId, isLoaded, ymaps]);

  // маршруты
  useEffect(() => {
    if (!isLoaded || !mapInstanceRef.current || !ymaps || !connections) return;
    if (!placemarks?.length) return;

    routeObjects.current.forEach(obj => mapInstanceRef.current!.geoObjects.remove(obj));
    routeObjects.current = [];

    const map = mapInstanceRef.current!;
    // lookup id → coords
    const coordById = Object.fromEntries(
      placemarks.map(p => [p.id, p.coordinates] as const)
    );

    connections.forEach(conn => {
      let fromCoord = coordById[conn.fromId];
      let toCoord   = coordById[conn.toId];
      if (!fromCoord || !toCoord) {
        return;
      }

      const multiRoute = new ymaps.multiRouter.MultiRoute(
        {
          referencePoints: [fromCoord, toCoord],
          params: {
            routingMode: 'auto',
            results: 1,
          }
        },
        {
          boundsAutoApply: false,
          wayPointVisible: false,
          routeStrokeColor: '#ffbb00',
          routeActiveStrokeColor: '#ffbb00',
          pinIconFillColor: '#ff0000',
          routeStrokeWidth: 5,
        }
      );
      map.geoObjects.add(multiRoute);
      routeObjects.current.push(multiRoute);

      const placemarkFrom = geoObjectsRef.current.find(p => String(p.properties.get('id')) === conn.fromId);
      const placemarkTo = geoObjectsRef.current.find(p => String(p.properties.get('id')) === conn.toId);

      // если метки draggable, добавляем слушатель
      [{pm: placemarkFrom, isFrom: true}, {pm: placemarkTo, isFrom: false}]
        .forEach(({pm, isFrom}) => {
          if (!pm) return;
          pm.events.add('dragend', () => {
            // получаем новые координаты
            const coords = pm.geometry?.getCoordinates() as [number, number];
            if (isFrom) {
              fromCoord = coords;
            } else {
              toCoord = coords;
            }
            // пересоздаём маршрут
            multiRoute.model.setReferencePoints([fromCoord, toCoord]);
          });
        });

    });
  }, [connections, placemarks, ymaps, isLoaded]);

  return {
    isLoaded,
    error,
    ymaps,
  };
};