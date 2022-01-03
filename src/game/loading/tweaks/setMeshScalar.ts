import type { Mesh } from 'three';

export const setMeshScalar = (to: number) => {
  const innerSetMeshScalar = (mesh: Mesh): Mesh => {
    mesh.scale.setScalar(to);

    return mesh;
  };

  return innerSetMeshScalar;
};
