import {useMemo} from "react";

import type {TilesDto} from "@store/slices/task-slice";

const defaultGridSize = 1;

interface UseCustomTilesArgs {
  tilesData: TilesDto | undefined;
}

export const useCustomTiles = ({tilesData}: UseCustomTilesArgs) => {
  const {gridSizeX, gridSizeY} = useMemo(() => {
    if (!tilesData || tilesData.length === 0) {
      return {gridSizeX: defaultGridSize, gridSizeY: defaultGridSize};
    }
  
    let maxX = 0;
    let maxY = 0;
  
    tilesData.forEach((tile) => {
      maxX = Math.max(maxX, tile.columnEnd);
      maxY = Math.max(maxY, tile.rowEnd);
    });
  
    return {
      gridSizeX: Math.max(maxX, defaultGridSize),
      gridSizeY: Math.max(maxY, defaultGridSize),
    };
  }, [tilesData]);
  
  const grid = useMemo(
    () => Array(gridSizeY)
    .fill(null)
    .map(() => Array(gridSizeX).fill(null)),
    [gridSizeY, gridSizeX],
  );

  tilesData?.forEach(tile => {
    for (let row = tile.rowStart; row <= tile.rowEnd; row++) {
      for (let col = tile.columnStart; col <= tile.columnEnd; col++) {
        if (row <= gridSizeY && col <= gridSizeX) {
          grid[row - 1][col - 1] = tile;
        }
      }
    }
  });

  return {
    grid,
  };
};
