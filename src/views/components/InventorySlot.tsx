import { default as React, useRef } from 'react';
import type { Inventory } from 'src/game/typings/Inventory';
import { useClickedState } from 'src/views/state/ClickedState';
import { useDraggedState } from 'src/views/state/DraggedState';
import type { Slot } from 'src/views/typings/inventory/Slot';
import type { SlotEvent } from 'src/views/typings/inventory/SlotEvent';
import type { ClickedState } from 'src/views/typings/state/ClickedState';
import type { DraggedState } from 'src/views/typings/state/DraggedState';
import { css } from 'src/views/utils/as/css';
import { slot } from 'src/views/utils/make/slot';
import { from } from 'src/views/utils/state/from';
import { toIconUrl } from 'src/views/utils/urls/toIconUrl';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Selectors *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromClicked = from<ClickedState>().select('currentlyClickedElement', 'setCurrentlyClickedElement');
const fromDragged = from<DraggedState>().select('currentlyDraggedElement', 'setCurrentlyDraggedElement');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly index: Slot;
  readonly inventory: Inventory;
  readonly onChange: (event: SlotEvent) => void;
};

export const InventorySlot = ({ index, inventory, onChange }: Props) => {
  const { currentlyClickedElement, setCurrentlyClickedElement } = useClickedState(fromClicked);
  const { currentlyDraggedElement, setCurrentlyDraggedElement } = useDraggedState(fromDragged);
  const slotRef = useRef<HTMLDivElement>(null);
  const item = inventory.heldIn(index);

  const handleMouseDown = (): void => {
    const { current } = slotRef;

    if (!current?.style.backgroundImage) return;

    setCurrentlyClickedElement(current);
  };

  const handleMouseUp = (): void => {
    const { current } = slotRef;

    if (!current) return;
    if (!currentlyDraggedElement) return;

    // Freaky friday
    const me = current;
    const them = currentlyDraggedElement;

    const myIndex = index;
    const theirIndex = slot(Number(them.id));

    const myBackgroundImage = me.style.backgroundImage;
    const theirBackgroundImage = them.style.backgroundImage;

    // Swap background images
    me.style.backgroundImage = theirBackgroundImage;
    them.style.backgroundImage = myBackgroundImage;

    setCurrentlyClickedElement(null);
    setCurrentlyDraggedElement(null);

    inventory.swap(myIndex, theirIndex);

    onChange({
      item: inventory.heldIn(myIndex),
      slot: index,
    } as const);
  };

  const handleMouseLeave = (): void => {
    const { current } = slotRef;

    if (!current?.style.backgroundImage) return;
    if (currentlyClickedElement !== current) return;

    setCurrentlyDraggedElement(current);
  };

  const style = item
    ? ({
        ...slotStyles.occupied,
        backgroundImage: toIconUrl(item.name),
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
  slot: css({
    backgroundColor: 'rgb(0, 0, 0, 1)',
    border: 'rgb(0, 0, 0, 1)',
    borderRadius: '5%',
    borderStyle: 'solid',
    height: 60,
    padding: 12.5,
    pointerEvents: 'all',
    width: 60,
  } as const),
} as const;

const slotStyles = {
  occupied: css({
    ...styles.slot,
    cursor: 'pointer',
  } as const),
  vacant: css({
    ...styles.slot,
  } as const),
} as const;
