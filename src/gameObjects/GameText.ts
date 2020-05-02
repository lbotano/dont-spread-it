import * as PIXI from 'pixi.js';
import GameObject from './GameObject';

export default abstract class GameText extends GameObject {
    protected canvasText: PIXI.Text;

    private _text: string;
    get text(): string {
        return this._text;
    }
    set text(value: string) {
        this._text = value;
        this.canvasText.text = value;
    }

    public async textStart(text: string, size: number, color: string): Promise<void> {
        this.canvasText = new PIXI.Text(
            text,
            {
                fontFamily: 'Pixeled',
                fontSize: size,
                fill: color
            }
        );
        this.game.container.addChild(this.canvasText);
    }

}