import type { Vector3 } from "three";

export type Physics = {
  readonly acceleration: Vector3;
  readonly decceleration: Vector3;
  readonly velocity: Vector3;
};
