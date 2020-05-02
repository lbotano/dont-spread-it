import * as PIXI from 'pixi.js';
import Keyboard from './Keyboard';
import Scene from './Scene';

import TitleScreen from './scenes/TitleScreen';
import GameScene from './scenes/GameScene';
import StoryScene from './scenes/StoryScene';

export default class Game {
    public resolution: PIXI.IPoint;
    public scale: number;

    public app: PIXI.Application;
    public container: PIXI.Container;
    private ticker: PIXI.Ticker;
    public spritesheet: PIXI.Spritesheet;

    private scene: Scene;
    public scenes: { [name: string]: Scene } = {};

    public keyboard: Keyboard;
    
    private updateScene = (deltaTime: number): void => {
        this.scene.update(deltaTime);
    }
    
    constructor(resolution: PIXI.IPoint, scale = 1) {
        this.resolution = resolution;
        this.scale = scale;

        // Declare application
        this.app = new PIXI.Application({
            width: this.resolution.x,// * this.scale,
            height: this.resolution.y,// * this.scale,
            backgroundColor: 0x000000,
            antialias: true,
            resolution: 1
        });
        this.container = new PIXI.Container();

        
        // Add container to the DOM
        this.app.stage.addChild(this.container);
        document.body.appendChild(this.app.view);
        
        
        // Create keyboard
        this.keyboard = new Keyboard();
        this.keyboard.start();
        
        // Create scenes
        this.scenes['titleScreen'] = new TitleScreen(this);
        this.scenes['storyScene'] = new StoryScene(this);
        this.scenes['gameScene'] = new GameScene(this);
        
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
        this.changeScene(this.scenes['titleScreen']);
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