import type { AnimationName } from "src/game/typings/AnimationName";
import type { ItemName } from "src/typings/ItemName";

export const itemToAnimation: { readonly [key in ItemName]: AnimationName } = {
  "": "idling",
  sword: "attacking",
} as const;
