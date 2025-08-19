import {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {useUserId} from '@shared/hooks';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {type TileDto, selectTaskCommonData, taskSliceActions} from '@store/slices/task-slice';

export const useCardsActions = () => {
  const dispatch = useAppDispatch();
  const {scriptId, stageId} = useParams();
  const {userId} = useUserId();

  const [selectedTile, setSelectedTile] = useState<TileDto | undefined>();
  
  const {tableRowId} = useAppSelector(selectTaskCommonData) ?? {};


  useEffect(() => {
    // сбрасываем выбранную плитку при изменении выбранной строки
    if (selectedTile) {
      setSelectedTile(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableRowId]);

  const handleClick = useCallback((tile: TileDto) => {
    if (!tile || !stageId || !scriptId || !userId) {
      console.error(
        'Не найден один или несколько параметров, ' +
         + 'загрузка плиток невозможна (tile || stageId || scriptId || userId)');
      return;
    }
      
    setSelectedTile(tile);
  
    const {id: tileId, apiName} = tile;
  
    dispatch(taskSliceActions.setTilesCommonData({
      tileId,
      tileApiName: apiName,
      // todo: заменить на поле placemarkId, как только бэк добавит его 
      // selectedPlacemarkId: (tileId === 'CardHeader10') ? 'Supplier3' : (tileId === 'CardHeader6') ? 'Knot_WH1' : '',
      selectedPlacemarkId: '',
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageId, scriptId, userId]);

  return {
    selectedTile,
    handleClick,
  }
}