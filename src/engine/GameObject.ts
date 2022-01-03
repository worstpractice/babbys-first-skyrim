import type { Body } from 'cannon-es';
import { GAME_OBJECTS } from 'src/engine/globals/GAME_OBJECTS';
import { panic } from 'src/engine/utils/panic';
import type { AnimationMixer, Mesh } from 'three';

export abstract class GameObject {
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // * Static *
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static beginPlay(this: typeof GameObject, instance: GameObject): void {
    instance.onBeginPlay();
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  readonly body: Body | null = null;

  readonly class: typeof GameObject;

  readonly mixer: AnimationMixer | null = null;

  readonly mesh: Mesh | null = null;

  constructor() {
    this.class = new.target;
    console.count(`constructor: ${new.target.name}`);
    GAME_OBJECTS.add(this);
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
