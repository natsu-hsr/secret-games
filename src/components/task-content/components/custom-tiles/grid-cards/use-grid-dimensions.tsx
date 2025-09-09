import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';

import type {TileDto} from '@store/slices/task-slice';

const GAP = 12;

export const useGridDimensions = (tiles: TileDto[], wrapperRef: React.RefObject<HTMLElement>) => {
  const {minCol, minRow, colsCount, rowsCount} = useMemo(() => {
    const colStarts = tiles.map(t => t.columnStart);
    const colEnds = tiles.map(t => t.columnEnd);
    const rowStarts = tiles.map(t => t.rowStart);
    const rowEnds = tiles.map(t => t.rowEnd);

    const minCol = Math.min(...colStarts);
    const maxCol = Math.max(...colEnds);
    const minRow = Math.min(...rowStarts);
    const maxRow = Math.max(...rowEnds);

    return {
      minCol,
      minRow,
      colsCount: Math.max(1, maxCol - minCol),
      rowsCount: Math.max(1, maxRow - minRow),
    };
  }, [tiles]);

  const [cell, setCell] = useState<number>(100);

  const maxCellSize = useMemo(() => {
    const maxDimension = Math.max(colsCount, rowsCount)

    // максимум 2 строки/столбца
    if (maxDimension < 3) {
      return 300;
    }
    // максимум 3 строки/столбца
    if (maxDimension < 4) {
      return 200;
    }

    // если очень много - без ограничений (ставим очень большое число)
    return 900;
  }, [colsCount, rowsCount])

  const measure = useCallback(() => {
    const wrap = wrapperRef.current;
    if (!wrap) return;

    // считаем только по ширине: сетка влезает по ширине контейнера
    const wrapW = wrap.clientWidth;
    const totalGapsW = GAP * (colsCount - 1);
    const byWidth = (wrapW - totalGapsW) / colsCount;

    const next = Math.floor(Math.min(maxCellSize, Math.max(0, byWidth)));;
    if (Number.isFinite(next) && next > 0 && next !== cell) {
      setCell(next);
    }
  }, [wrapperRef, colsCount, cell, maxCellSize]);

  const roRef = useRef<ResizeObserver | null>(null);
  useLayoutEffect(() => {
    measure();
    if (!wrapperRef.current) return;
    roRef.current?.disconnect();
    roRef.current = new ResizeObserver(() => measure());
    roRef.current.observe(wrapperRef.current);
    return () => roRef.current?.disconnect();
  }, [measure, wrapperRef]);

  const containerStyle = useMemo<CSSProperties>(() => ({
    gridTemplateColumns: `repeat(${colsCount}, ${cell}px)`,
    gridTemplateRows:    `repeat(${rowsCount}, ${cell}px)`,
    gap: `${GAP}px`,
    justifyContent: 'center',
    alignContent: 'center',
  }), [colsCount, rowsCount, cell]);

  return {containerStyle, minCol, minRow, cell};
};
