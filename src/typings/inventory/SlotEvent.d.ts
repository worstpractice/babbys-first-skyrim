import type { Slot } from 'src/typings/inventory/Slot';
import type { ItemName } from 'src/typings/ItemName';

export type SlotEvent = {
  readonly item: ItemName;
  readonly slot: Slot;
};
