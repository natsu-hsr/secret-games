const calmColors = [
  "#F4A261", // Тёплый персиковый
  "#60A5FA", // Мягкий синий
  "#34D399", // Приглушённый изумрудный
  "#FCA5A5", // Тёплый коралловый
  "#FCD34D", // Тёплый жёлтый
  "#FF6F61", // Яркий коралловый
  "#FFD60A", // Солнечный жёлтый
  "#4A90E2", // Глубокий синий
  "#FF9F1C", // Тёплый оранжевый
  "#2EC4B6", // Бирюзовый
  "#FF4D6D", // Тёплый розовый
  "#FFB3C1", // Светлый розовый
  "#8AC926", // Спокойный лаймовый
  "#FF70A6", // Мягкий розовый
  "#56CFE1", // Светлый бирюзовый
  "#FFA07A", // Персиковый
  "#32CD32", // Лаймовый зелёный
  "#FF4500", // Оранжевый
  "#4682B4", // Стальной синий
  "#FFD700", // Золотой
];

export const getUniqueColor = (index: number, totalTiles: number) => {
  if (totalTiles <= calmColors.length) {
    return calmColors[index % calmColors.length];
  }
  return calmColors[Math.floor((index * calmColors.length) / totalTiles)];
};

export const hasNeighbor = (coords: number[][], row: number, col: number, direction: "right" | "bottom") => {
  if (direction === "right") {
    // Проверяем, есть ли клетка справа (x + 1)
    return coords.some(([x, y]) => y === row && x === col + 1);
  }
  if (direction === "bottom") {
    // Проверяем, есть ли клетка снизу (y + 1)
    return coords.some(([x, y]) => y === row + 1 && x === col);
  }
  return false;
};
