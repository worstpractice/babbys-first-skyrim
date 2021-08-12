import { Mesh, MeshStandardMaterial, PlaneGeometry } from "three";
import { COLOR_GROUND } from "src/constants/COLOR_GROUND";
import { FACING_UPRIGHT } from "src/constants/FACING_UPRIGHT";
import { GROUND_PLANE_HEIGHT, GROUND_PLANE_WIDTH } from "src/constants/GROUND_PLANE";

export const createGroundPlane = (): Mesh<PlaneGeometry, MeshStandardMaterial> => {
  const plane = new Mesh(
    new PlaneGeometry(GROUND_PLANE_WIDTH, GROUND_PLANE_HEIGHT, 10, 10),
    new MeshStandardMaterial({
      color: COLOR_GROUND,
    }),
  );

  plane.name = "groundPlane";

  plane.castShadow = false;
  plane.receiveShadow = true;
  plane.rotation.x = FACING_UPRIGHT;

  return plane;
};
