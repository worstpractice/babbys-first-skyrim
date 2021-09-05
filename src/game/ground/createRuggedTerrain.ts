import type { Material } from 'cannon-es';
import { Body, Heightfield, Quaternion, Vec3 } from 'cannon-es';
import { COLOR_GROUND } from 'src/game/constants/COLOR_GROUND';
import { FACING_UPRIGHT } from 'src/game/constants/FACING_UPRIGHT';
import { GROUND_PLANE_SIDE } from 'src/game/constants/GROUND_PLANE_SIDE';
import { calculateHeightMatrix } from 'src/game/height-matrix/calculateHeightMatrix';
import type { Mutable } from 'src/game/typings/Mutable';
import type { Thing } from 'src/game/typings/Thing';
import { Mesh, MeshLambertMaterial, PlaneGeometry } from 'three';

export const createRuggedTerrain = (groundMaterial: Material): Thing => {
  /////////////////////////////////////////////////////////////////////////////
  // * 3D *
  /////////////////////////////////////////////////////////////////////////////
  const model = new Mesh(
    new PlaneGeometry(GROUND_PLANE_SIDE, GROUND_PLANE_SIDE, 100, 100),
    new MeshLambertMaterial({
      color: COLOR_GROUND,
    }),
  );

  model.name = 'ruggedTerrain';
  model.castShadow = false;
  model.receiveShadow = true;
  // model.visible = false; // for now

  /////////////////////////////////////////////////////////////////////////////
  // * Physics *
  /////////////////////////////////////////////////////////////////////////////
  const x = 64;
  const y = 64;

  const matrix = calculateHeightMatrix(x, y);

  const elementSize = 100 / x;

  const shape = new Heightfield(matrix as Mutable<typeof matrix>, {
    elementSize,
  });

  const body = new Body({
    fixedRotation: true,
    mass: 0,
    material: groundMaterial,
    position: new Vec3(
      //
      -((x - 1) * elementSize) / 2,
      -4,
      ((y - 1) * elementSize) / 2,
    ),
    quaternion: new Quaternion().setFromEuler(FACING_UPRIGHT, 0, 0),
    shape,
    type: Body.STATIC,
  });

  /////////////////////////////////////////////////////////////////////////////

  return {
    body,
    model,
  };
};
