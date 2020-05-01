import * as PIXI from 'pixi.js';
import GameObject from "./GameObject";
import { ease } from 'pixi-ease';

export default class Logo extends GameObject {
    private container: PIXI.Container;
    private sprite: PIXI.Sprite;
    
    private readonly MAX_ROTATION = .15 * Math.PI;

    public start(): void {
        this.sprite = new PIXI.Sprite(this.game.spritesheet.textures['logo']);
        this.container = new PIXI.Container();

        this.sprite.pivot = new PIXI.Point(this.sprite.width / 2, this.sprite.height / 2);
        this.sprite.position = new PIXI.Point(this.game.resolution.x / 2, this.game.resolution.y / 4);
        this.sprite.rotation = -this.MAX_ROTATION;

        this.container.addChild(this.sprite);
        this.game.app.stage.addChild(this.container);

        // Add animations
        ease.add(this.sprite,
            { rotation: this.MAX_ROTATION },
            {
                repeat: true,
                reverse: true,
                duration: 1500
            });
        ease.add(this.sprite,
            {
                x: this.sprite.x,
                y: this.game.resolution.y / 3
            },
            { 
                repeat: true,
                reverse: true,
                duration: 1500
            });
        ease.add(this.sprite,
            {
                scale: 1.5
            },
            {
                repeat: true,
                reverse: true,
                duration: 2500
            });
    }

    public update(deltaTime: number): void {}
}