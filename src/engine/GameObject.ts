import type { Body } from 'cannon-es';
import type { Object3D } from 'three';

export abstract class GameObject {
  abstract readonly body: Body;

  abstract readonly mesh: Object3D;

  private onBeginPlay(this: this): void {
    console.log('onBeginPlay', this);
  }
}
