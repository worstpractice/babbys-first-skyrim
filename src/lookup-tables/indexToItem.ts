import type { ItemName } from "../typings/ItemName";
import type { SlotNumber } from "../typings/phantom-types/number/SlotNumber";

/** NOTE: maps an index to an item... in other words, it's an inventory. */
export const indexToItem = new Map<SlotNumber, ItemName>();

indexToItem.set(8 as SlotNumber, "sword");
