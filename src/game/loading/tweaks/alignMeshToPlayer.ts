import { FACING_UPRIGHT } from 'src/game/constants/FACING_UPRIGHT';
import type { Mesh } from 'three';

export const alignMeshToPlayer = (mesh: Mesh): Mesh => {
  mesh.rotateY(Math.PI);
  mesh.rotateX(FACING_UPRIGHT);
  mesh.rotateY(-1);

  return mesh;
};
