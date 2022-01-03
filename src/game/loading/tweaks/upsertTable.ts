import type { ItemName } from 'src/views/typings/ItemName';

export const upsert = <T>(table: { [key in ItemName]?: T }, key: ItemName) => {
  const innerUpsert = (mesh: T): T => {
    table[key] = mesh;

    return mesh;
  };

  return innerUpsert;
};
