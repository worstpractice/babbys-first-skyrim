import type { CSSProperties } from 'react';
import { default as React } from 'react';
import { BACKGROUND } from 'src/styles';

type Props = {
  readonly [key in PropertyKey]: never;
};

export const Portrait = ({}: Props) => {
  return <div style={styles.portrait} />;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  portrait: {
    ...BACKGROUND,
    borderRadius: '50%',
    height: 280,
    pointerEvents: 'all',
    width: 280,
  } as CSSProperties,
} as const;
