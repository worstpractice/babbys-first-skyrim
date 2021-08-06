import type { AnimationName } from "../app/typings/AnimationName";
import type { ItemName } from "../typings/ItemName";

export const itemToAnimation: { readonly [key in ItemName]: AnimationName } = {
  "": "idling",
  sword: "attacking",
} as const;
