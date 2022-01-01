import { default as React } from 'react';
import { useUiState } from 'src/views/state/UiState';
import { BACKGROUND } from 'src/views/styles';
import type { UiState } from 'src/views/typings/state/UiState';
import { css } from 'src/views/utils/as/css';
import { from } from 'src/views/utils/state/from';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Selectors *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromUi = from<UiState>().select('currentOpenMenu');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly [key in PropertyKey]: never;
};

export const Quests = ({}: Props) => {
  const { currentOpenMenu } = useUiState(fromUi);

  if (currentOpenMenu !== 'quests') return null;

  return (
    <div style={styles.quests}>
      <h1 style={styles.title}>Quests</h1>
    </div>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  quests: css({
    ...BACKGROUND,
    borderRadius: '1%',
    display: 'flex',
    flexDirection: 'column',
    height: 500,
    justifyContent: 'space-between',
    padding: 20,
    pointerEvents: 'all',
    width: 525,
  } as const),

  title: css({
    marginTop: 0,
  } as const),
} as const;
