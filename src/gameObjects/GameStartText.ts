import * as PIXI from 'pixi.js';
import GameText from './GameText';

export default class GameStartText extends GameText {
    private readonly BLINK_DURATION = 60;
    private timer = 0;

    public start(): void {
        this.textStart('Click or press any key\nto start', 10, 'white');
        this.canvasText.pivot.x = this.canvasText.width / 2;
        this.canvasText.pivot.y = this.canvasText.height / 2;

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