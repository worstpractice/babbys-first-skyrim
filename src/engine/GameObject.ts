import type { Body } from 'cannon-es';
import { ObSet } from 'obset';
import { createSnitch } from 'src/engine/utils/createSnitch';
import { panic } from 'src/engine/utils/panic';
import type { AnimationMixer, Object3D } from 'three';

export abstract class GameObject {
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Static *
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static readonly instances = new ObSet<GameObject>() //
    .on('add', createSnitch('GameObject'))
    .on('delete', createSnitch('GameObject'));

  static beginPlay(this: typeof GameObject, instance: GameObject): void {
    instance.onBeginPlay();
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  readonly body: Body | null = null;

  readonly mixer?: AnimationMixer | null = null;

  readonly mesh: Object3D | null = null;

  constructor() {
    GameObject.instances.add(this);
  }

  private onBeginPlay(this: this): void {
    console.log('onBeginPlay', this);
  }

  private [Symbol.toPrimitive](this: this, hint: 'default' | 'number' | 'string'): string | never {
    // prettier-ignore
    return (hint === 'number')
      ? panic(new TypeError(`${this.constructor.name} instance cannot be coerced into a number`))
      : this.constructor.name
  }
}
