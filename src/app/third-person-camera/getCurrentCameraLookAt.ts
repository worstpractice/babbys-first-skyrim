import type { Vector3 } from "three";
import { camera } from "../engine/camera";
import { vec3 } from "../utils/vec3";

export const getCurrentCameraLookAt = (): Vector3 => {
  return camera.getWorldDirection(vec3()).add(camera.position);
};
