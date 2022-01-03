import type { InventoryItem } from 'src/game/typings/InventoryItem';
import type { Slot } from 'src/views/typings/inventory/Slot';

export type SlotEvent = {
  readonly item: InventoryItem;
  readonly slot: Slot;
};
