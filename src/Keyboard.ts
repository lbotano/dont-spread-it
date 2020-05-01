import * as PIXI from 'pixi.js';
import EventEmitter = PIXI.utils.EventEmitter;

export default class Keyboard {
    private eventEmitter: EventEmitter;
    
    constructor() {
        this.eventEmitter = new EventEmitter;
    }

    private onKeyDown = (e: KeyboardEvent): void => {
        e.preventDefault();
        this.eventEmitter.emit('*', {
            code: e.code,
            isDown: true
        });
    }

    private onKeyUp = (e: KeyboardEvent): void => {
        e.preventDefault();
        this.eventEmitter.emit('*', {
            code: e.code,
            isDown: false
        })
    }

    public start(): void {
        window.addEventListener('keydown', this.onKeyDown, false);
        window.addEventListener('keyup', this.onKeyUp, false);
    }

    public stop(): void {
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('keyup', this.onKeyDown);
    }
}