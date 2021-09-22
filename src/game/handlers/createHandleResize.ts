import type { PerspectiveCamera, WebGLRenderer } from 'three';

export const createHandleResize = (camera: PerspectiveCamera, renderer: WebGLRenderer) => {
  const handleResize = (): void => {
    /** See: https://codepen.io/machal/pen/rrXNWO */
    const height = window.innerHeight;
    const width = window.innerWidth;

    /** Set the camera's aspect ratio. */
    camera.aspect = width / height;

    /** Update the camera's frustum. */
    camera.updateProjectionMatrix();

    /** Update the size of the renderer AND the canvas. */
    renderer.setSize(width, height);

    /** Set the pixel ratio (for mobile devices). */
    renderer.setPixelRatio(window.devicePixelRatio);
  };

  return handleResize;
};
