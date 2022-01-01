import type { Actor } from 'src/game/typings/Actor';
import type { Vector3 } from 'three';

export const calculateIdealFrom = (offset: Vector3, player: Actor): Vector3 => {
  /** NOTE: copies the character's orientation (since the offset is in local space), orienting us in the right direction. */
  offset.applyQuaternion(player.mesh.quaternion);

  /** NOTE: we simply add the character's position to produce the final value. */
  offset.add(player.mesh.position);

  return offset;
};
