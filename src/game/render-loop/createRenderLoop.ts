import { tickRenderLoop } from 'src/game/tick/tickRenderLoop';
import type { Input } from 'src/game/typings/Input';
import type { AnimationMixer, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

type Props = {
  readonly animationMixers: readonly AnimationMixer[];
  readonly camera: PerspectiveCamera;
  readonly input: Input;
  readonly renderer: WebGLRenderer;
  readonly scene: Scene;
};

export const createRenderLoop = async ({ animationMixers, camera, input, renderer, scene }: Props) => {
  const beginRenderLoop = (): void => {
    let previousRafTime: DOMHighResTimeStamp = 0;

    const renderLoop = (elapsedTime: DOMHighResTimeStamp): void => {
      requestAnimationFrame(renderLoop);

      // FIRST: we calculate the delta from our current value of `previousRaf`.
      const deltaTime = elapsedTime - previousRafTime;

      // THEN: we destructively update `previousRaf` to the latest value.
      previousRafTime = elapsedTime;

      tickRenderLoop(deltaTime, animationMixers, camera, input);

      renderer.render(scene, camera);
    };

    /////////////////////////////////////////////////////////////////
    // * Start Recursing *
    /////////////////////////////////////////////////////////////////

    return renderLoop(previousRafTime);
  };

  return beginRenderLoop;
};
