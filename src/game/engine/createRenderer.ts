import { CANVAS } from 'src/constants/CANVAS';
import { PCFSoftShadowMap, sRGBEncoding, WebGLRenderer } from 'three';

export const createRenderer = () => {
  const renderer = new WebGLRenderer({
    antialias: true,
    canvas: CANVAS,
    powerPreference: 'high-performance',
    precision: 'highp',
  });

  /** See: https://discoverthreejs.com/tips-and-tricks/#accurate-colors */
  renderer.outputEncoding = sRGBEncoding;

  /** NOTE: Not actually deprecated. Lol.
   *
   * See: https://discourse.threejs.org/t/why-is-gammafactor-deprecated-in-webglrenderer-dev-branch/8140/2 */
  renderer.gammaFactor = 2.2;

  /** See: https://discoverthreejs.com/book/first-steps/physically-based-rendering/#enable-physically-correct-lighting */
  renderer.physicallyCorrectLights = true;

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  return renderer;
};
