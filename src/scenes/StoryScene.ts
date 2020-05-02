import * as PIXI from 'pixi.js';
import Scene from '../Scene';
import GameText from '../gameObjects/GameText';

import { StoryType } from '../types/StoryType';

export default class StoryScene extends Scene {
    private stories: Array<StoryType>;

    private sprite: PIXI.Sprite;
    private text: GameText;

    private storyNum = 0;
    
    public start(): void {
        this.stories = [
            {
                texture: this.game.spritesheet.textures['story_00'],
                text: 'A new highly infective disease has been spotted'
            },
            {
                texture: this.game.spritesheet.textures['story_01'],
                text: 'Some of the infected have their heads inflated.\n(That\'s not good)'
            },
            {
                texture: this.game.spritesheet.textures['story_02'],
                text: 'As the supreme leader, you have to use\nyour governmental tools to minimize the damage'
            }
        ];
        
        // Create sprite for the picture
        this.sprite = new PIXI.Sprite();
        this.sprite.position.x = this.game.app.renderer.width / 2;
        this.sprite.position.y = this.game.app.renderer.height / 4;

        // Create caption
        this.text = new GameText(this.game);
        this.text.textStart('', 5, 'white', 'left', 'center');
        this.text.canvasText.position = new PIXI.Point(
            this.game.app.renderer.width / 2,
            this.game.app.renderer.height / 4 * 3
        );

        this.game.container.addChild(this.sprite);

        this.changeStory();
    }

    public stop(): void {
        this.game.container.removeChild(this.sprite);
        this.text.stop();

        this.game.keyboard.off();
    }
    public update(deltaTime: number): void {}

    private changeStory(): void {
        const story = this.stories[this.storyNum];

        // Change texture and adjust the pivot according to it
        this.sprite.texture = story.texture;
        this.sprite.pivot.x = this.sprite.width / 2;
        this.sprite.pivot.y = this.sprite.height / 2;

        this.text.text = story.text;
        
        // Wait 1 second before the player press next
        this.game.keyboard.off();
        setTimeout(() => {
            this.game.keyboard.on(() => { this.nextScene() });
        }, 1000);
    }

    private nextScene(): void {
        if (this.storyNum < this.stories.length - 1) {
            this.storyNum++;
            this.changeStory();
        } else {
            this.game.changeScene(this.game.scenes['gameScene']);
        }
    }
}