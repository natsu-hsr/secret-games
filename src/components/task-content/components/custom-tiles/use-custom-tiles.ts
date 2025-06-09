import {useMemo} from "react";

import type {TilesDto} from "../../../../store/slices/task-slice";
import {сolors, createColorGenerator} from "./custom-tiles-utils";

interface UseCustomTilesArgs {
  tilesData: TilesDto | undefined;
}

export const useCustomTiles = ({tilesData}: UseCustomTilesArgs) => {
  const defaultGridSize = 1;

  const getUniqueColor = useMemo(
    () => createColorGenerator(сolors),
    [tilesData?.length],
  );

  const tilesWithColors = useMemo(
    () => tilesData?.map((tile, index) => ({
      ...tile,
      color: getUniqueColor(index),
    })),
    [tilesData],
  );

  const {gridSizeX, gridSizeY} = useMemo(() => {
    if (!tilesWithColors || tilesWithColors.length === 0) {
      return {gridSizeX: defaultGridSize, gridSizeY: defaultGridSize};
    }
  
    let maxX = 0;
    let maxY = 0;
  
    tilesWithColors.forEach((tile) => {
      maxX = Math.max(maxX, tile.columnEnd);
      maxY = Math.max(maxY, tile.rowEnd);
    });
  
    return {
      gridSizeX: Math.max(maxX, defaultGridSize),
      gridSizeY: Math.max(maxY, defaultGridSize),
    };
  }, [tilesWithColors]);
  
  const grid = useMemo(
    () => Array(gridSizeY)
    .fill(null)
    .map(() => Array(gridSizeX).fill(null)),
    [gridSizeY, gridSizeX],
  );

  console.log('grid=', grid)

  tilesWithColors?.forEach((tile) => {
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
    tilesWithColors,
  };
};
