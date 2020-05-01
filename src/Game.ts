import * as PIXI from 'pixi.js';
import Scene from './Scene';
import TitleScreen from './scenes/TitleScreen';

export default class Game {
    public resolution: PIXI.IPoint;
    public scale: number;

    public app: PIXI.Application;
    private container: PIXI.Container;
    private ticker: PIXI.Ticker;
    public spritesheet: PIXI.Spritesheet;

    private scene: Scene;
    
    private updateScene = (deltaTime: number): void => {
        this.scene.update(deltaTime);
    }
    
    constructor(resolution: PIXI.IPoint, scale = 1) {
        this.resolution = resolution;
        this.scale = scale;

        this.app = new PIXI.Application({
            width: this.resolution.x * this.scale,
            height: this.resolution.y * this.scale,
            backgroundColor: 0x000000,
            antialias: true,
            resolution: 1
        });
        this.container = new PIXI.Container();
        this.app.stage.scale = new PIXI.Point(this.scale, this.scale);
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        
        this.app.stage.addChild(this.container);
        document.body.appendChild(this.app.view);

        // Create spritesheet
        PIXI.Loader.shared
            .add('assets/sprites.json')
            .load((): void => {
                // Create ticker and prevent it from starting
                this.ticker = PIXI.Ticker.shared;
                this.ticker.autoStart = false;

                this.ticker.start();

                this.spritesheet = PIXI.Loader.shared.resources['assets/sprites.json'].spritesheet;

                this.start();
            });
    }

    private start(): void {
        this.changeScene(new TitleScreen(this));
        //this.changeScene(new GameScene(this));
    }

    public changeScene(scene: Scene): void {
        this.ticker.remove(this.updateScene);
        this.ticker.add(this.updateScene);
        if (typeof this.scene !== 'undefined') this.scene.stop();
        this.scene = scene;
        this.scene.start();
    }
}