import type { Mesh } from 'three';
import { Vector3 } from 'three';

export const addPositionToMesh = (x: number, y: number, z: number) => {
  const innerAddPositionToMesh = <T extends Mesh>(mesh: T): T => {
    mesh.position.add(new Vector3(x, y, z));

    return mesh;
  };

  return innerAddPositionToMesh;
};
