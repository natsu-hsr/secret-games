import {useEffect, useRef, useState, type MutableRefObject} from 'react';
import type {Polyline, Map as YMap, Placemark as YPlacemark} from 'yandex-maps';

import {useAppDispatch} from '@store/config/hooks';
import {taskSliceActions, type MapConnection, type MapDataDto} from '@store/slices/task-slice';

interface UseYandexMapLoaderArgs {
  mapRef: MutableRefObject<HTMLDivElement | null>;
  mapData: MapDataDto | undefined;
  connections: MapConnection[] | undefined;
}

export const useYandexMapLoader = ({mapData, mapRef, connections}: UseYandexMapLoaderArgs) => {
  const dispatch = useAppDispatch();
  const mapInstanceRef = useRef<YMap | null>(null); // карта
  const geoObjectsRef = useRef<YPlacemark[]>([]); // метки
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routeObjects = useRef<(Polyline | any)[]>([]); // маршруты

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [ymaps, setYmaps] = useState<typeof window.ymaps | null>(null);

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
    if (!mapData?.length) return;

    const center = mapData?.[0]?.coordinates;

    if (!center) {
      console.error('Центральная точка не найдена')
      return;
    }

    mapInstanceRef.current = new ymaps.Map(mapRef.current, {
      center,
      zoom: 3,
      controls: ['zoomControl'],
    });
  }, [isLoaded, mapData, ymaps, mapRef]);

  // маркеры
  useEffect(() => {
    if (!isLoaded || !ymaps || !mapInstanceRef.current || !mapData) return;

    const map = mapInstanceRef.current;
    map.geoObjects.removeAll();

    geoObjectsRef.current = [];

    mapData.forEach(p => {
      const placemark = new ymaps.Placemark(
        p.coordinates,
        {
          id: p.id,
          iconCaption: p.name,
          iconContent: p.labelType.includes('Stretchy') ? p.name : undefined,
        },
        {
          draggable: p.draggable,
          preset: p.labelType,
        }
      );

      if (p.draggable && p.tileId) {
        placemark.events.add('dragend', () => {
          const coords = placemark.geometry?.getCoordinates() as [number, number];
          dispatch(taskSliceActions.addTileMarkerCoordinates({tileId: p.tileId!, coordinates: coords}))
        })
      }

      map.geoObjects.add(placemark);
      geoObjectsRef.current.push(placemark);
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
  }, [mapData, isLoaded, ymaps]);

  // маршруты
  useEffect(() => {
    if (!isLoaded || !mapData || !mapInstanceRef.current || !ymaps || !connections) return;

    routeObjects.current.forEach(obj => mapInstanceRef.current!.geoObjects.remove(obj));
    routeObjects.current = [];

    const map = mapInstanceRef.current!;
    // lookup id → coords
    const coordById = Object.fromEntries(
      mapData.map(p => [p.id, p.coordinates] as const)
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

      // находим сами метки
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
  }, [connections, mapData, ymaps, isLoaded]);

  return {
    isLoaded,
    error,
    ymaps,
  };
};