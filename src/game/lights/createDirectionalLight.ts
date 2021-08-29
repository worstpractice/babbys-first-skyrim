import { COLOR_SKY } from 'src/game/constants/COLOR_SKY';
import { GROUND_PLANE_SIDE } from 'src/game/constants/GROUND_PLANE_SIDE';
import { DirectionalLight } from 'three';

export const createDirectionalLight = (): DirectionalLight => {
  const light = new DirectionalLight(COLOR_SKY, 1);

  light.name = 'directionalLight';

  /** See: https://discoverthreejs.com/tips-and-tricks/#accurate-colors */
  light.color.convertSRGBToLinear();

  light.position.set(20, 100, -10);
  light.target.position.set(0, 0, 0);
  light.castShadow = true;
  light.shadow.bias = -0.0001;

  light.shadow.mapSize.width = 16_384;
  light.shadow.mapSize.height = 16_384;

  light.shadow.camera.left = GROUND_PLANE_SIDE;
  light.shadow.camera.right = -GROUND_PLANE_SIDE;
  light.shadow.camera.top = GROUND_PLANE_SIDE;
  light.shadow.camera.bottom = -GROUND_PLANE_SIDE;

  return light;
};
