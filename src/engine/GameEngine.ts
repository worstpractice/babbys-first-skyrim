import { GSSolver, NaiveBroadphase, SAPBroadphase, SplitSolver, World } from 'cannon-es';
import cannonDebugger from 'cannon-es-debugger';
import { ObSet } from 'obset';
import { GameObject } from 'src/engine/GameObject';
import { GAME_OBJECTS } from 'src/engine/globals/GAME_OBJECTS';
import { LOADING_MANAGER } from 'src/engine/globals/LOADING_MANAGER';
import { CAMERA_FAR } from 'src/game/constants/CAMERA_FAR';
import { CAMERA_FOV } from 'src/game/constants/CAMERA_FOV';
import { CAMERA_NEAR } from 'src/game/constants/CAMERA_NEAR';
import { COLOR_SKY } from 'src/game/constants/COLOR_SKY';
import { GRAVITY_OF_YOLO } from 'src/game/constants/GRAVITY_OF_YOLO';
import { GROUND_PLANE_SIDE } from 'src/game/constants/GROUND_PLANE_SIDE';
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
  AmbientLight,
  CubeTexture,
  CubeTextureLoader,
  DirectionalLight,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  WebGLRenderer,
} from 'three';

export abstract class GameEngine {
  readonly camera: PerspectiveCamera;

  readonly input: Input;

  readonly renderer: WebGLRenderer;

  readonly scene: Scene;

  readonly world: World;

  constructor() {
    console.count(`constructor: ${new.target.name}`);
    this.world = this.setupWorld();
    this.camera = this.setupCamera();
    this.input = this.setupInput();
    this.renderer = this.setupRenderer();
    this.scene = this.setupScene();

    this.addAmbientLight();
    this.addDirectionalLight();

    this.revUpGameEngine();

    registerEventListeners(this);
    cannonDebugger(this.scene, this.world.bodies);
  }

  private addAmbientLight(this: this): void {
    const light = new AmbientLight(COLOR_SKY, 1);

    light.name = 'ambientLight';

    /** See: https://discoverthreejs.com/tips-and-tricks/#accurate-colors */
    light.color.convertSRGBToLinear();

    this.scene.add(light);
  }

  private addDirectionalLight(this: this): void {
    const light = new DirectionalLight(COLOR_SKY, 1);

    light.name = 'directionalLight';

    /** See: https://discoverthreejs.com/tips-and-tricks/#accurate-colors */
    light.color.convertSRGBToLinear();

    light.position.set(20, 100, -10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.0001;

    light.shadow.mapSize.width = 16_384;
    light.shadow.mapSize.height = 16_384;

    light.shadow.camera.left = GROUND_PLANE_SIDE;
    light.shadow.camera.right = -GROUND_PLANE_SIDE;
    light.shadow.camera.top = GROUND_PLANE_SIDE;
    light.shadow.camera.bottom = -GROUND_PLANE_SIDE;

    this.scene.add(light);
  }

  private readonly handleAddGameObject = (gameObject: GameObject): void => {
    const { body, mesh } = gameObject;

    if (mesh) this.scene.add(mesh);
    if (body) this.world.addBody(body);

    GameObject.beginPlay(gameObject);
  };

  private revUpGameEngine(this: this): void {
    for (const preExistingGameObject of GAME_OBJECTS) {
      // retroactively handle pre-existing instances
      this.handleAddGameObject(preExistingGameObject);
    }

    // begin handling future additions
    GAME_OBJECTS.on('add', this.handleAddGameObject);
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

    const loader = new CubeTextureLoader(LOADING_MANAGER);

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
