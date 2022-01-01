import { Body, Sphere, Vec3 } from 'cannon-es';
import type { GameObject } from 'src/game/typings/GameObject';
import { upTo } from 'src/views/utils/math/upTo';
import { Mesh, MeshNormalMaterial, SphereGeometry } from 'three';

export const createSphere = (): GameObject => {
  const radius = Math.max(3, upTo(12)); // meters

  const mesh = new Mesh(
    //
    new SphereGeometry(radius),
    new MeshNormalMaterial(),
  );

  const body = new Body({
    mass: 0.1, // kg
    position: new Vec3(
      //
      Math.max(10, upTo(100)),
      Math.max(10, upTo(100)),
      Math.max(10, upTo(100)),
    ),
    shape: new Sphere(radius),
    type: Body.DYNAMIC,
  });

  mesh.position.set(body.position.x, body.position.y, body.position.z);

  return {
    body,
    mesh,
  } as const;
};
