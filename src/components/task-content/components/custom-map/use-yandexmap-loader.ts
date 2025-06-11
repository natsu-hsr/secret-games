import {useEffect, useRef, useState, type MutableRefObject} from 'react';

import type {MapDataDto} from '../../../../store/slices/task-slice';

interface UseYandexMapLoaderArgs {
  mapData: MapDataDto | undefined;
  mapRef: MutableRefObject<HTMLDivElement | null>;
}

export const useYandexMapLoader = ({mapData, mapRef}: UseYandexMapLoaderArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  const geoObjectsRef = useRef<typeof ymaps.Placemark[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ymaps, setYmaps] = useState<any>(null);

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

    // массив координат для автоцентрирования и автозума по крайним точкам
    const bounds = [];

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
      bounds.push(p.coordinates);
    });

    // автоцентрирование
    if (bounds.length) {
      map.setBounds(ymaps.geoQuery(map.geoObjects).getBounds(), {checkZoomRange: true});
    }
  }, [mapData, isLoaded, ymaps]);

  return {
    isLoaded,
    error,
    ymaps,
  };
};