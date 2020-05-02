import * as PIXI from 'pixi.js';
import Scene from '../Scene';
import Logo from '../gameObjects/Logo';
import GameStartText from '../gameObjects/GameStartText';

export default class TitleScreen extends Scene {
    private logo: Logo;
    private text: GameStartText;

    start(): void {
        this.logo = new Logo(this.game);
        this.logo.start();
        
        this.text = new GameStartText(this.game);
        this.text.start();
    }

    stop(): void {

    }

    update(deltaTime: number): void {
        this.logo.update(deltaTime);
        this.text.update(deltaTime);
    }
}