import { Constructors, GameEngine } from 'src/engine/GameEngine';
import { PHYSICS_TIME_STEP } from 'src/game/constants/PHYSICS_TIME_STEP';
import type { BasicQuat } from 'src/game/typings/compatibility/BasicQuat';
import type { BasicVec3 } from 'src/game/typings/compatibility/BasicVec3';
import type { LoadingManager, Quaternion, Vector3 } from 'three';

export class GameLoop extends GameEngine {
  private previousRafTime: DOMHighResTimeStamp = 0;

  private deltaInSeconds: number = 0;

  constructor(loadingManager: LoadingManager, constructors: Constructors) {
    super(loadingManager, constructors);
    window.requestAnimationFrame(this.gameLoop);
  }

  private readonly gameLoop: (this: void, elapsedTime: DOMHighResTimeStamp) => void = (elapsedTime: DOMHighResTimeStamp): void => {
    requestAnimationFrame(this.gameLoop);

    // FIRST: we calculate the delta from our current value of `previousRaf`.
    const deltaTime = elapsedTime - this.previousRafTime;

    // THEN: we destructively update `previousRaf` to the latest value.
    this.previousRafTime = elapsedTime;

    this.deltaInSeconds = deltaTime * 0.001;

    this.tickPhysics();
    this.tickMixers();

    this.renderer.render(this.scene, this.camera);
  };

  private tickMixers(this: this): void {
    for (const mixer of this.mixers) {
      mixer.update(this.deltaInSeconds);
    }
  }

  private tickPhysics(this: this): void {
    for (const { body, mesh } of this.gameObjects) {
      mesh.position.copy(body.position as BasicVec3 as Vector3);
      mesh.quaternion.copy(body.quaternion as BasicQuat as Quaternion);
    }

    this.world.step(PHYSICS_TIME_STEP, this.deltaInSeconds);
  }
}
