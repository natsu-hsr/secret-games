import {Empty} from "antd";
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps"

import type {TTaskMapData} from "../../../../store/slices/task-slice";

import styles from './custom-map.module.scss';

interface CustomMapProps {
  data: TTaskMapData;
}

export const CustomMap = ({data}: CustomMapProps) => {
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
