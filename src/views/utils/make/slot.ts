import type { Slot } from 'src/views/typings/inventory/Slot';
import { panic } from 'src/views/utils/panic';
import { isSlot } from 'src/views/utils/type-predicates/isSlot';

export const slot = <T extends number>(n: T): Slot => {
  return isSlot(n) ? n : panic(`Expected value in range 0-31, recieved ${n}`);
};
