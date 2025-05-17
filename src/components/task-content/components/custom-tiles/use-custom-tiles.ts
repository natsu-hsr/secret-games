import {useMemo} from "react";

import type {TTilesData} from "../../../../store/slices/task-slice";
import {calmColors, createColorGenerator} from "./custom-tiles-utils";

interface UseCustomTilesArgs {
  tilesData: TTilesData;
}

export const useCustomTiles = ({tilesData}: UseCustomTilesArgs) => {
  const defaultGridSize = 3;

  const getUniqueColor = useMemo(
    () => createColorGenerator(calmColors),
    [tilesData.length],
  );

  const {gridSizeX, gridSizeY} = useMemo(() => {
    if (!tilesData || tilesData.length === 0) {
      return {gridSizeX: defaultGridSize, gridSizeY: defaultGridSize};
    }
  
    let maxX = 0;
    let maxY = 0;
  
    tilesData.forEach((tile) => {
      tile.coordinates.forEach(([x, y]) => {
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      });
    });
  
    // Минимальный размер сетки — 3x3
    return {
      gridSizeX: Math.max(maxX, defaultGridSize),
      gridSizeY: Math.max(maxY, defaultGridSize),
    };
  }, [tilesData]);
  
  const tilesWithColors = useMemo(
    () => tilesData.map((tile, index) => ({
      ...tile,
      color: getUniqueColor(index),
    })),
    [tilesData],
  );
  
  const grid = Array(gridSizeY)
    .fill(null)
    .map(() => Array(gridSizeX).fill(null));
  
  // Заполняем сетку данными плиток
  tilesWithColors.forEach((tile) => {
    tile.coordinates.forEach(([x, y]) => {
      if (x <= gridSizeX && y <= gridSizeY) {
        grid[y - 1][x - 1] = {...tile};
      }
    });
  });

  return {
    grid,
    tilesWithColors,
  };
};
