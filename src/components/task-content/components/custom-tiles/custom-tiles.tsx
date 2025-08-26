import type {FC} from 'react';

import {Loadable} from '@components/loadable';
// import type {TransportConnector} from '@store/slices/task-slice';

import {GridCards} from './grid-cards';
import {useTilesDataLoader} from './use-tiles-data-loader';

export const CustomTiles: FC = () => {
  const {tiles, connectors, isLoading, hasError} = useTilesDataLoader();

  return (
    <Loadable
      emptyProps={{
        isEmpty: !tiles?.length,
        emptyMessage: 'Блоки не найдены',
      }}
      loadingProps={{
        isLoading,
      }}
      errorProps={{
        hasError,
      }}
    >
      <GridCards tiles={tiles} connectors={connectors} />
    </Loadable>
  )
};
