import { COLOR_SKY } from 'src/game/constants/COLOR_SKY';
import { AmbientLight } from 'three';

export const createAmbientLight = (): AmbientLight => {
  const light = new AmbientLight(COLOR_SKY, 1);

  light.name = 'ambientLight';

  /** See: https://discoverthreejs.com/tips-and-tricks/#accurate-colors */
  light.color.convertSRGBToLinear();

  return light;
};
