import {Empty} from "antd";
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps"
import {useEffect, useRef} from "react";

import type {TTaskMapData} from "../../../../store/slices/task-slice";

import styles from './custom-map.module.scss';

interface CustomMapProps {
  data: TTaskMapData;
}

export const CustomMap = ({data}: CustomMapProps) => {
  const mapRef = useRef<ymaps.Map | null>(null); // Ссылка на объект карты

  // Обновление центра при изменении data
  useEffect(() => {
    if (mapRef.current && data?.length) {
      const center = data[0].coordinates;
      mapRef.current.setCenter(center, 5, {duration: 300});
    }
  }, [data]);

  return (
    data.length ? (
      <YMaps>
        <Map
          className={styles.map}
          defaultState={{
            center: data?.[0].coordinates,
            zoom: 5,
            controls: ["zoomControl"],
          }}
          modules={["control.ZoomControl"]}
          instanceRef={(ref) => (mapRef.current = ref)} // присваиваем ref
        >
          {data?.map(a => (
            <Placemark
              key={a.id}
              geometry={a.coordinates}
            />
          ))}
        </Map>
      </YMaps>
    ) : (
      <Empty
        className={styles.empty}
        description='Координаты не заданы'
      />
    )
  )
}
