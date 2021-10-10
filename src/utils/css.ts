import type { CSSProperties } from 'react';
import { as } from 'src/utils/as';

export const css = as as <T extends CSSProperties = never>(value: T) => T;
