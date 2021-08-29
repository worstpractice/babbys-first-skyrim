import { Body, Heightfield, Material, Quaternion, Vec3 } from 'cannon-es';
import { COLOR_GROUND } from 'src/game/constants/COLOR_GROUND';
import { FACING_UPRIGHT } from 'src/game/constants/FACING_UPRIGHT';
import { GROUND_PLANE_SIDE } from 'src/game/constants/GROUND_PLANE_SIDE';
import type { Thing } from 'src/game/typings/Thing';
import { Mesh, MeshStandardMaterial, PlaneGeometry } from 'three';

const SIZE_X = 64;

const SIZE_Y = 64;

const calculateCos = (index: number, SIZE: number): number => {
  return Math.cos((index / SIZE) * Math.PI * 5);
};

const RUGGEDNESS = 3;

const calculateHeight = (i: number, j: number) => {
  return calculateCos(i, SIZE_X) * calculateCos(j, SIZE_Y) * RUGGEDNESS + 2;
};

const createHeightMatrix = (): number[][] => {
  const matrix: number[][] = [];

  for (let i = 0; i < SIZE_X; i++) {
    const heights: number[] = [];

    for (let j = 0; j < SIZE_Y; j++) {
      const isOuterEdge = !i || !j || i === SIZE_X - 1 || j === SIZE_Y - 1;

      const height = isOuterEdge ? 3 : calculateHeight(i, j);

      heights.push(height);
    }

    matrix.push(heights);
  }

  return matrix;
};

export const createRuggedTerrain = (): Thing => {
  /////////////////////////////////////////////////////////////////////////////
  // * 3D *
  /////////////////////////////////////////////////////////////////////////////
  const model = new Mesh(
    new PlaneGeometry(GROUND_PLANE_SIDE, GROUND_PLANE_SIDE),
    new MeshStandardMaterial({
      color: COLOR_GROUND,
    }),
  );

  model.name = 'ruggedTerrain';
  model.castShadow = false;
  model.receiveShadow = true;
  model.visible = false; // for now

  /////////////////////////////////////////////////////////////////////////////
  // * Physics *
  /////////////////////////////////////////////////////////////////////////////
  const matrix = createHeightMatrix();

  const body = new Body({
    fixedRotation: true,
    mass: 0,
    material: new Material('ground'),
    position: new Vec3(
      //
      -GROUND_PLANE_SIDE,
      0,
      GROUND_PLANE_SIDE,
    ),
    quaternion: new Quaternion().setFromEuler(FACING_UPRIGHT, 0, 0),
    shape: new Heightfield(matrix, {
      elementSize: 10,
    }),
    type: Body.STATIC,
  });

  /////////////////////////////////////////////////////////////////////////////

  return {
    body,
    model,
  };
};
