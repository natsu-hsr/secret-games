import type {FC} from 'react';

import {Loadable} from '@components/loadable';
// import type {TransportConnector} from '@store/slices/task-slice';

import {GridCards} from './grid-cards';
import {useTilesDataLoader} from './use-tiles-data-loader';

export const CustomTiles: FC = () => {
  const {data: tilesData, isLoading, hasError} = useTilesDataLoader();

  // const connectors: TransportConnector[] = [
  //   {
  //     from: 'CardHeader8',
  //     to: 'CardHeader6',
  //   },
  //   {
  //     from: 'CardHeader12',
  //     to: 'CardHeader10',
  //   },
  //   {
  //     from: 'CardHeader9',
  //     to: 'CardHeader12',
  //   },
  // ];

  // console.log('tilesData=', tilesData);

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
      <GridCards tiles={tilesData} connectors={[]} />
    </Loadable>
  )
};
