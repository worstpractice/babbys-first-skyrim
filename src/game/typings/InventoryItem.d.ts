import type { Action } from 'src/game/typings/Action';
import type { ItemName } from 'src/views/typings/ItemName';
import type { Mesh } from 'three';

export type InventoryItem = {
  readonly application: Action;
  readonly mesh?: Mesh;
  readonly name: ItemName;
};
