import type { ItemName } from 'src/views/typings/ItemName';
import type { Mesh } from 'three';

export const itemNameToMesh: { [key in ItemName]?: Mesh } = {};
