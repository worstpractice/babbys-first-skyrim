import { Vec3 } from 'cannon-es';
import type { Player } from 'src/game/typings/Player';
import { vec3 } from 'src/game/utils/vec3';
import { DEACCELERATION } from '../constants/DEACCELERATION';

export const applyFriction = (deltaInSeconds: number, player: Player): void => {
  const y = player.body.velocity.y * DEACCELERATION.y;
  const z = player.body.velocity.z * DEACCELERATION.z;

  const frameDecceleration = vec3(0, y, z);

  frameDecceleration.multiplyScalar(deltaInSeconds);

  const smallest = Math.min(Math.abs(frameDecceleration.z), Math.abs(player.body.velocity.z));

  frameDecceleration.z = Math.sign(frameDecceleration.z) * smallest;

  player.body.velocity.vadd(
    new Vec3(
      //
      frameDecceleration.x,
      frameDecceleration.y,
      frameDecceleration.z,
    ),
  );
};
