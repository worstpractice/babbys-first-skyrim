import { COLOR_GROUND } from 'src/game/constants/COLOR_GROUND';
import { FACING_UPRIGHT } from 'src/game/constants/FACING_UPRIGHT';
import { GROUND_PLANE_HEIGHT, GROUND_PLANE_WIDTH } from 'src/game/constants/GROUND_PLANE';
import { Mesh, MeshStandardMaterial, PlaneGeometry } from 'three';

export const createGroundPlane = (): Mesh<PlaneGeometry, MeshStandardMaterial> => {
  const plane = new Mesh(
    new PlaneGeometry(GROUND_PLANE_WIDTH, GROUND_PLANE_HEIGHT, 10, 10),
    new MeshStandardMaterial({
      color: COLOR_GROUND,
    }),
  );

  plane.name = 'groundPlane';

  plane.castShadow = false;
  plane.receiveShadow = true;
  plane.rotation.x = FACING_UPRIGHT;

  return plane;
};
