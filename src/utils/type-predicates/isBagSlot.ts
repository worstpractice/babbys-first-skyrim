import type { BagSlot } from 'src/typings/inventory/BagSlot';
import type { Slot } from 'src/typings/inventory/Slot';

export const isBagSlot = (slot: Slot): slot is BagSlot => {
  return slot >= 7 && slot <= 31;
};
