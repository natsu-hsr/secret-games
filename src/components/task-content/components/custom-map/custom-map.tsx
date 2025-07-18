import cn from 'classnames';
import {useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';

import {Loadable} from '@components/loadable';
import {useUserId} from '@shared/hooks';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {selectIsThunkPending, selectIsThunkRejected} from '@store/slices/loading-state-slice';
import {loadMapDataByTileId, selectTaskCommonData, selectTaskMapData} from '@store/slices/task-slice';

import styles from './styles.module.scss';
import {useYandexMapLoader} from './use-yandexmap-loader';

export const CustomMap = () => {
  const dispatch = useAppDispatch();
  const {scriptId, stageId} = useParams();
  const {userId} = useUserId();

  const {tileId} = useAppSelector(selectTaskCommonData) ?? {};
  
  const mapRef = useRef<HTMLDivElement | null>(null);

  const mapData = useAppSelector(selectTaskMapData);
  const isLoading = useAppSelector(s => selectIsThunkPending(s, loadMapDataByTileId.typePrefix));
  const hasError = useAppSelector(s => selectIsThunkRejected(s, loadMapDataByTileId.typePrefix));

  const {error} = useYandexMapLoader({mapData, mapRef});

  useEffect(() => {
    // если этих параметров нету, то все нормально, просто не время загружать данные
    // но при этом, в компоненте таблицы идет изначальная загрузка данных карты без tileId!
    if (!tileId) {
      return;
    }
    if (!scriptId || !stageId || !userId) {
      console.error('Один из параметров scriptId || stageId || userId не найден, загрузка графика невозможна');
      return;
    }

    dispatch(loadMapDataByTileId({
      userId,
      scriptId,
      stageId,
      tileId,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileId, scriptId, stageId, userId])

  // TODO: вынести в Loadable ниже
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
