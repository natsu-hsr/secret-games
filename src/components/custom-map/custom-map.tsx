import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps"

import type {TTaskMapData} from "../../store/slices/task-slice";

import styles from './custom-map.module.scss';

interface CustomMapProps {
  data: TTaskMapData;
}

export const CustomMap = ({data}: CustomMapProps) => {
  const {
    center,
    additional,
  } = data;

  return (
    <YMaps>
      <Map
        className={styles.map}
        defaultState={{
          center: center.coordinates,
          zoom: 7,
          controls: ["zoomControl"],
        }}
        modules={["control.ZoomControl"]}
      >
        <Placemark geometry={center.coordinates} />
        {additional?.map(a => (
          <Placemark geometry={a.coordinates} />
        ))}
      </Map>
    </YMaps>
  )
}
