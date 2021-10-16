import type { Bag } from 'src/typings/Bag';
import type { Equipped } from 'src/typings/Equipped';
import type { Slot } from 'src/typings/inventory/Slot';
import type { ItemName } from 'src/typings/ItemName';

const inventory: [...Equipped, ...Bag] = [
  // equipped (8)
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  // bag (24)
  'sword',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
];

export const character = {
  equip(newItem: ItemName, slot: Slot): ItemName {
    const oldItem = inventory[slot];

    inventory[slot] = newItem;

    return oldItem;
  },

  heldIn(slot: Slot): ItemName {
    return inventory[slot];
  },

  swap(slotA: Slot, slotB: Slot): void {
    const itemA = inventory[slotA];
    const itemB = inventory[slotB];

    this.equip(itemA, slotB);
    this.equip(itemB, slotA);
  },
} as const;
