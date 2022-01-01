import type { Item } from 'src/game/typings/Item';
import type { Slot } from 'src/views/typings/inventory/Slot';

export type SlotEvent = {
  readonly item: Item;
  readonly slot: Slot;
};
