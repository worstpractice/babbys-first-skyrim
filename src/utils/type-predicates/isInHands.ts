import type { HandSlot } from 'src/typings/inventory/HandSlot';
import type { Slot } from 'src/typings/inventory/Slot';

export const isHandSlot = (slot: Slot): slot is HandSlot => {
  return slot >= 0 && slot <= 7;
};
