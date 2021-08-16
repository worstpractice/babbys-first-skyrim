import type { Encoded } from 'src/game/typings/Encoded';

export const isEncoded = (t: any): t is Encoded => {
  return t?.material?.map;
};
