import Title from 'antd/es/typography/Title'
import cn from 'classnames';
import {useState} from 'react';

import {
  type TTileData,
  type TTilesData,
  taskSliceActions,
} from '../../../../store/slices/task-slice';
import {useAppDispatch} from '../../../../store/config/hooks';
import {useCustomTiles} from './use-custom-tiles';
import {hasNeighbor} from './custom-tiles-utils';

import styles from './custom-tiles.module.scss';

interface CustomTilesProps {
  tilesData: TTilesData;
}

export const CustomTiles = ({tilesData}: CustomTilesProps) => {
  const dispatch = useAppDispatch();

  const [selectedId, setSelectedId] = useState<number | undefined>(tilesData?.[0].id)
  const [selectedTitle, setSelectedTitle] = useState<string | undefined>(tilesData?.[0].title)
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);

  const {grid, tilesWithColors} = useCustomTiles({tilesData});

  const handleClick = (tile: TTileData) => {
    const {
      id,
      title,
      mapData,
      formConfig,
    } = tile;

    setSelectedTitle(title);
    setSelectedId(id);
    dispatch(taskSliceActions.updateMapData(mapData));
    dispatch(taskSliceActions.updateFormConfig(formConfig));
  };

  const handleMouseEnter = (title: string) => {
    setHoveredTile(title);
  };

  const handleMouseLeave = () => {
    setHoveredTile(null);
  };

  return (
    <div className={styles.container}>
      {selectedTitle && (
        <Title className={styles.title} level={4}>
          Блок: {selectedTitle}
        </Title>
      )}
      <div className={styles.grid}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, colIndex) => {
              const tile = cell || {};
              const currentTile = tilesWithColors.find((t) => t.title === tile.title);
              const isFirstCell =
                currentTile &&
                currentTile.coordinates[0][0] === colIndex + 1 && // x — столбец
                currentTile.coordinates[0][1] === rowIndex + 1; // y — строка
              
              const isTileCell = !!tile?.title;

              const noRightBorder =
                currentTile && hasNeighbor(currentTile.coordinates, rowIndex + 1, colIndex + 1, "right");
              const noBottomBorder =
                currentTile && hasNeighbor(currentTile.coordinates, rowIndex + 1, colIndex + 1, "bottom");

              const isHovered = isTileCell && hoveredTile === tile.title;
              const isSelected = isTileCell && tile.id === selectedId;

              const borders = isTileCell ? ({
                border: 'none',
              }) : ({
                borderRight: noRightBorder ? "none" : "1px solid #d9d9d9",
                borderBottom: noBottomBorder ? "none" : "1px solid #d9d9d9",
                borderTop: "1px solid #d9d9d9",
                borderLeft: "1px solid #d9d9d9",
              });

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={cn(
                    styles.cell, 
                    isTileCell && styles.tileCell,
                    isHovered && styles.hovered,
                    isSelected && styles.selected,
                  )}
                  style={{
                    backgroundColor: tile.color ?? "#f0f0f0",
                    ...borders,
                  }}
                  onClick={() => isTileCell && tile.id !== selectedId && handleClick(tile)}
                  onMouseEnter={() => isTileCell && handleMouseEnter(tile.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  {isTileCell && isFirstCell && (
                    <span className={cn(
                      styles['tile-title'],
                      isHovered && styles.hovered,
                      isSelected && styles.selected,
                    )}>
                      {tile.title}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
