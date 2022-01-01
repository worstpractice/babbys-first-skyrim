import type { World } from 'cannon-es';
import { PHYSICS_TIME_STEP } from 'src/game/constants/PHYSICS_TIME_STEP';
import type { BasicQuat } from 'src/game/typings/compatibility/BasicQuat';
import type { BasicVec3 } from 'src/game/typings/compatibility/BasicVec3';
import type { Level } from 'src/views/typings/Level';
import type { Quaternion, Vector3 } from 'three';

export const tickPhysics = (deltaInSeconds: number, { gameObjects }: Level, world: World): void => {
  for (const { body, mesh } of gameObjects) {
    mesh.position.copy(body.position as BasicVec3 as Vector3);
    mesh.quaternion.copy(body.quaternion as BasicQuat as Quaternion);
  }

  world.step(PHYSICS_TIME_STEP, deltaInSeconds);
};
