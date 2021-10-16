import type { ItemName } from 'src/typings/ItemName';
import type { Group } from 'three';

export const itemNameToModel: { [key in ItemName]?: Group } = {};
