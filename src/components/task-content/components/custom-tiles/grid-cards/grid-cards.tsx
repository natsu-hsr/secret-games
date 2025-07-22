import Title from 'antd/es/typography/Title';
import cn from 'classnames';
import {useEffect, useState, type FC} from 'react';
import {useParams} from 'react-router-dom';

import {useUserId} from '@shared/hooks';
import {useAppDispatch, useAppSelector} from '@store/config/hooks';
import {selectTaskCommonData, taskSliceActions, type TileDto} from '@store/slices/task-slice';

import styles from './styles.module.scss';

export interface GridCardsProps {
  tiles: TileDto[];
}

export const GridCards: FC<GridCardsProps> = ({tiles}) => {
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

  // Вычисляем минимальные и максимальные индексы
  const colStarts = tiles.map(t => t.columnStart);
  const colEnds = tiles.map(t => t.columnEnd);
  const rowStarts = tiles.map(t => t.rowStart);
  const rowEnds = tiles.map(t => t.rowEnd);

  const minCol = Math.min(...colStarts);
  const maxCol = Math.max(...colEnds);
  const minRow = Math.min(...rowStarts);
  const maxRow = Math.max(...rowEnds);

  const colsCount = maxCol - minCol;
  const rowsCount = maxRow - minRow;

  // Динамические стили для контейнера
  const containerStyle: React.CSSProperties = {
    gridTemplateColumns: `repeat(${colsCount}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${rowsCount}, auto)`,
  };

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
    <div className={styles.container}>
      <Title className={styles.title} level={4}>
        {selectedTile?.name ? `Блок: ${selectedTile?.name}` : 'Доступные блоки'}
      </Title>
      <div
        className={styles.grid}
        style={containerStyle}
      >
        {tiles.map(tile => (
          <div
            key={tile.id}
            className={cn(
              styles.card,
              selectedTile?.id === tile.id ? styles.selected : styles.inactive,
            )}
            onClick={() => handleClick(tile)}
            style={{
              backgroundColor: tile.color,
              gridColumn: `${tile.columnStart} / ${tile.columnEnd}`,
              gridRow: `${tile.rowStart} / ${tile.rowEnd}`,
            }}
          >
            <h3 className={styles.title}>{tile.name}</h3>
            <small className={styles.subtitle}>{tile.typeDescription}</small>
          </div>
        ))}
      </div>
    </div>
  );
}