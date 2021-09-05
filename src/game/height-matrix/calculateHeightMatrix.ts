import { calculateHeight } from 'src/game/height-matrix/calculateHeight';

export const calculateHeightMatrix = (x: number, y: number): readonly (readonly number[])[] => {
  const matrix: (readonly number[])[] = [];

  for (let i = 0; i < x; i++) {
    const heights: number[] = [];

    for (let j = 0; j < y; j++) {
      const isOuterEdge = !i || !j || i === x - 1 || j === y - 1;

      const height = isOuterEdge ? 3 : calculateHeight(i, j, x, y);

      heights.push(height);
    }

    matrix.push(heights);
  }

  return matrix;
};
