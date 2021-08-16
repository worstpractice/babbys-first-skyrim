import { tickCamera } from 'src/game/tick/tickCamera';
import { tickMixers } from 'src/game/tick/tickMixers';
import { tickPhysics } from 'src/game/tick/tickPhysics';
import type { Input } from 'src/game/typings/Input';
import type { Player } from 'src/game/typings/Player';
import type { AnimationMixer, PerspectiveCamera } from 'three';

// prettier-ignore
export const tickRenderLoop = (deltaTime: number, animationMixers: readonly AnimationMixer[], camera: PerspectiveCamera, input: Input, player: Player): void => {
  const deltaInSeconds = deltaTime * 0.001;

  tickPhysics(deltaInSeconds, input, player);

  tickMixers(deltaInSeconds, animationMixers);

  tickCamera(deltaInSeconds, camera, player);
};
