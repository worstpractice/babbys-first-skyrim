import { Body, Sphere, Vec3 } from 'cannon-es';
import type { Thing } from 'src/game/typings/Thing';
import { upTo } from 'src/utils/math/upTo';
import { Mesh, MeshNormalMaterial, SphereGeometry } from 'three';

export const createSphere = (): Thing => {
  const radius = Math.max(3, upTo(12)); // meters

  const model = new Mesh(
    //
    new SphereGeometry(radius),
    new MeshNormalMaterial(),
  );

  const body = new Body({
    mass: Math.max(10, upTo(100)), // kg
    position: new Vec3(Math.max(10, upTo(100)), Math.max(10, upTo(100)), Math.max(10, upTo(100))),
    shape: new Sphere(radius),
    type: Body.DYNAMIC,
  });

  model.position.set(body.position.x, body.position.y, body.position.z);

  return {
    body,
    model,
  };
};
