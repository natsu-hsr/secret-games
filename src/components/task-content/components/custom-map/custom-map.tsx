import cn from 'classnames';
import {useRef} from 'react';

import {Loadable} from '@components/loadable';

import styles from './styles.module.scss';
import {useMapDataLoader} from './use-map-data-loader';
import {useYandexMapLoader} from './use-yandexmap-loader';

export const CustomMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const {data: mapData, isLoading, hasError} = useMapDataLoader();
  const {error: yaMapError} = useYandexMapLoader({mapData, mapRef});

  // TODO: вынести в Loadable ниже
  if (yaMapError) {
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
