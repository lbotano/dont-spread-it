import * as PIXI from 'pixi.js';
import GameObject from './GameObject';

export default class GameStartText extends GameObject {
    private text: PIXI.Text;

    public start(): void {
        this.text = new PIXI.Text('Click or press any key to start the game',
            {
                fontFamily: 'Arial',
                fontSize: 11,
                fill: 0xffffff,
                align: 'center'
            });
        
        this.game.container.addChild(this.text);
    }
    public update(deltaTime: number): void {
        throw new Error("Method not implemented.");
    }
}