import Title from 'antd/es/typography/Title';
import cn from 'classnames';
import {useRef, useState, type FC} from 'react';

import {type TileDto, type TransportConnector} from '@store/slices/task-slice';

import styles from './styles.module.scss';
import {useCardsActions} from './use-cards-actions';
import {useConnectorPositions} from './use-connector-positions';
import {useGridDimensions} from './use-grid-dimensions';

import TruckIcon from '@assets/connector-truck.svg?react';

export interface GridCardsProps {
  tiles: TileDto[];
  connectors: TransportConnector[];
  onConnectorClick?: (connector: TransportConnector) => void;
}

export const GridCards: FC<GridCardsProps> = ({tiles, connectors, onConnectorClick}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // состояние для hover/selected коннекторов
  const [hoveredId,  setHoveredId]  = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const {containerStyle, minCol, minRow} = useGridDimensions(tiles);

  const connectorPositions = useConnectorPositions(connectors, wrapperRef, cardRefs);

  const {selectedTile, handleClick} = useCardsActions();

  return (
    <div className={styles.container}>
      <Title className={styles.title} level={4}>
        {selectedTile?.name ? `Блок: ${selectedTile?.name}` : 'Доступные блоки'}
      </Title>
      <div
        ref={wrapperRef}
        className={styles['grid-container']}
      >
        {/* Иконки над линиями */}
        {connectorPositions?.map(({connector, x, y}) => {
          const id = `${connector.from}-${connector.to}`;
          const isHovered  = hoveredId === id;
          const isSelected = selectedId === id;

          return (
            <div
              key={id}
              className={`
                ${styles.connector}
                ${isHovered  ? styles.hovered  : ''}
                ${isSelected ? styles.selected : ''}
              `}
              style={{
                left: x,
                top: y,
              }}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => {
                setSelectedId(id);
                onConnectorClick?.(connector);
              }}
            >
              <TruckIcon className={styles['connector-icon']} />
            </div>
        )})}

        <div
          className={styles.grid}
          style={containerStyle}
        >
          {tiles.map(tile => {
            const startCol = tile.columnStart - minCol + 1;
            const endCol = tile.columnEnd - minCol + 1;
            const startRow = tile.rowStart - minRow + 1;
            const endRow = tile.rowEnd - minRow + 1;
            return (
              <div
                key={tile.id}
                ref={el => (cardRefs.current[tile.id] = el)}
                className={cn(
                  styles.card,
                  selectedTile?.id === tile.id ? styles.selected : styles.inactive,
                  tile.disabled && styles.disabled,
                )}
                onClick={() => handleClick?.(tile)}
                style={{
                  backgroundColor: tile.color,
                  gridColumn: `${startCol} / ${endCol}`,
                  gridRow: `${startRow} / ${endRow}`,
                }}
              >
                <h3 className={styles.title}>{tile.name}</h3>
                <small className={styles.subtitle}>{tile.typeDescription}</small>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}