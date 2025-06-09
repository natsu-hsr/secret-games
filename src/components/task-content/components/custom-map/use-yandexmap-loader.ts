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


  useEffect(() => {
    const loadYandexMap = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.ymaps) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        console.log('APU KEY=', import.meta.env.VITE_YMAPS_API_KEY);
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
    if (!isLoaded || !ymaps || !mapRef.current || mapInstanceRef.current) return;

    const center = mapData?.[0]?.coordinates;

    if (!center) {
      console.error('Центральная точка не найдена')
      return;
    }

    mapInstanceRef.current = new ymaps.Map(mapRef.current, {
      center,
      zoom: 5,
      controls: ["zoomControl"],
    });
  }, [isLoaded, ymaps]);

  useEffect(() => {
    if (!isLoaded || !ymaps || !mapInstanceRef.current || !mapData) return;

    const map = mapInstanceRef.current;
    map.geoObjects.removeAll();

    geoObjectsRef.current.forEach(placemark => map.geoObjects.remove(placemark));

    mapData.forEach(p => {
      const placemark = new ymaps.Placemark(
        p.coordinates,
        {
          iconCaption: p.name,
        },
        {
          draggable: p.draggable,
          preset: p.labelType,
          iconColor: "#0095b6",
        }
      );

      map.geoObjects.add(placemark);
      geoObjectsRef.current.push(placemark);
    });

    if (mapData?.[0]?.coordinates.length) {
      const centerPoint = mapData[0].coordinates;
      map.setCenter(centerPoint, 4);
    }
  }, [mapData, isLoaded, ymaps]);

  return {
    isLoaded,
    error,
    ymaps,
  };
};