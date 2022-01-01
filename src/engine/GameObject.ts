import type { Body } from 'cannon-es';
import { ObSet } from 'obset';
import { panic } from 'src/engine/utils/panic';
import { uuid } from 'src/engine/utils/uuid';
import { snitch } from 'src/views/utils/snitch';
import type { Object3D } from 'three';

export abstract class GameObject {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Static *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  private static readonly id = 'e92e56c9-f9ab-49de-a002-c63671551710';

  static readonly instances: ObSet<GameObject> = new ObSet<GameObject>()
    //
    .on('add', snitch)
    .on('delete', snitch);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Instance *
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  abstract readonly body: Body;

  readonly kind = (this.constructor as typeof GameObject).id;

  readonly id = uuid();

  abstract readonly mesh: Object3D;

  constructor() {
    GameObject.instances.add(this);
  }

  private [Symbol.toPrimitive](this: this, hint: 'default' | 'number' | 'string'): string | never {
    // prettier-ignore
    return (hint === 'number')
      ? panic(new TypeError(`${this.constructor.name} instance cannot be coerced into a number`))
      : this.constructor.name
  }

  private onBeginPlay(this: this): void {
    console.log('onBeginPlay', this);
  }
}
