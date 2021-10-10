import { itemNameToModel } from 'src/lookup-tables/itemNameToModel';
import type { SlotEvent } from 'src/typings/SlotEvent';

export const handleItem = ({ item, slot }: SlotEvent): void => {
  const isBeingEquipped = slot < 8;

  const weaponModel = itemNameToModel['sword'];

  if (!weaponModel) {
    console.warn(`No weapon model for sword!`);
    return;
  }

  weaponModel.visible = isBeingEquipped;

  const verb = isBeingEquipped ? 'Equipped' : 'Moved';

  console.log(`${verb} ${item} into slot #${slot}`);
};
