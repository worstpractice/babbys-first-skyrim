import type { Group } from 'three';
import type { ItemName } from 'src/typings/ItemName';

export const itemNameToModel: { [key in ItemName]?: Group } = {};
