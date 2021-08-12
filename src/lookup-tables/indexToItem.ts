import type { ItemName } from "src/typings/ItemName";
import type { SlotNumber } from "src/typings/phantom-types/number/SlotNumber";

const eight = 8 as SlotNumber;

/** NOTE: maps an index to an item... in other words, it's an inventory. */
export const indexToItem: { [key in SlotNumber]: ItemName } = {
  [eight]: "sword",
};
