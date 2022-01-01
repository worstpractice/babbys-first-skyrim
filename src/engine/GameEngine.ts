import { GSSolver, NaiveBroadphase, SAPBroadphase, SplitSolver, World } from 'cannon-es';
import cannonDebugger from 'cannon-es-debugger';
import { ObSet } from 'obset';
import { GameObject } from 'src/engine/GameObject';
import { CAMERA_FAR } from 'src/game/constants/CAMERA_FAR';
import { CAMERA_FOV } from 'src/game/constants/CAMERA_FOV';
import { CAMERA_NEAR } from 'src/game/constants/CAMERA_NEAR';
import { GRAVITY_OF_YOLO } from 'src/game/constants/GRAVITY_OF_YOLO';
import { registerEventListeners } from 'src/game/listeners/registerEventListeners';
import type { Input } from 'src/game/typings/Input';
import type { ActionKey } from 'src/game/typings/keys/ActionKey';
import type { ModifierKey } from 'src/game/typings/keys/ModifierKey';
import type { MovementKey } from 'src/game/typings/keys/MovementKey';
import type { RelevantKey } from 'src/game/typings/keys/RelevantKey';
import type { TurnKey } from 'src/game/typings/keys/TurnKey';
import type { RelevantMouseButton } from 'src/game/typings/RelevantMouseButton';
import { CANVAS } from 'src/views/constants/CANVAS';
import {
  AnimationMixer,
  CubeTexture,
  CubeTextureLoader,
  Light,
  LoadingManager,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  WebGLRenderer,
} from 'three';

export type Constructors = {
  readonly gameObjects: readonly (() => GameObject)[];
  readonly lights: readonly (() => Light)[];
};

export abstract class GameEngine {
  readonly camera: PerspectiveCamera;

  readonly input: Input;

  readonly loadingManager: LoadingManager;

  readonly mixers: Set<AnimationMixer> = new Set<AnimationMixer>();

  readonly renderer: WebGLRenderer;

  readonly scene: Scene;

  readonly world: World;

  // prettier-ignore
  constructor(loadingManager: LoadingManager) {
    this.loadingManager = loadingManager;
    this.world = this.setupWorld();
    this.camera = this.setupCamera();
    this.input = this.setupInput();
    this.renderer = this.setupRenderer();
    this.scene = this.setupScene();
    this.handleExistingGameObjects();
    GameObject.instances.on('add', this.handleAddGameObject);
    registerEventListeners(this);
    cannonDebugger(this.scene, this.world.bodies);
  }

  private readonly handleAddGameObject = (gameObject: GameObject): void => {
    const { body, mesh } = gameObject;

    this.scene.add(mesh);
    this.world.addBody(body);

    // @ts-expect-error I know dat, don have to tell me dat
    gameObject.onBeginPlay();
  };

  private handleExistingGameObjects(this: this): void {
    for (const gameObject of GameObject.instances) {
      this.handleAddGameObject(gameObject);
    }
  }

  private setupCamera(this: this): PerspectiveCamera {
    const ASPECT = window.innerWidth / window.innerHeight;

    const camera = new PerspectiveCamera(CAMERA_FOV, ASPECT, CAMERA_NEAR, CAMERA_FAR);

    camera.position.set(0, 33, 90);

    return camera;
  }

  private setupInput(this: this): Input {
    return {
      heldActionKeys: new ObSet<ActionKey>(),
      heldKeys: new ObSet<RelevantKey>(),
      heldModifierKeys: new ObSet<ModifierKey>(),
      heldMouseButtons: new ObSet<RelevantMouseButton>(),
      heldMovementKeys: new ObSet<MovementKey>(),
      heldTurnKeys: new ObSet<TurnKey>(),
    } as const;
  }

  private setupRenderer(this: this): WebGLRenderer {
    const renderer = new WebGLRenderer({
      antialias: true,
      canvas: CANVAS,
      powerPreference: 'high-performance',
      precision: 'highp',
    });

    /** See: https://discoverthreejs.com/tips-and-tricks/#accurate-colors */
    renderer.outputEncoding = sRGBEncoding;

    /**
     * NOTE: Not actually deprecated. Lol.
     *
     * See: https://discourse.threejs.org/t/why-is-gammafactor-deprecated-in-webglrenderer-dev-branch/8140/2
     */
    renderer.gammaFactor = 2.2;

    /** See: https://discoverthreejs.com/book/first-steps/physically-based-rendering/#enable-physically-correct-lighting */
    renderer.physicallyCorrectLights = true;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    return renderer;
  }

  private setupScene(this: this): Scene {
    const scene = new Scene();

    const skyboxTexturePaths = [
      './assets/textures/skybox/posx.jpg',
      './assets/textures/skybox/negx.jpg',
      './assets/textures/skybox/posy.jpg',
      './assets/textures/skybox/negy.jpg',
      './assets/textures/skybox/posz.jpg',
      './assets/textures/skybox/negz.jpg',
    ];

    const loader = new CubeTextureLoader(this.loadingManager);

    const skybox: CubeTexture = loader.load(skyboxTexturePaths);

    skybox.encoding = sRGBEncoding;

    scene.background = skybox;

    return scene;
  }

  private setupWorld(this: this): World {
    const subSolver = new GSSolver();
    subSolver.iterations = 7;
    subSolver.tolerance = 0.1;

    const solver = new SplitSolver(subSolver);

    const world = new World({
      broadphase: new NaiveBroadphase(),
      gravity: GRAVITY_OF_YOLO,
      solver,
    });

    // Contact stiffness - use to make softer/harder contacts
    world.defaultContactMaterial.contactEquationStiffness = 1e9;

    // Stabilization time in number of timesteps
    world.defaultContactMaterial.contactEquationRelaxation = 4;

    // Disable friction by default
    // world.defaultContactMaterial.friction = 0;

    // Sweep and prune broadphase
    world.broadphase = new SAPBroadphase(world);

    return world;
  }
}
function loadNameClipDuos(arg0: { loadingManager: any }) {
  throw new Error('Function not implemented.');
}
