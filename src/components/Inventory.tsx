import { default as React } from 'react';
import { InventorySlot } from 'src/components/InventorySlot';
import { Flex } from 'src/components/layout/Flex';
import { Statue } from 'src/components/Statue';
import { FIRST_ROW, LEFT_COLUMN, RIGHT_COLUMN, SECOND_ROW, THIRD_ROW } from 'src/constants/INVENTORY';
import type { Inventory as I } from 'src/game/typings/Inventory';
import { handleChange } from 'src/handlers/handleChange';
import { useClickedState } from 'src/state/ClickedState';
import { useDraggedState } from 'src/state/DraggedState';
import { useUiState } from 'src/state/UiState';
import { BACKGROUND } from 'src/styles';
import type { Slot } from 'src/typings/inventory/Slot';
import type { ClickedState } from 'src/typings/state/ClickedState';
import type { DraggedState } from 'src/typings/state/DraggedState';
import type { UiState } from 'src/typings/state/UiState';
import { css } from 'src/utils/as/css';
import { from } from 'src/utils/state/from';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Selectors *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromClicked = from<ClickedState>().select('setCurrentlyClickedElement');
const fromDragged = from<DraggedState>().select('setCurrentlyDraggedElement');
const fromUi = from<UiState>().select('currentOpenMenu');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly inventory: I;
};

export const Inventory = ({ inventory }: Props) => {
  const { setCurrentlyClickedElement } = useClickedState(fromClicked);
  const { setCurrentlyDraggedElement } = useDraggedState(fromDragged);
  const { currentOpenMenu } = useUiState(fromUi);

  if (currentOpenMenu !== 'inventory') return null;

  const resetClickState = (): void => {
    setCurrentlyClickedElement(null);
    setCurrentlyDraggedElement(null);
  };

  let slotNumber: Slot = 0;

  return (
    <Flex direction="column" resetClickState={resetClickState} style={styles.inventory}>
      <Flex direction="row">
        <Flex direction="column">
          {LEFT_COLUMN.map(() => {
            const index = slotNumber++ as Slot;

            return <InventorySlot index={index} inventory={inventory} key={index} onChange={handleChange} />;
          })}
        </Flex>
        <Statue />
        <Flex direction="column">
          {RIGHT_COLUMN.map(() => {
            const index = slotNumber++ as Slot;

            return <InventorySlot index={index} inventory={inventory} key={index} onChange={handleChange} />;
          })}
        </Flex>
      </Flex>
      <Flex direction="row">
        {FIRST_ROW.map(() => {
          const index = slotNumber++ as Slot;

          return <InventorySlot index={index} inventory={inventory} key={index} onChange={handleChange} />;
        })}
      </Flex>
      <Flex direction="row">
        {SECOND_ROW.map(() => {
          const index = slotNumber++ as Slot;

          return <InventorySlot index={index} inventory={inventory} key={index} onChange={handleChange} />;
        })}
      </Flex>
      <Flex direction="row">
        {THIRD_ROW.map(() => {
          const index = slotNumber++ as Slot;

          return <InventorySlot index={index} inventory={inventory} key={index} onChange={handleChange} />;
        })}
      </Flex>
    </Flex>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  inventory: css({
    ...BACKGROUND,
    borderRadius: '1%',
    paddingBottom: 32,
    paddingLeft: 32,
    paddingRight: 32,
    pointerEvents: 'all',
  } as const),
} as const;
