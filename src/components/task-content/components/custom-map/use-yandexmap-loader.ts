import {useEffect, useRef, useState, type MutableRefObject} from 'react';
import type {Map as YMap, Placemark as YPlacemark} from 'yandex-maps';

import type {MapDataDto} from '@store/slices/task-slice';

interface UseYandexMapLoaderArgs {
  mapData: MapDataDto | undefined;
  mapRef: MutableRefObject<HTMLDivElement | null>;
}

export const useYandexMapLoader = ({mapData, mapRef}: UseYandexMapLoaderArgs) => {
  const mapInstanceRef = useRef<YMap | null>(null);
  const geoObjectsRef = useRef<YPlacemark[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [ymaps, setYmaps] = useState<typeof window.ymaps | null>(null);

  console.log('mapData=', mapData)

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

  useEffect(() => {
    if (mapData === undefined && mapInstanceRef.current) {
      mapInstanceRef.current.destroy();
      mapInstanceRef.current = null;
      geoObjectsRef.current = [];
    }
  }, [mapData]);

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
      controls: ["zoomControl"],
    });
  }, [isLoaded, mapData, ymaps]);

  useEffect(() => {
    if (!isLoaded || !ymaps || !mapInstanceRef.current || !mapData) return;

    const map = mapInstanceRef.current;
    map.geoObjects.removeAll();

    geoObjectsRef.current = [];

    mapData.forEach(p => {
      const placemark = new ymaps.Placemark(
        p.coordinates,
        {
          iconCaption: p.name ?? 'Точка',
        },
        {
          draggable: p.draggable,
          // preset: p.labelType,
          iconColor: "#0095b6",
        }
      );

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
  }, [mapData, isLoaded, ymaps]);

  return {
    isLoaded,
    error,
    ymaps,
  };
};