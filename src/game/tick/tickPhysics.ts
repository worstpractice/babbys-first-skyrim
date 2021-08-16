import { move } from 'src/game/physucks/move';
import { turn } from 'src/game/physucks/turn';
import { player } from 'src/game/player/player';
import { vec3 } from 'src/game/utils/vec3';

const applyFriction = (deltaInSeconds: number): void => {
  const y = player.physics.velocity.y * player.physics.decceleration.y;
  const z = player.physics.velocity.z * player.physics.decceleration.z;

  const frameDecceleration = vec3(0, y, z);

  frameDecceleration.multiplyScalar(deltaInSeconds);

  const smallest = Math.min(Math.abs(frameDecceleration.z), Math.abs(player.physics.velocity.z));

  frameDecceleration.z = Math.sign(frameDecceleration.z) * smallest;

  player.physics.velocity.add(frameDecceleration);
};

export const tickPhysics = (deltaInSeconds: number): void => {
  ////////////////////////////////////////////////////////////////////////////////////////////////
  // * Friction *
  ////////////////////////////////////////////////////////////////////////////////////////////////
  applyFriction(deltaInSeconds);

  ////////////////////////////////////////////////////////////////////////////////////////////////
  // * Player Impulses *
  ////////////////////////////////////////////////////////////////////////////////////////////////

  move(deltaInSeconds);

  turn(deltaInSeconds);
};
