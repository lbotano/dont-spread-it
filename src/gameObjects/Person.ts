import * as PIXI from 'pixi.js';
import GameObject from './GameObject';
import Game from '../Game';
import { Health } from '../types/Health';
import { SingleEntryPlugin } from 'webpack';

export default class Person extends GameObject {
    private container: PIXI.Container;
    private sprite: PIXI.Sprite;

    private readonly SPEED = 1;
    private readonly MOVE_TIMEOUT = 60 * 1; // People will wait 4 seconds before moving
    private moveTimeout = this.MOVE_TIMEOUT;
    public moving = false;
    private freeze = false;
    private movingDestination: PIXI.Point;
    private step: PIXI.Point;

    private clicked = false;

    public _health: Health = Health.HEALTHY;

    // This should be a setter really
    set health(value: Health) {
        if (value == Health.SICK_HIDDEN && this._health != Health.HEADED) {
            // Decide if the person will be a silent carrier or will have its head expanded
            if (Math.random() < 0.8) {
                this._health = Health.HEADED;
                this.sprite.texture = this.game.spritesheet.textures['civ_serious'];
            } else {
                this._health = Health.SICK_HIDDEN;
            }
        } else if (value == Health.HEADED) {
            this._health = Health.HEADED;
            this.sprite.texture = this.game.spritesheet.textures['civ_serious'];
        }
    }
    get health(): Health {
        return this._health;
    }

    get bounds(): PIXI.Rectangle {
        return this.sprite.getBounds();
    }

    constructor(game: Game, container: PIXI.Container) {
        super(game);
        this.container = container;
    }

    public start(x?: number, y?: number): void {
        this.game.app.renderer.backgroundColor = 0x333333;

        this.sprite = new PIXI.Sprite(this.game.spritesheet.textures['civ']);
        if (x == undefined || y == undefined) {
        this.sprite.position = new PIXI.Point(
            Math.floor(Math.random() * (this.game.app.renderer.width - this.sprite.width)),
            Math.floor(Math.random() * (this.game.app.renderer.height - this.sprite.height)) 
            );
        } else {
            this.sprite.position = new PIXI.Point(x, y);
        }

        this.container.addChild(this.sprite);
        this.sprite.zIndex = this.sprite.y;

        this.sprite.interactive = true;
        this.sprite.on('pointerdown', (): void => {
            this.moving = false;
            this.freeze = true;
            console.log("CLICKED");
        });
    }

    public stop(): void {
        this.container.removeChild(this.sprite);
    }

    public update(deltaTime: number): void {
        this.moveTimeout -= deltaTime;
        if (this.moveTimeout <= 0) {
            this.moveTimeout = this.MOVE_TIMEOUT;
            this.moving = true;

            // Try to make a random destination that's not out of bounds
            let redo = true;
            while (redo) {
                this.movingDestination = new PIXI.Point(
                    this.sprite.position.x + Math.floor(Math.random() * 40 - 20),
                    this.sprite.position.y + Math.floor(Math.random() * 40 - 20)
                );

                redo = !(
                    this.movingDestination.x > 0
                    && this.movingDestination.x < this.game.app.renderer.width - this.sprite.height &&
                    this.movingDestination.y > 0
                    && this.movingDestination.y < this.game.app.renderer.height - this.sprite.height
                );
            }

            // Calculate the step
            const angleY =
                Math.atan( Math.abs(
                    (this.movingDestination.y - this.sprite.position.y) /
                    (this.movingDestination.x - this.sprite.position.x)
                ));
            const angleX = Math.PI - angleY; // 2 PI (180°) - PI (90°) = PI
            this.step = new PIXI.Point (
                this.SPEED * Math.sin(angleX),
                this.SPEED * Math.sin(angleY)
            )

            if (this.movingDestination.x < this.sprite.position.x) this.step.x = -Math.abs(this.step.x);
            if (this.movingDestination.y < this.sprite.position.y) this.step.y = -Math.abs(this.step.y);
        }

        // Move gradually
        if (this.moving && !this.freeze) {

            this.sprite.zIndex = this.sprite.position.y;

            this.sprite.position.x += this.step.x;
            this.sprite.position.y += this.step.y;

            this.sprite.position.x = Math.round(this.sprite.position.x);
            this.sprite.position.y = Math.round(this.sprite.position.y);

            if (this.sprite.position.x - 2 < this.movingDestination.x &&
                this.sprite.position.x + 2 > this.movingDestination.x ||
                this.sprite.position.y + 2 < this.movingDestination.y &&
                this.sprite.position.y + 2 > this.movingDestination.y)
                this.moving = false;
        }
    }

    public showSick(): void {
        if (this.health == Health.SICK_HIDDEN)
            this.sprite.texture = this.game.spritesheet.textures['civ_sick'];
    }
}