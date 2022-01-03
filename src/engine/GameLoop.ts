/* eslint-disable unicorn/consistent-function-scoping */
import { ObSet } from 'obset';
import { GameEngine } from 'src/engine/GameEngine';
import type { GameObject } from 'src/engine/GameObject';
import { GAME_OBJECTS } from 'src/engine/globals/GAME_OBJECTS';
import { createSnitch } from 'src/engine/utils/createSnitch';
import { hasMixer, HasMixer } from 'src/engine/utils/hasMixer';
import { hasPhysics, HasPhysics } from 'src/engine/utils/hasPhysics';
import { PHYSICS_TIME_STEP } from 'src/game/constants/PHYSICS_TIME_STEP';
import type { BasicQuat } from 'src/game/typings/compatibility/BasicQuat';
import type { BasicVec3 } from 'src/game/typings/compatibility/BasicVec3';
import type { Quaternion, Vector3 } from 'three';

export class GameLoop extends GameEngine {
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Mixers *
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /** Subset of `GameEngine.gameObjects`. Exists only to speed up the animation loop. */
  private readonly mixerObjects = new ObSet<GameObject & HasMixer>()
    //
    .on('add', createSnitch(`${this.constructor.name} mixerObjects`))
    .on('delete', createSnitch(`${this.constructor.name} mixerObjects`));

  private readonly handleAddHasMixer = (gameObject: GameObject): void => {
    if (!hasMixer(gameObject)) return;

    this.mixerObjects.add(gameObject);
  };

  private readonly handleDeleteHasMixer = (gameObject: GameObject): void => {
    if (!hasMixer(gameObject)) return;

    this.mixerObjects.delete(gameObject);
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Physics *
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /** Subset of `GameEngine.gameObjects`. Exists only to speed up the physics loop. */
  private readonly physicsObjects = new ObSet<GameObject & HasPhysics>()
    //
    .on('add', createSnitch(`${this.constructor.name} physicsObjects`))
    .on('delete', createSnitch(`${this.constructor.name} physicsObjects`));

  private readonly handleAddHasPhysics = (gameObject: GameObject): void => {
    if (!hasPhysics(gameObject)) return;

    this.physicsObjects.add(gameObject);
  };

  private readonly handleDeleteHasPhysics = (gameObject: GameObject): void => {
    if (!hasPhysics(gameObject)) return;

    this.physicsObjects.delete(gameObject);
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  private previousRafTime: DOMHighResTimeStamp = 0;

  private deltaInSeconds: number = 0;

  constructor() {
    super();
    console.count(`constructor: ${new.target.name}`);

    this.revUpGameLoop();

    this.startLooping(this.previousRafTime);
  }

  private revUpGameLoop(this: this): void {
    for (const preExistingGameObject of GAME_OBJECTS) {
      // retroactively handle pre-existing instances
      this.handleAddHasMixer(preExistingGameObject);
      this.handleAddHasPhysics(preExistingGameObject);
    }

    // begin handling future additions
    GAME_OBJECTS.on('add', this.handleAddHasMixer);
    GAME_OBJECTS.on('delete', this.handleDeleteHasMixer);

    GAME_OBJECTS.on('add', this.handleAddHasPhysics);
    GAME_OBJECTS.on('delete', this.handleDeleteHasPhysics);
  }
  private readonly startLooping = (elapsedTime: DOMHighResTimeStamp): void => {
    window.requestAnimationFrame(this.startLooping);

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
    for (const { mixer } of this.mixerObjects) {
      mixer.update(this.deltaInSeconds);
    }
  }

  private tickPhysics(this: this): void {
    for (const { body, mesh } of this.physicsObjects) {
      mesh.position.copy(body.position as BasicVec3 as Vector3);
      mesh.quaternion.copy(body.quaternion as BasicQuat as Quaternion);
    }

    this.world.step(PHYSICS_TIME_STEP, this.deltaInSeconds);
  }
}
