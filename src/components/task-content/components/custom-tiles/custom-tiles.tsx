import Title from 'antd/es/typography/Title'
import {Empty} from 'antd';
import cn from 'classnames';
import {useEffect, useState} from 'react';

import {
  type TileDto,
  loadFormDataByTileParams,
  loadMapDataByTileId,
  selectTaskTilesData,
} from '../../../../store/slices/task-slice';
import {useAppDispatch, useAppSelector} from '../../../../store/config/hooks';
import {useCustomTiles} from './use-custom-tiles';

import styles from './custom-tiles.module.scss';

export const CustomTiles = () => {
  const dispatch = useAppDispatch();

  const tilesData = useAppSelector(selectTaskTilesData);
  console.log('tilesData=', tilesData);


  const [selectedTile, setSelectedTile] = useState<TileDto | undefined>();
  const [hoveredTileId, setHoveredTileId] = useState<string | null>(null);

  const {grid} = useCustomTiles({tilesData});

  useEffect(() => {
    if (tilesData?.[0]) {
      setSelectedTile(tilesData[0]);
    }
  }, [tilesData])

  useEffect(() => {
    if (selectedTile) {
      const {
        id: tileId,
        name,
        apiName,
      } = selectedTile;

      dispatch(loadMapDataByTileId({
        scriptId: 'SC0002',
        stageId: 'STG001',
        tileId,
      }));

      dispatch(loadFormDataByTileParams({
        scriptId: 'SC0002',
        stageId: 'STG001',
        name,
        apiName,
        tileId,
      }));
    }
  }, [selectedTile]);

  const handleClick = (tile: TileDto) => {
    setSelectedTile(tile);
  };

  return (
    <>
      {tilesData?.length ? (
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
                        borderLeft: isLeftEdge ? "1px solid #d9d9d9" : "none",
                        borderRight: isRightEdge ? "1px solid #d9d9d9" : "none",
                        borderTop: isTopEdge ? "1px solid #d9d9d9" : "none",
                        borderBottom: isBottomEdge ? "1px solid #d9d9d9" : "none",
                      }
                    : {
                        border: "1px solid #d9d9d9",
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
                        backgroundColor: currentTile?.color ?? "#fff",
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
      ) : (
        <Empty className={cn('fh', 'flex-col-center')} description='Данные плиток не заданы' />
      )}
    </>
  );
}
