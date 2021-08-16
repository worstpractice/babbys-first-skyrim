import type { CSSProperties } from 'react';
import { default as React } from 'react';
import { useUiState } from 'src/state/UiState';
import { BACKGROUND } from 'src/styles';
import type { UiState } from 'src/typings/state/UiState';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Selectors *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromUi = ({ currentOpenMenu }: UiState) => {
  return {
    currentOpenMenu,
  } as const;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {};

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
  character: {
    ...BACKGROUND,
    borderRadius: '1%',
    display: 'flex',
    flexDirection: 'column',
    height: 400,
    justifyContent: 'space-between',
    padding: 20,
    pointerEvents: 'all',
    width: 420,
  } as CSSProperties,
  title: {
    marginTop: 0,
  } as CSSProperties,
} as const;
