import type { TextureEncoding } from 'three';

export type Encoded = {
  readonly material: {
    readonly map: {
      encoding: TextureEncoding;
    };
  };
};
