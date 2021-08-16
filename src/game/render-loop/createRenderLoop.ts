import { tickRenderLoop } from 'src/game/tick/tickRenderLoop';
import type { Input } from 'src/game/typings/Input';
import type { Player } from 'src/game/typings/Player';
import type { AnimationMixer, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

type Props = {
  readonly animationMixers: readonly AnimationMixer[];
  readonly camera: PerspectiveCamera;
  readonly input: Input;
  readonly player: Player;
  readonly renderer: WebGLRenderer;
  readonly scene: Scene;
};

export const createRenderLoop = ({ animationMixers, camera, input, player, renderer, scene }: Props) => {
  const beginRenderLoop = (): void => {
    let previousRafTime: DOMHighResTimeStamp = 0;

    const renderLoop = (elapsedTime: DOMHighResTimeStamp): void => {
      requestAnimationFrame(renderLoop);

      // FIRST: we calculate the delta from our current value of `previousRaf`.
      const deltaTime = elapsedTime - previousRafTime;

      // THEN: we destructively update `previousRaf` to the latest value.
      previousRafTime = elapsedTime;

      tickRenderLoop(deltaTime, animationMixers, camera, input, player);

      renderer.render(scene, camera);
    };

    /////////////////////////////////////////////////////////////////
    // * Start Recursing *
    /////////////////////////////////////////////////////////////////

    return renderLoop(previousRafTime);
  };

  return beginRenderLoop;
};
