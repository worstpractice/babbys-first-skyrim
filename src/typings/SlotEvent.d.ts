import type { ItemName } from "./ItemName";
import type { SlotNumber } from "./phantom-types/number/SlotNumber";

export type SlotEvent = {
  readonly index: SlotNumber;
  readonly item: ItemName;
};
