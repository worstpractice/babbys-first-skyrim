import { startIdling } from "../cascade/animations/idling";
import type { NameClipDuo } from "src/typings/NameClipDuo";
import { loadPlayerAssets } from "./loadPlayerAssets";
import { populateAnimationsTable } from "../animations/populateAnimationsTable";

export const loadPlayerCharacter = async (): Promise<void> => {
  const nameClipDuos: readonly NameClipDuo[] = await loadPlayerAssets();

  for (const [name, clip] of nameClipDuos) {
    populateAnimationsTable(name, clip);
  }

  startIdling();
};
