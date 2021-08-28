import { Body, Sphere } from 'cannon-es';
import type { Thing } from 'src/game/typings/Thing';
import { Mesh, MeshNormalMaterial, SphereGeometry } from 'three';

const RADIUS = 3; // m

export const createSphere = (): Thing => {
  const mesh = new Mesh(
    //
    new SphereGeometry(RADIUS),
    new MeshNormalMaterial(),
  );

  const body = new Body({
    mass: 5, // kg
    shape: new Sphere(RADIUS),
  });

  body.position.set(0, 20, 0); // m
  mesh.position.set(body.position.x, body.position.y, body.position.z);

  return {
    body,
    model: mesh,
  };
};
