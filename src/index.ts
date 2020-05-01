import * as PIXI from 'pixi.js';
import Game from './Game';
import TitleScreen from './scenes/TitleScreen';
import GameScene from './scenes/GameScene';

const game: Game = new Game(new PIXI.Point(256, 256), 3);
game.app.ticker.maxFPS = 166;
