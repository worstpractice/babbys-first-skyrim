import { default as React } from 'react';

type Props = {
  readonly [key in PropertyKey]: never;
};

export const Statue = ({}: Props) => {
  return (
    <div
      style={{
        height: 440,
        pointerEvents: 'all',
        width: 250,
      }}
    />
  );
};
