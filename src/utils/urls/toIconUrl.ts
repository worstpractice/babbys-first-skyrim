import type { ItemName } from "../../typings/ItemName";

export const toIconUrl = (itemName: ItemName = "") => {
  return itemName ? `url(/assets/icons/${itemName}.svg)` : "";
};
