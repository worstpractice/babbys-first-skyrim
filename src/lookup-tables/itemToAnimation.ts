import type { AnimationName } from "../app/typings/AnimationName";
import type { ItemName } from "../typings/ItemName";

export const itemToAnimation = new Map<ItemName, AnimationName>();

itemToAnimation.set("sword", "attacking");
