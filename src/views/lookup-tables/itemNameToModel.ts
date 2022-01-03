import type { ItemName } from 'src/views/typings/ItemName';
import type { Mesh } from 'three';

export const itemNameToModel: { [key in ItemName]?: Mesh } = {};
