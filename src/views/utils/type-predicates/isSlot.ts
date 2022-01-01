import type { Slot } from 'src/views/typings/inventory/Slot';

export const isSlot = (n: number): n is Slot => {
  return n >= 0 && n <= 31;
};
