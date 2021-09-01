import type { Material } from 'cannon-es';
import { Body, Heightfield, Quaternion, Vec3 } from 'cannon-es';
import { COLOR_GROUND } from 'src/game/constants/COLOR_GROUND';
import { FACING_UPRIGHT } from 'src/game/constants/FACING_UPRIGHT';
import { GROUND_PLANE_SIDE } from 'src/game/constants/GROUND_PLANE_SIDE';
import type { Thing } from 'src/game/typings/Thing';
import { Mesh, MeshLambertMaterial, MeshStandardMaterial, PlaneGeometry } from 'three';

const calculateCos = (index: number, size: number): number => {
  return Math.cos((index / size) * Math.PI * 5);
};

const RUGGEDNESS = 2;

const calculateHeight = (i: number, j: number, x: number, y: number) => {
  return calculateCos(i, x) * calculateCos(j, y) * RUGGEDNESS + 2;
};

const createHeightMatrix = (x: number, y: number): number[][] => {
  const matrix: number[][] = [];

  for (let i = 0; i < x; i++) {
    const heights: number[] = [];

    for (let j = 0; j < y; j++) {
      const isOuterEdge = !i || !j || i === x - 1 || j === y - 1;

      const height = isOuterEdge ? 3 : calculateHeight(i, j, x, y);

      heights.push(height);
    }

    matrix.push(heights);
  }

  return matrix;
};

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

  const matrix = createHeightMatrix(x, y);

  const elementSize = 100 / x;

  const shape = new Heightfield(matrix, {
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

  model.geometry.copy(shape.body.)

  /////////////////////////////////////////////////////////////////////////////

  return {
    body,
    model,
  };
};
