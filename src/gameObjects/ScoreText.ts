import * as PIXI from 'pixi.js';
import GameText from './GameText';

export default class ScoreText extends GameText {
    public score = 20000;

    private _daysLeft = 10;
    get daysLeft(): number {
        return this._daysLeft;
    }
    set daysLeft(value: number) {
        this._daysLeft = value;
        this.canvasText.text = `Score: ? Days left: ${this.daysLeft}`;
    }

    public start(): void {
        this.textStart(`Score: ? Days left: ${this.daysLeft}`, 10, 'white', 'left', 'left');

        this.canvasText.position = new PIXI.Point(10, 20);
    }

    public showResult(): void {
        this.canvasText.text = `Score: ${this.score}`;
    }

    public lowerScore(): void {
        this.score -= 100;
    }
}