export const calmColors = [
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

export const hasNeighbor = (coords: number[][], row: number, col: number, direction: "right" | "bottom") => {
  if (direction === "right") {
    return coords.some(([x, y]) => y === row && x === col + 1);
  }
  if (direction === "bottom") {
    return coords.some(([x, y]) => y === row + 1 && x === col);
  }
  return false;
};

export const createColorGenerator = (colors: string[]) => {
  // замыкаемся на availableColors
  let availableColors = [...colors];

  return (index: number): string => {
    if (availableColors.length === 0) {
      availableColors = [...colors];
    }

    const seed = index * 12345;
    const randomIndex = Math.floor(
      (seed % availableColors.length) + Math.random() * availableColors.length
    ) % availableColors.length;

    const selectedColor = availableColors[randomIndex];
    availableColors.splice(randomIndex, 1); // Удаляем использованный цвет

    return selectedColor;
  };
};

