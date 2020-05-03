import * as PIXI from 'pixi.js';
import GameText from './GameText';

export default class GameAdviceText extends GameText {
    public start(): void {
        this.textStart('Click the most people you can so you can immobilize them.', 5, 'white', 'left', 'left');
        this.canvasText.position = new PIXI.Point(
            10,
            this.game.app.renderer.height - 20
        );
    }
}