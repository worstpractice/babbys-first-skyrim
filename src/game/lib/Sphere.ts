import { Body, Sphere as CannonSphere, Vec3 } from 'cannon-es';
import { GameObject } from 'src/engine/GameObject';
import { upTo } from 'src/views/utils/math/upTo';
import { Mesh, MeshNormalMaterial, SphereGeometry } from 'three';

export class Sphere extends GameObject {
  readonly body: Body;

  readonly mesh: Mesh<SphereGeometry, MeshNormalMaterial>;

  readonly radius = Math.max(3, upTo(12)); // meters

  constructor() {
    super();

    this.body = new Body({
      mass: 0.1, // kg
      position: new Vec3(
        //
        Math.max(10, upTo(100)),
        Math.max(10, upTo(100)),
        Math.max(10, upTo(100)),
      ),
      shape: new CannonSphere(this.radius),
      type: Body.DYNAMIC,
    });

    this.mesh = new Mesh(
      //
      new SphereGeometry(this.radius),
      new MeshNormalMaterial(),
    );

    this.mesh.position.set(
      //
      this.body.position.x,
      this.body.position.y,
      this.body.position.z,
    );
  }
}
