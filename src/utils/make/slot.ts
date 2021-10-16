import type { Slot } from 'src/typings/inventory/Slot';
import { bail } from 'src/utils/bail';
import { isSlot } from 'src/utils/type-predicates/isSlot';

export const slot = <T extends number>(n: T): Slot => {
  return isSlot(n) ? n : bail(new RangeError(`Expected value in range 0-31, recieved ${n}`));
};
