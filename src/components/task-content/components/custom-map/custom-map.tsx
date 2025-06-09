import {Empty} from "antd";
import cn from 'classnames';
import {useRef} from "react";

import {selectTaskMapData} from "../../../../store/slices/task-slice";
import {useAppSelector} from "../../../../store/config/hooks";
import {useYandexMapLoader} from "./use-yandexmap-loader";

import styles from './custom-map.module.scss';

export const CustomMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const mapData = useAppSelector(selectTaskMapData);
  console.log('mapData=', mapData);

  const {error} = useYandexMapLoader({mapData, mapRef});

  if (error) {
    return (
      <div className={cn('fh', 'flex-col-center')}>
        Во время загрузки карты произошла ошибка
      </div>
    )
  }

  return (
    mapData?.length ? (
      <div
        ref={mapRef}
        className={styles.map}
      />
    ) : (
      <Empty
        className={cn('fh', 'flex-col-center')}
        description='Координаты не заданы'
      />
    )
  )
}
