import type { Body } from 'cannon-es';
import type { ObSet } from 'obset';
import type { Action } from 'src/game/typings/Action';
import type { Animation } from 'src/game/typings/Animation';
import type { Effect } from 'src/game/typings/Effect';
import type { Inventory } from 'src/game/typings/Inventory';
import type { Table } from 'src/game/typings/Table';
import type { AnimationMixer, Object3D } from 'three';

export type Player = {
  readonly actions: ObSet<Action>;
  readonly animations: Table<Action, Animation>;
  readonly body: Body;
  readonly effects: ObSet<Effect>;
  readonly inventory: Inventory;
  readonly mixer: AnimationMixer;
  readonly model: Object3D;
};
