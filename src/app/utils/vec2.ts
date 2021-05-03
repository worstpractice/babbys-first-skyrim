import { Vector2 } from "three";

export const vec2 = (x = 0, y = 0): Vector2 => {
  return new Vector2(x, y);
};
