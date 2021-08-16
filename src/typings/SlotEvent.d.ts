import type { ItemName } from 'src/typings/ItemName';
import type { SlotNumber } from 'src/typings/phantom-types/number/SlotNumber';

export type SlotEvent = {
  readonly index: SlotNumber;
  readonly item: ItemName;
};
