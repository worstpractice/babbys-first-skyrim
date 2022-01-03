import type { Actor } from 'src/game/typings/Actor';
import type { Effects } from 'src/game/typings/commands/Effects';
import type { InventoryItem } from 'src/game/typings/InventoryItem';
import { itemNameToAction } from 'src/views/lookup-tables/itemNameToAnimation';

export const registerEffectHandlers = ({ actions, effects }: Actor): Effects => {
  /////////////////////////////////////////////////////////////////////////////
  // * Levitating *
  /////////////////////////////////////////////////////////////////////////////
  const startLevitating = (): void => {
    effects.add('levitating');
  };

  const stopLevitating = (): void => {
    effects.delete('levitating');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Moving *
  /////////////////////////////////////////////////////////////////////////////
  const startMoving = (): void => {
    effects.add('moving');
  };

  const stopMoving = (): void => {
    effects.delete('moving');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Turning *
  /////////////////////////////////////////////////////////////////////////////
  const startTurning = (): void => {
    effects.add('turning');
  };

  const stopTurning = (): void => {
    effects.delete('turning');
  };

  /////////////////////////////////////////////////////////////////////////////
  // * Using *
  /////////////////////////////////////////////////////////////////////////////
  const startUsing = ({ name }: InventoryItem): void => {
    effects.add('using');

    const action = itemNameToAction[name];

    actions.once('remove', action, (): void => {
      actions.isEmpty ? stopUsing() : actions.once('empty', stopUsing);
    });
  };

  const stopUsing = (): void => {
    effects.delete('using');
  };
  /////////////////////////////////////////////////////////////////////////////

  return {
    startLevitating,
    startMoving,
    startTurning,
    startUsing,
    stopLevitating,
    stopMoving,
    stopTurning,
    stopUsing,
  } as const;
};
