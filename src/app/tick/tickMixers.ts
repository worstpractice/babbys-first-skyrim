import { mixers } from "../engine/mixers";

export const tickMixers = (deltaInSeconds: number): void => {
  for (const mixer of mixers) {
    mixer.update(deltaInSeconds);
  }
};
