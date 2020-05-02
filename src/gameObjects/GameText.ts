import * as PIXI from 'pixi.js';
import GameObject from './GameObject';

export default class GameText extends GameObject {
    public canvasText: PIXI.Text;
    
    private _text: string;
    get text(): string {
        return this._text;
    }
    set text(value: string) {
        this._text = value;
        this.canvasText.text = value;
        this.adjustPivot();
    }

    private pivot: string; // Either 'left', 'center' or 'right'

    public start(): void {
        this.textStart('Text', 11, 'white', 'left', 'left');
    }

    public update(deltaTime: number): void {}

    public stop (): void {
        this.game.container.removeChild(this.canvasText);
    }

    public textStart(text: string, size: number, color: string, align: string, pivot: string): void {
        this.canvasText = new PIXI.Text(
            text,
            {
                fontFamily: 'Pixeled',
                fontSize: size,
                fill: color,
                align: align
            }
        );
        this.canvasText.roundPixels = true;

        // Adjust the pivot
        this.pivot = pivot;
        this.adjustPivot();

        this.game.container.addChild(this.canvasText);
    }

    private adjustPivot(): void {
        switch (this.pivot) {
            case 'left':
                this.canvasText.pivot = new PIXI.Point(
                    0,
                    this.canvasText.height
                );
                break;
            case 'center':
                this.canvasText.pivot = new PIXI.Point(
                    this.canvasText.width / 2,
                    this.canvasText.height
                );
                break;
            case 'right':
                this.canvasText.pivot = new PIXI.Point(
                    this.canvasText.width,
                    this.canvasText.height
                );
                break;
        }
    }
}