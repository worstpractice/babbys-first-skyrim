import type { ObSet } from "obset";
import type { ActionKey } from "src/game/typings/keys/ActionKey";
import type { ModifierKey } from "src/game/typings/keys/ModifierKey";
import type { MovementKey } from "src/game/typings/keys/MovementKey";
import type { RelevantKey } from "src/game/typings/keys/RelevantKey";
import type { TurnKey } from "src/game/typings/keys/TurnKey";
import type { RelevantMouseButton } from "src/game/typings/RelevantMouseButton";

export type Input = {
  readonly heldKeys: ObSet<RelevantKey>;
  readonly heldMouseButtons: ObSet<RelevantMouseButton>;
  readonly heldActionKeys: ObSet<ActionKey>;
  readonly heldMovementKeys: ObSet<MovementKey>;
  readonly heldModifierKeys: ObSet<ModifierKey>;
  readonly heldTurnKeys: ObSet<TurnKey>;
};
