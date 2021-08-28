import type { World } from 'cannon-es';
import { movePlayer } from 'src/game/physics/movePlayer';
import { turnPlayer } from 'src/game/physics/turnPlayer';
import { THINGS } from 'src/game/tables/THINGS';
import type { BasicQuat } from 'src/game/typings/compatibility/BasicQuat';
import type { BasicVec3 } from 'src/game/typings/compatibility/BasicVec3';
import type { Input } from 'src/game/typings/Input';
import type { Player } from 'src/game/typings/Player';
import type { Quaternion, Vector3 } from 'three';

const PHYSICS_TIME_STEP = 1 / 144; // seconds

export const tickPhysics = (deltaInSeconds: number, getCurrentCameraDirection: (this: void) => Vector3, input: Input, player: Player, world: World): void => {
  for (const { body, model } of THINGS) {
    model.position.copy(body.position as BasicVec3 as Vector3);
    model.quaternion.copy(body.quaternion as BasicQuat as Quaternion);
  }

  world.step(PHYSICS_TIME_STEP, deltaInSeconds);

  // ////////////////////////////////////////////////////////////////////////////////////////////////
  // // * Friction *
  // ////////////////////////////////////////////////////////////////////////////////////////////////
  // applyFriction(deltaInSeconds, player);

  ////////////////////////////////////////////////////////////////////////////////////////////////
  // * Player Impulses *
  ////////////////////////////////////////////////////////////////////////////////////////////////
  movePlayer(deltaInSeconds, getCurrentCameraDirection, input, player);

  turnPlayer(deltaInSeconds, input, player);
};
