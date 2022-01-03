import { Body, Box, Vec3 } from 'cannon-es';
import { ObSet } from 'obset';
import { GameObject } from 'src/engine/GameObject';
import type { HasMixer } from 'src/engine/utils/hasMixer';
import type { HasPhysics } from 'src/engine/utils/hasPhysics';
import { createInventory } from 'src/game/entities/createInventory';
import type { Action } from 'src/game/typings/Action';
import type { Animation } from 'src/game/typings/Animation';
import type { Effect } from 'src/game/typings/Effect';
import type { Inventory } from 'src/game/typings/Inventory';
import type { Table } from 'src/game/typings/Table';
import { upTo } from 'src/views/utils/math/upTo';
import { snitch } from 'src/views/utils/snitch';
import type { AnimationClip, Mesh } from 'three';
import { AnimationMixer, LoopOnce } from 'three';

export class Pawn extends GameObject implements HasMixer, HasPhysics {
  readonly actions: ObSet<Action> = new ObSet<Action>()
    //
    .on('add', snitch)
    .on('delete', snitch);

  readonly animations: Table<Action, Animation>;

  readonly body: Body;

  readonly effects: ObSet<Effect> = new ObSet<Effect>()
    //
    .on('add', snitch)
    .on('delete', snitch);

  readonly inventory: Inventory = createInventory();

  readonly mesh: Mesh;

  readonly mixer: AnimationMixer;

  constructor(mesh: Mesh, nameClipDuos: readonly (readonly [Action, AnimationClip])[]) {
    super();

    this.mesh = mesh;

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // * Create Mixer *
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.mixer = new AnimationMixer(this.mesh); // Every mixer has one model

    // mixers.push(mixer); need this step to get it registered on the engine

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // * Create Action Clips *
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const entries = nameClipDuos.map(this.mapStuff, this);

    this.animations = Object.fromEntries(entries) as Table<Action, Animation>;

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // * Create Physics *
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.body = new Body({
      mass: 80, // kg
      position: new Vec3(
        //
        Math.max(0, upTo(25)),
        Math.max(10, upTo(100)),
        Math.max(0, upTo(25)),
      ),
      shape: new Box(new Vec3(6, 12, 6)),
      type: Body.DYNAMIC,
    });
  }

  private mapStuff(this: this, [action, animationClip]: readonly [Action, AnimationClip]) {
    animationClip.name = `${action}Clip` as const;

    const animationAction = this.mixer.clipAction(animationClip);

    const shouldLoopOnce = animationClip.name === 'jumpingClip' || animationClip.name === 'attackingClip';

    if (shouldLoopOnce) {
      animationAction.setLoop(LoopOnce, 1);
    }

    const animation: Animation = {
      animationAction,
      animationClip,
    } as const;

    return [action, animation] as const;
  }
}
