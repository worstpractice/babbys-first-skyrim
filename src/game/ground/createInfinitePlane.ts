import { Body, Plane, Quaternion, Vec3 } from 'cannon-es';
import { COLOR_GROUND } from 'src/game/constants/COLOR_GROUND';
import { FACING_UPRIGHT } from 'src/game/constants/FACING_UPRIGHT';
import { GROUND_PLANE_SIDE } from 'src/game/constants/GROUND_PLANE_SIDE';
import type { GameObject } from 'src/game/typings/GameObject';
import { uuid } from 'src/game/utils/uuid';
import { Mesh, MeshStandardMaterial, PlaneGeometry } from 'three';

export const createInfinitePlane = (): GameObject => {
  /////////////////////////////////////////////////////////////////////////////
  // * 3D *
  /////////////////////////////////////////////////////////////////////////////
  const mesh = new Mesh(
    new PlaneGeometry(GROUND_PLANE_SIDE, GROUND_PLANE_SIDE),
    new MeshStandardMaterial({
      color: COLOR_GROUND,
    }),
  );

  mesh.name = 'groundPlane';
  mesh.castShadow = false;
  mesh.receiveShadow = true;
  mesh.rotation.x = FACING_UPRIGHT;

  /////////////////////////////////////////////////////////////////////////////
  // * Physics *
  /////////////////////////////////////////////////////////////////////////////
  const body = new Body({
    fixedRotation: true,
    mass: 0,
    position: new Vec3(0, 0, 0),
    quaternion: new Quaternion().setFromEuler(FACING_UPRIGHT, 0, 0),
    shape: new Plane(),
    type: Body.STATIC,
  });

  /////////////////////////////////////////////////////////////////////////////

  return {
    body,
    id: uuid(),
    model: mesh,
  } as const;
};
