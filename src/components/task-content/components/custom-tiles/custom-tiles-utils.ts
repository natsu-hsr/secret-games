export const hasNeighbor = (coords: number[][], row: number, col: number, direction: "right" | "bottom") => {
  if (direction === "right") {
    return coords.some(([x, y]) => y === row && x === col + 1);
  }
  if (direction === "bottom") {
    return coords.some(([x, y]) => y === row + 1 && x === col);
  }
  return false;
};
