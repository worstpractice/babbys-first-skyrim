import { default as React } from 'react';
import { css } from 'src/utils/as/css';

type Props = {
  readonly [key in PropertyKey]: never;
};

export const Statue = ({}: Props) => {
  return <div style={styles.statue} />;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// * Styles *
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = {
  statue: css({
    height: 440,
    pointerEvents: 'all',
    width: 250,
  } as const),
} as const;
