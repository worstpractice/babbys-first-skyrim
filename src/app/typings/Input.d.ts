import type { ObSet } from "../abstract-data-types/ObSet";
import type { ActionKey } from "./input/ActionKey";
import type { ModifierKey } from "./input/ModifierKey";
import type { MovementKey } from "./input/MovementKey";
import type { RelevantKey } from "./input/RelevantKey";
import type { RelevantMouseButton } from "./input/RelevantMouseButton";
import type { TurnKey } from "./input/TurnKey";

export type Input = {
  readonly heldKeys: ObSet<RelevantKey>;
  readonly heldMouseButtons: ObSet<RelevantMouseButton>;
  readonly heldActionKeys: ObSet<ActionKey>;
  readonly heldMovementKeys: ObSet<MovementKey>;
  readonly heldModifierKeys: ObSet<ModifierKey>;
  readonly heldTurnKeys: ObSet<TurnKey>;
};
