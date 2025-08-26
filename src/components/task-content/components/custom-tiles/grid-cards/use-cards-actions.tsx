import {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {useUserId} from '@shared/hooks';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {type TileDto, type TransportConnector, selectTaskCommonData, taskSliceActions} from '@store/slices/task-slice';

export const useCardsActions = () => {
  const dispatch = useAppDispatch();
  const {scriptId, stageId} = useParams();
  const {userId} = useUserId();

  const [selectedTile, setSelectedTile] = useState<TileDto | undefined>();
  const [hoveredConnectorId,  setHoveredConnectorId]  = useState<string | null>(null);
  const [selectedConnectorId, setSelectedConnectorId] = useState<string | null>(null);
  
  const {tableRowId} = useAppSelector(selectTaskCommonData) ?? {};


  useEffect(() => {
    // сбрасываем выбранную плитку при изменении выбранной строки
    if (selectedTile) {
      setSelectedTile(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableRowId]);

  const handleTileClick = useCallback((tile: TileDto) => {
    if (!tile || !stageId || !scriptId || !userId) {
      console.error(
        'Не найден один или несколько параметров, ' +
         + 'загрузка формы невозможна (tile || stageId || scriptId || userId)');
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

  const handleConnectorClick = useCallback((connector: TransportConnector) => {
    if (!connector || !stageId || !scriptId || !userId) {
      console.error(
        'Не найден один или несколько параметров, ' +
         + 'загрузка формы невозможна (connector || stageId || scriptId || userId)');
      return;
    }

    const {id, fromId, apiName} = connector;
      
    setSelectedConnectorId(id);
  
  
    dispatch(taskSliceActions.setTilesCommonData({
      tileId: fromId,
      tileApiName: apiName,
      // todo: заменить на поле placemarkId, как только бэк добавит его 
      // selectedPlacemarkId: (tileId === 'CardHeader10') ? 'Supplier3' : (tileId === 'CardHeader6') ? 'Knot_WH1' : '',
      selectedPlacemarkId: '',
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageId, scriptId, userId]);

  return {
    // tiles
    selectedTile,
    handleTileClick,
    // connectors
    hoveredConnectorId,
    setHoveredConnectorId,
    selectedConnectorId,
    handleConnectorClick,
  }
}