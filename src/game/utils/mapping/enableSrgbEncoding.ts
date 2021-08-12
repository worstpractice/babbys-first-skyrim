import type { Object3D } from "three";
import { sRGBEncoding } from "three";

export const enableSrgbEncoding = (object: Object3D): void => {
  if (object?.material?.map) {
    object.material.map.encoding = sRGBEncoding;
  }
};
