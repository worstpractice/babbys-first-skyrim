import type { CSSProperties } from 'react';
import { default as React } from 'react';
import { useUiState } from 'src/state/UiState';
import { BACKGROUND } from 'src/styles';
import type { UiState } from 'src/typings/state/UiState';
import { as } from 'src/utils/as';
import { from } from 'src/utils/selectors/from';

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
  quests: as<CSSProperties>({
    ...BACKGROUND,
    borderRadius: '1%',
    display: 'flex',
    flexDirection: 'column',
    height: 500,
    justifyContent: 'space-between',
    padding: 20,
    pointerEvents: 'all',
    width: 525,
  }),
  title: as<CSSProperties>({
    marginTop: 0,
  }),
} as const;
