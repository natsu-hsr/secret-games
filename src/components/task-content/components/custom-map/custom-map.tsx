import cn from 'classnames';
import {useRef} from 'react';

import {Loadable} from '@components/loadable';
import {useAppSelector} from '@store/config/hooks';
import {selectIsThunkPending, selectIsThunkRejected} from '@store/slices/loading-state-slice';
import {loadMapDataByTileId, selectTaskMapData} from '@store/slices/task-slice';

import styles from './custom-map.module.scss';
import {useYandexMapLoader} from './use-yandexmap-loader';

export const CustomMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const mapData = useAppSelector(selectTaskMapData);
  const isLoading = useAppSelector(s => selectIsThunkPending(s, loadMapDataByTileId.typePrefix));
  const hasError = useAppSelector(s => selectIsThunkRejected(s, loadMapDataByTileId.typePrefix));

  const {error} = useYandexMapLoader({mapData, mapRef});

  if (error) {
    return (
      <div className={cn('fh', 'flex-col-center')}>
        Во время загрузки карты произошла ошибка
      </div>
    )
  }

  return (
    <Loadable
      emptyProps={{
        isEmpty: !mapData?.length,
        emptyMessage: 'Координаты не заданы',
      }}
      loadingProps={{
        isLoading,
      }}
      errorProps={{
        hasError,
      }}
    >
      <div ref={mapRef} className={styles.map} />
    </Loadable>
  )
}
