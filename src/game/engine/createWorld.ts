import { ContactMaterial, GSSolver, Material, NaiveBroadphase, SplitSolver, Vec3, World } from 'cannon-es';

const GRAVITY_OF_EARTH = new Vec3(0, -9.81, 0); // m/s²

const YOLO_GRAVITY = new Vec3(0, -20, 0); // m/s²

export const createWorld = () => {
  const subSolver = new GSSolver();
  subSolver.iterations = 7;
  subSolver.tolerance = 0.1;

  const solver = new SplitSolver(subSolver);

  const world = new World({
    broadphase: new NaiveBroadphase(),
    gravity: YOLO_GRAVITY,
    solver,
  });

  // Contact stiffness - use to make softer/harder contacts
  world.defaultContactMaterial.contactEquationStiffness = 1e9;

  // Stabilization time in number of timesteps
  world.defaultContactMaterial.contactEquationRelaxation = 4;

  // Create a slippery material (friction coefficient = 0.0)
  const physicsMaterial = new Material('physics');
  const contactMaterial = new ContactMaterial(physicsMaterial, physicsMaterial, {
    friction: 0.0,
    restitution: 0.3,
  });

  // We must add the contact materials to the world
  world.addContactMaterial(contactMaterial);

  return {
    physicsMaterial,
    world,
  } as const;
};
