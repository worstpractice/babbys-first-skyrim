import { tickCamera } from "../tick/tickCamera";
import { tickMixers } from "../tick/tickMixers";
import { tickPhysics } from "../tick/tickPhysics";

export const tickGameLoop = (deltaTime: number): void => {
  const deltaInSeconds = deltaTime * 0.001;

  tickPhysics(deltaInSeconds);

  tickMixers(deltaInSeconds);

  tickCamera(deltaInSeconds);
};
