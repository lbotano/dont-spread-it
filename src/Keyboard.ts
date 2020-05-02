//
// This class manages keyboard keys and mouse buttons
//

import * as PIXI from 'pixi.js';
import EventEmitter = PIXI.utils.EventEmitter;

export default class Keyboard {
    private eventEmitter: EventEmitter;
    
    constructor() {
        this.eventEmitter = new EventEmitter;
    }

    private onKeyDown = (e: KeyboardEvent): void => {
        //e.preventDefault();
        this.eventEmitter.emit('*', {
            code: e.code,
            isDown: true
        });
    }

    private onKeyUp = (e: KeyboardEvent): void => {
        //e.preventDefault();
        this.eventEmitter.emit('*', {
            code: e.code,
            isDown: false
        })
    }

    private onMouseDown = (e: MouseEvent): void => {
        this.eventEmitter.emit('*', {
            code: `Mouse${e.button}`,
            isDown: true
        })
    }

    private onMouseUp = (e: MouseEvent): void => {
        this.eventEmitter.emit('*', {
            code: `Mouse${e.button}`,
            isDown: false
        })
    }

    public on(fn: (data: {code: string; key: string; isDown: boolean}) => void): void {
        this.eventEmitter.on('*', fn);
    }

    public off(): void {
        this.eventEmitter.off('*');
    }

    public start(): void {
        window.addEventListener('keydown', this.onKeyDown, false);
        window.addEventListener('keyup', this.onKeyUp, false);
        window.addEventListener('mousedown', this.onMouseDown, false);
        window.addEventListener('mouseup', this.onMouseUp, false);
    }

    public stop(): void {
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('keyup', this.onKeyDown);
        window.removeEventListener('mousedown', this.onMouseDown);
        window.removeEventListener('mouseup', this.onMouseUp);
    }
}