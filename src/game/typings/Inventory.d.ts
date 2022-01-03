import type { InventoryItem } from 'src/game/typings/InventoryItem';
import type { Slot } from 'src/views/typings/inventory/Slot';

export type Inventory = {
  readonly equip: (this: Inventory, item: InventoryItem, slot: Slot) => InventoryItem;
  readonly heldIn: (this: Inventory, slot: Slot) => InventoryItem;
  readonly swap: (this: Inventory, slotA: Slot, slotB: Slot) => void;
  readonly unequip: (this: Inventory, slot: Slot) => InventoryItem;
};
