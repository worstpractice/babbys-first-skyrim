import type { Action } from 'src/game/typings/Action';
import type { ItemName } from 'src/views/typings/ItemName';

export type Item = {
  readonly application: Action;
  readonly name: ItemName;
};
