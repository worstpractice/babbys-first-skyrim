import type { ItemName } from 'src/typings/ItemName';

export type SlotEvent = {
  readonly item: ItemName;
  readonly slot: number;
};
