import type { Input } from 'src/game/typings/Input';
import type { RelevantMouseButton } from 'src/game/typings/RelevantMouseButton';
import { isRelevantMouseButton } from 'src/game/utils/type-predicates/isRelevantMouseButton';
import type { WebGLRenderer } from 'three';

export const createHandleMouseDown = ({ heldMouseButtons }: Input, { domElement }: WebGLRenderer) => {
  const handleMouseDown = ({ button, target }: MouseEvent): void => {
    if (target !== domElement) return;

    let humanReadableButton: RelevantMouseButton;

    switch (button) {
      case 0: {
        humanReadableButton = 'LMB';
        break;
      }

      case 1: {
        humanReadableButton = 'MMB';
        break;
      }

      case 2: {
        humanReadableButton = 'RMB';
        break;
      }

      default: {
        return;
      }
    }

    if (!isRelevantMouseButton(humanReadableButton)) return;

    heldMouseButtons.add(humanReadableButton);
  };

  return handleMouseDown;
};
