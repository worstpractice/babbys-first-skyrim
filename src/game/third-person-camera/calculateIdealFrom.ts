import { player } from 'src/game/player/player';
import type { Vector3 } from 'three';

export const calculateIdealFrom = (offset: Vector3): Vector3 => {
  /** NOTE: copies the character's orientation (since the offset is in local space), orienting us in the right direction. */
  offset.applyQuaternion(player.model.quaternion);

  /** NOTE: we simply add the character's position to produce the final value. */
  offset.add(player.model.position);

  return offset;
};
