import { isEncoded } from 'src/game/utils/type-predicates/isEncoded';
import type { Object3D } from 'three';
import { sRGBEncoding } from 'three';

export const enableSrgbEncoding = (obj: Object3D): void => {
  if (!isEncoded(obj)) return;

  obj.material.map.encoding = sRGBEncoding;
};
