import type { World } from 'cannon-es';
import { createGetCurrentCameraDirection } from 'src/game/camera/createGetCurrentCameraDirection';
import { tickCamera } from 'src/game/tick/tickCamera';
import { tickLocomotion } from 'src/game/tick/tickLocomotion';
import { tickMixers } from 'src/game/tick/tickMixers';
import { tickPhysics } from 'src/game/tick/tickPhysics';
import type { Input } from 'src/game/typings/Input';
import type { Player } from 'src/game/typings/Player';
import type { Level } from 'src/typings/Level';
import type { AnimationMixer, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

type Props = {
  readonly camera: PerspectiveCamera;
  readonly input: Input;
  readonly level: Level;
  readonly mixers: readonly AnimationMixer[];
  readonly player: Player;
  readonly renderer: WebGLRenderer;
  readonly scene: Scene;
  readonly world: World;
};

export const createGameLoop = ({ camera, input, level, mixers, player, renderer, scene, world }: Props) => {
  const beginGameLoop = (): void => {
    let previousRafTime: DOMHighResTimeStamp = 0;

    const getCurrentCameraDirection = createGetCurrentCameraDirection({ camera, player });

    const gameLoop = (elapsedTime: DOMHighResTimeStamp): void => {
      requestAnimationFrame(gameLoop);

      // FIRST: we calculate the delta from our current value of `previousRaf`.
      const deltaTime = elapsedTime - previousRafTime;

      // THEN: we destructively update `previousRaf` to the latest value.
      previousRafTime = elapsedTime;

      const deltaInSeconds = deltaTime * 0.001;

      tickPhysics(deltaInSeconds, level, world);
      tickLocomotion(deltaInSeconds, getCurrentCameraDirection, input, player);
      tickMixers(deltaInSeconds, mixers);
      tickCamera(deltaInSeconds, camera, player);

      renderer.render(scene, camera);
    };

    /////////////////////////////////////////////////////////////////
    // * Start Recursing *
    /////////////////////////////////////////////////////////////////

    return gameLoop(previousRafTime);
  };

  return beginGameLoop;
};
