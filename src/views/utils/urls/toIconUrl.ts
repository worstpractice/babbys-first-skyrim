import type { ItemName } from 'src/views/typings/ItemName';

export const toIconUrl = (itemName: ItemName = '') => {
  return itemName ? `url(/assets/icons/${itemName}.svg)` : '';
};
