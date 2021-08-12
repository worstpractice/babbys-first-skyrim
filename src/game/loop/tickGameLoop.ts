import { tickCamera } from "src/game/tick/tickCamera";
import { tickMixers } from "src/game/tick/tickMixers";
import { tickPhysics } from "src/game/tick/tickPhysics";

export const tickGameLoop = (deltaTime: number): void => {
  const deltaInSeconds = deltaTime * 0.001;

  tickPhysics(deltaInSeconds);

  tickMixers(deltaInSeconds);

  tickCamera(deltaInSeconds);
};
