import type { Group } from 'three';
import type { ItemName } from 'src/typings/ItemName';

export const itemToModel: { [key in ItemName]?: Group } = {};
