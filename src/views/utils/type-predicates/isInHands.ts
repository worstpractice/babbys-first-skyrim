import type { BodySlots } from 'src/views/typings/Equipped';
import type { Slot } from 'src/views/typings/inventory/Slot';

export const isHandSlot = (slot: Slot): slot is keyof BodySlots => {
  return Number(slot) >= 0 && Number(slot) <= 7;
};
