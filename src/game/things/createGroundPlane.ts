import { Body, Plane } from 'cannon-es';
import { COLOR_GROUND } from 'src/game/constants/COLOR_GROUND';
import { FACING_UPRIGHT } from 'src/game/constants/FACING_UPRIGHT';
import { GROUND_PLANE_HEIGHT } from 'src/game/constants/GROUND_PLANE_HEIGHT';
import { GROUND_PLANE_WIDTH } from 'src/game/constants/GROUND_PLANE_WIDTH';
import type { Thing } from 'src/game/typings/Thing';
import { Mesh, MeshStandardMaterial, PlaneGeometry } from 'three';

export const createGroundPlane = (): Thing => {
  /////////////////////////////////////////////////////////////////////////////
  // * 3D *
  /////////////////////////////////////////////////////////////////////////////
  const mesh = new Mesh(
    new PlaneGeometry(GROUND_PLANE_WIDTH, GROUND_PLANE_HEIGHT, 10, 10),
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
    shape: new Plane(),
    type: Body.STATIC,
  });

  body.position.set(0, 0, 0);
  body.quaternion.setFromEuler(FACING_UPRIGHT, 0, 0); // make it face up

  /////////////////////////////////////////////////////////////////////////////

  return {
    body,
    model: mesh,
  };
};
