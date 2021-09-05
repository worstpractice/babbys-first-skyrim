import { RUGGEDNESS } from 'src/game/constants/RUGGEDNESS';
import { calculateCos } from 'src/game/height-matrix/calculateCos';

export const calculateHeight = (i: number, j: number, x: number, y: number): number => {
  return calculateCos(i, x) * calculateCos(j, y) * RUGGEDNESS + 2;
};
