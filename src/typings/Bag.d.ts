import type { Equipped } from 'src/typings/Equipped';

export type Bag = readonly [
  // 24
  ...Equipped,
  ...Equipped,
  ...Equipped
];
