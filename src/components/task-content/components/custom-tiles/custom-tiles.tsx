import type {FC} from 'react';

import {Loadable} from '@components/loadable';

import {GridCards} from './grid-cards';
import {useTilesDataLoader} from './use-tiles-data-loader';

export const CustomTiles: FC = () => {
  const {data: tilesData, isLoading, hasError} = useTilesDataLoader();

  return (
    <Loadable
      emptyProps={{
        isEmpty: !tilesData?.length,
        emptyMessage: 'Блоки не найдены',
      }}
      loadingProps={{
        isLoading,
      }}
      errorProps={{
        hasError,
      }}
    >
      <GridCards tiles={tilesData} />
    </Loadable>
  )
};
