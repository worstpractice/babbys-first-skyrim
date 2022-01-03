import type { World } from 'cannon-es';
import { createGetCurrentCameraDirection } from 'src/game/camera/createGetCurrentCameraDirection';
import { tickLocomotion } from 'src/game/tick/tickLocomotion';
import { tickMixers } from 'src/game/tick/tickMixers';
import { tickPhysics } from 'src/game/tick/tickPhysics';
import type { Player } from 'src/game/typings/Player';
import type { Level } from 'src/views/typings/Level';
import type { AnimationMixer, Scene, WebGLRenderer } from 'three';

type Props = {
  readonly level: Level;
  readonly mixers: readonly AnimationMixer[];
  readonly player: Player;
  readonly renderer: WebGLRenderer;
  readonly scene: Scene;
  readonly world: World;
};

export const createGameLoop = ({ level, mixers, player, renderer, scene, world }: Props) => {
  /////////////////////////////////////////////////////////////////
  // * Fire When Ready *
  /////////////////////////////////////////////////////////////////
  const beginGameLoop = (): void => {
    let previousRafTime: DOMHighResTimeStamp = 0;

    const getCurrentCameraDirection = createGetCurrentCameraDirection({
      actor: player.actor,
      camera: player.camera,
    });

    /////////////////////////////////////////////////////////////////
    // * Game Loop *
    /////////////////////////////////////////////////////////////////
    const gameLoop = (elapsedTime: DOMHighResTimeStamp): void => {
      requestAnimationFrame(gameLoop);

      // FIRST: we calculate the delta from our current value of `previousRaf`.
      const deltaTime = elapsedTime - previousRafTime;

      // THEN: we destructively update `previousRaf` to the latest value.
      previousRafTime = elapsedTime;

      const deltaInSeconds = deltaTime * 0.001;

      tickPhysics(deltaInSeconds, level, world);
      tickMixers(deltaInSeconds, mixers);

      tickLocomotion(deltaInSeconds, getCurrentCameraDirection, player.input, player.actor); // <-- PLAYER SPECIFIC
      // tickCamera(deltaInSeconds, player.camera, player.actor); // <-- PLAYER SPECIFIC

      renderer.render(scene, player.camera);
    };

    /////////////////////////////////////////////////////////////////
    // * Start Recursing *
    /////////////////////////////////////////////////////////////////
    return gameLoop(previousRafTime);
  };

  return beginGameLoop;
};
