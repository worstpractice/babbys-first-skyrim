import type { MouseEventHandler } from 'react';
import { default as React } from 'react';
import type { Game } from 'src/game/typings/Game';
import { BottomCard } from 'src/views/components/BottomCard';
import { Character } from 'src/views/components/Character';
import { Portrait } from 'src/views/components/Portrait';
import { Quests } from 'src/views/components/Quests';
import { useUiState } from 'src/views/state/UiState';
import type { UiState } from 'src/views/typings/state/UiState';
import { css } from 'src/views/utils/as/css';
import { from } from 'src/views/utils/state/from';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Selectors *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromUi = from<UiState>().select('toggleCurrentOpenMenu');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly game: Game;
};

export const GameUi = ({ game }: Props) => {
  const { toggleCurrentOpenMenu } = useUiState(fromUi);

  const handleClickCharacter: MouseEventHandler<HTMLElement> = () => {
    toggleCurrentOpenMenu('character');
  };

  const handleClickInventory: MouseEventHandler<HTMLElement> = () => {
    toggleCurrentOpenMenu('inventory');
  };

  const handleClickQuests: MouseEventHandler<HTMLElement> = () => {
    toggleCurrentOpenMenu('quests');
  };

  return (
    <div style={styles.ui}>
      <div style={styles.topHalf}>
        <Portrait />
        {/* <Inventory inventory={inventory} /> */}
        <Character />
        <Quests />
      </div>
      <div style={styles.bottomHalf}>
        <BottomCard iconName="character" onClick={handleClickCharacter} />
        <BottomCard iconName="inventory" onClick={handleClickInventory} />
        <BottomCard iconName="quests" onClick={handleClickQuests} />
      </div>
    </div>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  bottomHalf: css({
    alignItems: 'flex-end',
    display: 'flex',
    gap: 10,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  } as const),
  topHalf: css({
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    width: '100%',
  } as const),
  ui: css({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    width: '100%',
  } as const),
} as const;
