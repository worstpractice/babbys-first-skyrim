import type { Slot } from 'src/typings/inventory/Slot';
import { panic } from 'src/utils/panic';
import { isSlot } from 'src/utils/type-predicates/isSlot';

export const slot = <T extends number>(n: T): Slot => {
  return isSlot(n) ? n : panic(`Expected value in range 0-31, recieved ${n}`);
};
