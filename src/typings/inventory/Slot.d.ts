import type { BagSlots } from 'src/typings/Bagged';
import type { BodySlots } from 'src/typings/Equipped';

// prettier-ignore
export type Slot =
  | keyof BodySlots
  | keyof BagSlots
