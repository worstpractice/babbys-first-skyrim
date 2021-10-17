import { RELEVANT_KEYS } from 'src/game/constants/input/RELEVANT_KEYS';
import type { RelevantKey } from 'src/game/typings/keys/RelevantKey';

export const isRelevantKey = (t: any): t is RelevantKey => {
  return RELEVANT_KEYS.has(t); // eslint-disable-line @typescript-eslint/no-unsafe-argument
};
