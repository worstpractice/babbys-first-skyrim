import { Body, Plane, Quaternion, Vec3 } from 'cannon-es';
import { GameObject } from 'src/engine/GameObject';
import type { HasPhysics } from 'src/engine/utils/hasPhysics';
import { COLOR_GROUND } from 'src/game/constants/COLOR_GROUND';
import { FACING_UPRIGHT } from 'src/game/constants/FACING_UPRIGHT';
import { GROUND_PLANE_SIDE } from 'src/game/constants/GROUND_PLANE_SIDE';
import { BufferGeometry, Mesh, MeshStandardMaterial, PlaneGeometry } from 'three';

export class Ground extends GameObject implements HasPhysics {
  readonly body: Body;

  readonly mesh: Mesh<BufferGeometry, MeshStandardMaterial>;

  constructor() {
    super();

    this.body = new Body({
      fixedRotation: true,
      mass: 0,
      position: new Vec3(0, 0, 0),
      quaternion: new Quaternion().setFromEuler(FACING_UPRIGHT, 0, 0),
      shape: new Plane(),
      type: Body.STATIC,
    });

    this.mesh = new Mesh(
      new PlaneGeometry(GROUND_PLANE_SIDE, GROUND_PLANE_SIDE),
      new MeshStandardMaterial({
        color: COLOR_GROUND,
      }),
    );

    this.mesh.name = 'groundPlane';
    this.mesh.castShadow = false;
    this.mesh.receiveShadow = true;
    this.mesh.rotation.x = FACING_UPRIGHT;
  }
}
