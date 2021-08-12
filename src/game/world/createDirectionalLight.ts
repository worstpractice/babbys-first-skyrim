import { DirectionalLight } from "three";
import { COLOR_SKY } from "src/constants/COLOR_SKY";
import { GROUND_PLANE_HEIGHT, GROUND_PLANE_WIDTH } from "src/constants/GROUND_PLANE";

export const createDirectionalLight = (): DirectionalLight => {
  const light = new DirectionalLight(COLOR_SKY, 1);

  light.name = "directionalLight";

  /** See: https://discoverthreejs.com/tips-and-tricks/#accurate-colors */
  light.color.convertSRGBToLinear();

  light.position.set(20, 100, -10);
  light.target.position.set(0, 0, 0);
  light.castShadow = true;
  light.shadow.bias = -0.0001;

  light.shadow.mapSize.width = 16_384;
  light.shadow.mapSize.height = 16_384;

  light.shadow.camera.left = GROUND_PLANE_HEIGHT;
  light.shadow.camera.right = -GROUND_PLANE_HEIGHT;
  light.shadow.camera.top = GROUND_PLANE_WIDTH;
  light.shadow.camera.bottom = -GROUND_PLANE_WIDTH;

  return light;
};
