import { camera } from "src/game/engine/camera";
import { renderer } from "src/game/engine/renderer";
import { tickGameLoop } from "src/game/loop/tickGameLoop";
import type { Scene } from "three";

export const createRenderLoop = (scene: Scene) => {
  const beginRenderLoop = (): void => {
    let previousRafTime: DOMHighResTimeStamp = 0;

    const renderLoop = (elapsedTime: DOMHighResTimeStamp): void => {
      requestAnimationFrame(renderLoop);

      // FIRST: we calculate the delta from our current value of `previousRaf`.
      const deltaTime = elapsedTime - previousRafTime;

      // THEN: we destructively update `previousRaf` to the latest value.
      previousRafTime = elapsedTime;

      tickGameLoop(deltaTime);

      renderer.render(scene, camera);
    };

    /////////////////////////////////////////////////////////////////
    // * Start Recursing *
    /////////////////////////////////////////////////////////////////

    return renderLoop(previousRafTime);
  };

  return beginRenderLoop;
};
