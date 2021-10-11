import type { CSSProperties } from 'react';
import { default as React, useRef } from 'react';
import { handleItem } from 'src/handlers/handleItem';
import { character } from 'src/lookup-tables/character';
import { useClickedState } from 'src/state/ClickedState';
import { useDraggedState } from 'src/state/DraggedState';
import type { ItemName } from 'src/typings/ItemName';
import type { SlotEvent } from 'src/typings/SlotEvent';
import type { ClickedState } from 'src/typings/state/ClickedState';
import type { DraggedState } from 'src/typings/state/DraggedState';
import { as } from 'src/utils/as';
import { from } from 'src/utils/from';
import { toIconUrl } from 'src/utils/urls/toIconUrl';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Selectors *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromClicked = from<ClickedState>().select('currentlyClickedElement', 'setCurrentlyClickedElement');
const fromDragged = from<DraggedState>().select('currentlyDraggedElement', 'setCurrentlyDraggedElement');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly item?: ItemName;
  readonly onItem?: (event: SlotEvent) => void;
  readonly index: number;
};

export const InventorySlot = ({ onItem = handleItem, index }: Props) => {
  const { currentlyClickedElement, setCurrentlyClickedElement } = useClickedState(fromClicked);
  const { currentlyDraggedElement, setCurrentlyDraggedElement } = useDraggedState(fromDragged);
  const slotRef = useRef<HTMLDivElement>(null);
  const item = character.heldIn(index);

  ///////////////////////////////////////////////////////////////////////////
  const handleMouseDown = (): void => {
    const { current } = slotRef;

    if (!current) return;
    if (!current.style.backgroundImage) return;

    setCurrentlyClickedElement(current);
  };

  ///////////////////////////////////////////////////////////////////////////
  const handleMouseUp = (): void => {
    const { current } = slotRef;

    if (!current) return;
    if (!currentlyDraggedElement) return;

    // Freaky friday
    const me = current;
    const them = currentlyDraggedElement;

    const myIndex = index;
    const theirIndex = Number.parseInt(them.id);

    const myBackgroundImage = me.style.backgroundImage;
    const theirBackgroundImage = them.style.backgroundImage;

    const myItem = character.heldIn(myIndex);
    const theirItem = character.heldIn(theirIndex);

    // Swap background images
    me.style.backgroundImage = theirBackgroundImage;
    them.style.backgroundImage = myBackgroundImage;

    // Swap game items
    character.equip(myItem, theirIndex);
    character.equip(theirItem, myIndex);

    setCurrentlyClickedElement(null);
    setCurrentlyDraggedElement(null);

    const myNewItem = theirItem;

    onItem({
      item: myNewItem,
      slot: index,
    } as const);
  };

  ///////////////////////////////////////////////////////////////////////////
  const handleMouseLeave = (): void => {
    const { current } = slotRef;

    if (!current) return;
    if (!current.style.backgroundImage) return;
    if (currentlyClickedElement !== current) return;

    setCurrentlyDraggedElement(current);
  };

  ///////////////////////////////////////////////////////////////////////////
  const style: CSSProperties = item
    ? ({
        ...slotStyles.occupied,
        backgroundImage: toIconUrl(item),
      } as const)
    : slotStyles.vacant;

  return (
    <div
      //
      id={`${index}`}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      ref={slotRef}
      style={style}
    />
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  slot: as<CSSProperties>({
    backgroundColor: 'rgb(0, 0, 0, 1)',
    border: 'rgb(0, 0, 0, 1)',
    borderRadius: '5%',
    borderStyle: 'solid',
    height: 60,
    padding: 12.5,
    pointerEvents: 'all',
    width: 60,
  }),
} as const;

const slotStyles = {
  occupied: as<CSSProperties>({
    ...styles.slot,
    cursor: 'pointer',
  }),
  vacant: as<CSSProperties>({
    ...styles.slot,
  }),
} as const;
