import Title from 'antd/es/typography/Title'
import cn from 'classnames';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {Loadable} from '@components/loadable';
import {useUserId} from '@shared/hooks';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {selectIsThunkPending, selectIsThunkRejected} from '@store/slices/loading-state-slice';
import {
  type TileDto,
  loadTilesDataByRowId,
  selectTaskCommonData,
  selectTaskTilesData,
  taskSliceActions,
} from '@store/slices/task-slice';

import styles from './styles.module.scss';
import {useCustomTiles} from './use-custom-tiles';

export const CustomTiles = () => {
  const dispatch = useAppDispatch();
  const {scriptId, stageId} = useParams();
  const {userId} = useUserId();

  const tilesData = useAppSelector(selectTaskTilesData);
  const {tableRowId} = useAppSelector(selectTaskCommonData) ?? {};
  const isLoading = useAppSelector(s => selectIsThunkPending(s, loadTilesDataByRowId.typePrefix));
  const hasError = useAppSelector(s => selectIsThunkRejected(s, loadTilesDataByRowId.typePrefix));

  const [selectedTile, setSelectedTile] = useState<TileDto | undefined>();
  const [hoveredTileId, setHoveredTileId] = useState<string | null>(null);

  const {grid} = useCustomTiles({tilesData});

  useEffect(() => {
    // сбрасываем выбранную плитку при изменении выбранной строки
    if (selectedTile) {
      setSelectedTile(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableRowId]);

  useEffect(() => {
    // если этих параметров нету, то все нормально, просто не время загружать данные
    if (!tableRowId) {
      return;
    }
    if (!scriptId || !stageId || !userId) {
      console.error('Один из параметров scriptId || stageId || userId не найден, загрузка графика невозможна');
      return;
    }

    dispatch(loadTilesDataByRowId({
      userId,
      scriptId,
      stageId,
      rowId: tableRowId,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableRowId, scriptId, stageId, userId]);

  const handleClick = (tile: TileDto) => {
    if (!tile || !stageId || !scriptId || !userId) {
      console.error('Не наден один или несколько идентификаторов tile || stageId || scriptId || userId');
      return;
    }
    
    setSelectedTile(tile);

    const {id: tileId, apiName} = tile;

    dispatch(taskSliceActions.setTilesCommonData({
      tileId,
      tileApiName: apiName,
    }));
  };

  return (
    <Loadable
      emptyProps={{
        isEmpty: !tilesData?.length,
        emptyMessage: 'Данные плиток не заданы',
      }}
      loadingProps={{
        isLoading,
      }}
      errorProps={{
        hasError,
      }}
    >
      <div className={styles.container}>
        {selectedTile?.name && (
          <Title className={styles.title} level={4}>
            Блок: {selectedTile.name}
          </Title>
        )}
        <div className={styles.grid}>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cell, colIndex) => {
                const currentTile = cell;

                const isLeftEdge =
                  currentTile && colIndex + 1 === currentTile.columnStart;
                const isRightEdge =
                  currentTile && colIndex + 1 === currentTile.columnEnd;
                const isTopEdge =
                  currentTile && rowIndex + 1 === currentTile.rowStart;
                const isBottomEdge =
                  currentTile && rowIndex + 1 === currentTile.rowEnd;

                const isHovered = currentTile?.id === hoveredTileId;
                const isSelected = currentTile?.id === selectedTile?.id;

                const borders = currentTile
                  ? {
                      borderLeft: isLeftEdge ? '1px solid #d9d9d9' : 'none',
                      borderRight: isRightEdge ? '1px solid #d9d9d9' : 'none',
                      borderTop: isTopEdge ? '1px solid #d9d9d9' : 'none',
                      borderBottom: isBottomEdge ? '1px solid #d9d9d9' : 'none',
                    }
                  : {
                      border: '1px solid #d9d9d9',
                    };
                  
                const isTopLeftCorner =
                  currentTile &&
                  rowIndex + 1 === currentTile.rowStart &&
                  colIndex + 1 === currentTile.columnStart;

                return (
                  <div
                    key={colIndex}
                    className={cn(
                      styles.cell, 
                      currentTile && styles.tileCell,
                      isHovered && styles.hovered,
                      isSelected && styles.selected,
                      isTopLeftCorner && styles.topCell
                    )}
                    style={{
                      backgroundColor: currentTile?.color ?? '#fff',
                      ...borders,
                    }}
                    onMouseEnter={() => currentTile && setHoveredTileId(currentTile.id)}
                    onMouseLeave={() => setHoveredTileId(null)}
                    onClick={() => currentTile && handleClick(currentTile)}
                    title={currentTile?.name}
                  >
                    {isTopLeftCorner && (
                      <div
                        className={cn(
                          styles['tile-name'],
                          isSelected && styles.selected,
                          isHovered && styles.hovered,
                        )}
                        style={{
                          width: `${(currentTile.columnEnd - currentTile.columnStart + 1) * 100}%`,
                          height: `${(currentTile.rowEnd - currentTile.rowStart + 1) * 100}%`,
                        }}
                      >
                        {currentTile.name}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Loadable>
  )
}
