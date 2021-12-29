import type { Actor } from 'src/game/typings/Actor';
import type { BasicVec3 } from 'src/game/typings/compatibility/BasicVec3';
import type { PerspectiveCamera } from 'three';
import { Ray, Vector3 } from 'three';

type Props = {
  readonly actor: Actor;
  readonly camera: PerspectiveCamera;
};

// Returns a vector pointing the the diretion the camera is at
export const createGetCurrentCameraDirection = ({ camera, actor }: Props) => {
  const getCurrentCameraDirection = (): Vector3 => {
    const vector = new Vector3(0, 0, 1);

    vector.unproject(camera);

    const ray = new Ray(actor.body.position as BasicVec3 as Vector3, vector.sub(actor.body.position as BasicVec3 as Vector3).normalize());

    return ray.direction;
  };

  return getCurrentCameraDirection;
};
