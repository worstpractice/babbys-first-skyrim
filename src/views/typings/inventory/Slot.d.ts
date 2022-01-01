import type { BagSlots } from 'src/views/typings/Bagged';
import type { BodySlots } from 'src/views/typings/Equipped';

// prettier-ignore
export type Slot =
  | keyof BodySlots
  | keyof BagSlots
