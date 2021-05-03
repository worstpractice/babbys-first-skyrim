import { renderer } from "../engine/renderer";
import { input } from "../input/input";
import type { RelevantMouseButton } from "../typings/input/RelevantMouseButton";
import { isRelevantMouseButton } from "../utils/type-predicates/isRelevantMouseButton";

export const handleMouseUp = ({ button, target }: MouseEvent): void => {
  if (target !== renderer.domElement) return;

  let humanReadableButton: RelevantMouseButton;

  switch (button) {
    case 0: {
      humanReadableButton = "LMB";
      break;
    }
    case 1: {
      humanReadableButton = "MMB";
      break;
    }
    case 2: {
      humanReadableButton = "RMB";
      break;
    }
    default: {
      throw new TypeError("WTF Button");
    }
  }

  if (!isRelevantMouseButton(humanReadableButton)) return;

  input.heldMouseButtons.delete(humanReadableButton);
};
