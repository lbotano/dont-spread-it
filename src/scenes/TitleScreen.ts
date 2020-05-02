import * as PIXI from 'pixi.js';
import Scene from '../Scene';
import Logo from '../gameObjects/Logo';
import GameStartText from '../gameObjects/GameStartText';

export default class TitleScreen extends Scene {
    private logo: Logo;
    private text: GameStartText;

    start(): void {
        // Add game logo
        this.logo = new Logo(this.game);
        this.logo.start();
        
        // Add "press key to start" text
        this.text = new GameStartText(this.game);
        this.text.start();

        // Listen to key to change scene
        this.game.keyboard.on((data: { code: string, key: string, isDown: boolean}): void => {
            this.game.changeScene(this.game.scenes['storyScene']);
        })
    }

    stop(): void {
        this.logo.stop();
        this.text.stop();

        this.game.keyboard.off();
    }

    update(deltaTime: number): void {
        this.logo.update(deltaTime);
        this.text.update(deltaTime);
    }
}