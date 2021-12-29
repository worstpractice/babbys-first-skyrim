import { RELEVANT_MOUSE_BUTTONS } from 'src/game/constants/input/RELEVANT_MOUSE_BUTTONS';
import type { RelevantMouseButton } from 'src/game/typings/RelevantMouseButton';

export const isRelevantMouseButton = (t: any): t is RelevantMouseButton => RELEVANT_MOUSE_BUTTONS.has(t);
