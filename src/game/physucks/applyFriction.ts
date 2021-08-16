import type { Player } from 'src/game/typings/Player';
import { vec3 } from 'src/game/utils/vec3';

export const applyFriction = (deltaInSeconds: number, player: Player): void => {
  const y = player.physics.velocity.y * player.physics.decceleration.y;
  const z = player.physics.velocity.z * player.physics.decceleration.z;

  const frameDecceleration = vec3(0, y, z);

  frameDecceleration.multiplyScalar(deltaInSeconds);

  const smallest = Math.min(Math.abs(frameDecceleration.z), Math.abs(player.physics.velocity.z));

  frameDecceleration.z = Math.sign(frameDecceleration.z) * smallest;

  player.physics.velocity.add(frameDecceleration);
};
