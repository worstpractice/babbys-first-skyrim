import type { BodySlots } from 'src/typings/Equipped';
import type { Slot } from 'src/typings/inventory/Slot';

export const isHandSlot = (slot: Slot): slot is keyof BodySlots => {
  return Number(slot) >= 0 && Number(slot) <= 7;
};
