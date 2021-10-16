import { itemNameToModel } from 'src/lookup-tables/itemNameToModel';
import type { SlotEvent } from 'src/typings/inventory/SlotEvent';
import { isHandSlot } from 'src/utils/type-predicates/isInHands';

export const handleItem = ({ item, slot }: SlotEvent): void => {
  const model = itemNameToModel[item];

  if (!model) return console.warn(`No model for ${item}!`);

  const isBeingEquipped = isHandSlot(slot);

  model.visible = isBeingEquipped;

  const verb = isBeingEquipped ? 'Equipped' : 'Moved';

  console.log(`${verb} ${item} into slot #${slot}`);
};
