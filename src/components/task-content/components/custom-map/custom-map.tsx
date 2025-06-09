import {Empty} from "antd";
import cn from 'classnames';
import {useRef} from "react";

import {loadMapDataByTileId, selectTaskMapData} from "../../../../store/slices/task-slice";
import {useAppSelector} from "../../../../store/config/hooks";
import {useYandexMapLoader} from "./use-yandexmap-loader";
import {LayoutSpin} from "../layout-spin/layout-spin";
import {selectIsThunkPending} from "../../../../store/slices/loading-state-slice";

import styles from './custom-map.module.scss';

export const CustomMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const mapData = useAppSelector(selectTaskMapData);
  const isLoading = useAppSelector(s => selectIsThunkPending(s, loadMapDataByTileId.typePrefix));

  const {error} = useYandexMapLoader({mapData, mapRef});

  if (error) {
    return (
      <div className={cn('fh', 'flex-col-center')}>
        Во время загрузки карты произошла ошибка
      </div>
    )
  }

  return (
    <LayoutSpin spinning={isLoading} tip='Загрузка...'>
      {
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
      }
    </LayoutSpin>
  )
}
