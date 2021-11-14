import { default as React } from 'react';
import { useUiState } from 'src/state/UiState';
import { BACKGROUND } from 'src/styles';
import type { UiState } from 'src/typings/state/UiState';
import { css } from 'src/utils/as/css';
import { from } from 'src/utils/from';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Selectors *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromUi = from<UiState>().select('currentOpenMenu');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly [key in PropertyKey]: never;
};

export const Character = ({}: Props) => {
  const { currentOpenMenu } = useUiState(fromUi);

  if (currentOpenMenu !== 'character') return null;

  return (
    <div style={styles.character}>
      <h1 style={styles.title}>Character</h1>
    </div>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  character: css({
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
