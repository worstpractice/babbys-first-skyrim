import type { ItemName } from "src/typings/ItemName";

export const toIconUrl = (itemName: ItemName = "") => {
  return itemName ? `url(/assets/icons/${itemName}.svg)` : "";
};
