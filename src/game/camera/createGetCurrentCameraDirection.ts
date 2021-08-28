import type { BasicVec3 } from 'src/game/typings/compatibility/BasicVec3';
import type { Player } from 'src/game/typings/Player';
import type { PerspectiveCamera } from 'three';
import { Ray, Vector3 } from 'three';

type Props = {
  readonly camera: PerspectiveCamera;
  readonly player: Player;
};

// Returns a vector pointing the the diretion the camera is at
export const createGetCurrentCameraDirection = ({ camera, player }: Props) => {
  const getCurrentCameraDirection = (): Vector3 => {
    const vector = new Vector3(0, 0, 1);

    vector.unproject(camera);

    const ray = new Ray(player.body.position as BasicVec3 as Vector3, vector.sub(player.body.position as BasicVec3 as Vector3).normalize());

    return ray.direction;
  };

  return getCurrentCameraDirection;
};
