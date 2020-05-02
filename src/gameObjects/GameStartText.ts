import * as PIXI from 'pixi.js';
import GameText from './GameText';

export default class GameStartText extends GameText {
    private readonly BLINK_DURATION = 60;
    private timer = 0;

    public start(): void {
        this.textStart('Click or press any key\n to start', 5, 'white', 'left', 'center');

        this.canvasText.x = this.game.app.renderer.width / 2;
        this.canvasText.y = this.game.app.renderer.height / 4 * 3;
    }

    public update(deltaTime: number): void {
        this.timer += deltaTime;
        if (this.timer > this.BLINK_DURATION) {
            this.canvasText.visible = !this.canvasText.visible;
            this.timer = 0;
        }
    }
}