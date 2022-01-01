import type { Item } from 'src/game/typings/Item';
import type { Slot } from 'src/views/typings/inventory/Slot';

export type Inventory = {
  readonly equip: (this: Inventory, item: Item, slot: Slot) => Item;
  readonly heldIn: (this: Inventory, slot: Slot) => Item;
  readonly swap: (this: Inventory, slotA: Slot, slotB: Slot) => void;
  readonly unequip: (this: Inventory, slot: Slot) => Item;
};
