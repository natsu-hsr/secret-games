export const сolors = [
  "#F7C7A3", // ( #F7C7A3)
  "#8FDABC", // ( #8FDABC)
  "#FFA8B4", // ( #FFA8B4)
  "#BDE584", // ( #BDE584)
  "#A5E0EE", // ( #A5E0EE)
  "#9ABAD5", // ( #9ABAD5)
  "#FFEB99", // ( #FFEB99)
  "#D67081", // ( #D67081)
  "#CC8F66", // ( #CC8F66)
  "#A4C99A", // ( #A4C99A)
  "#CC99CC", // ( #CC99CC)
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

