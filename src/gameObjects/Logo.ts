import * as PIXI from 'pixi.js';
import GameObject from "./GameObject";
import { ease } from 'pixi-ease';

export default class Logo extends GameObject {
    private sprite: PIXI.Sprite;
    
    private readonly MAX_ROTATION = .05 * Math.PI;

    public start(): void {
        this.sprite = new PIXI.Sprite(this.game.spritesheet.textures['logo']);

        this.sprite.pivot = new PIXI.Point(this.sprite.width / 2, this.sprite.height / 2);
        this.sprite.position = new PIXI.Point(this.game.resolution.x / 2, this.game.resolution.y / 4);
        this.sprite.rotation = -this.MAX_ROTATION;

        this.game.container.addChild(this.sprite);

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
                scale: 1.1
            },
            {
                repeat: true,
                reverse: true,
                duration: 2500
            });
    }

    public stop(): void {
        this.game.container.removeChild(this.sprite);
    }

    public update(deltaTime: number): void {}
}