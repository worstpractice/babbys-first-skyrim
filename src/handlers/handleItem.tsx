import { itemNameToModel } from 'src/lookup-tables/itemNameToModel';
import type { SlotEvent } from 'src/typings/SlotEvent';

export const handleItem = ({ item, slot }: SlotEvent): void => {
  const isBeingEquipped = slot < 8;

  const model = itemNameToModel[item];

  if (!model) return console.warn(`No model for ${item}!`);

  model.visible = isBeingEquipped;

  const verb = isBeingEquipped ? 'Equipped' : 'Moved';

  console.log(`${verb} ${item} into slot #${slot}`);
};
