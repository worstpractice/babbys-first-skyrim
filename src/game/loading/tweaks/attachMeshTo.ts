import type { Mesh } from 'three';

export const attachMeshTo = (playerMesh: Mesh) => {
  const innerAttachMeshTo = (mesh: Mesh) => {
    const [root] = playerMesh.children;

    root?.traverse((child): void => {
      if (child.name !== 'RightHandIndex1') return;

      child.attach(mesh);
    });

    // Hide for now, unhide via inventory equip
    mesh.visible = false;

    return mesh;
  };

  return innerAttachMeshTo;
};
