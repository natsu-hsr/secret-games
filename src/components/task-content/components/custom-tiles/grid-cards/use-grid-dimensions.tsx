import {useMemo, type CSSProperties} from 'react';

import type {TileDto} from '@store/slices/task-slice';

export const useGridDimensions = (tiles: TileDto[]) => {
  const {minCol, minRow, maxCol, maxRow, colsCount, rowsCount} = useMemo(() => {
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

    return {minCol, maxCol, minRow, maxRow, colsCount, rowsCount};
  }, [tiles]);

  const containerStyle = useMemo<CSSProperties>(() => ({
    gridTemplateColumns: `repeat(${colsCount}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${rowsCount}, auto)`,
  }), [colsCount, rowsCount]);

  return {
    minCol,
    minRow,
    maxCol,
    maxRow,
    containerStyle,
  };
};