import * as PIXI from 'pixi.js';
import Scene from '../Scene';
import Person from '../gameObjects/Person';
import { Health } from '../types/Health';
import ScoreText from '../gameObjects/ScoreText';
import GameAdviceText from '../gameObjects/GameAdviceText';

export default class GameScene extends Scene {
    private peopleContainer: PIXI.Container;
    private people: Array<Person>;

    private scoreText: ScoreText;
    private adviceText: GameAdviceText;

    private readonly COLLISION_CHECK_TIMEOUT = 60 * 1;
    private timer = this.COLLISION_CHECK_TIMEOUT;

    private readonly DAY_DURATION = 60 * 1;
    private dayTimer = this.DAY_DURATION;

    private playing = true;

    start(): void {
        this.peopleContainer = new PIXI.Container();
        this.people = new Array<Person>();

        for (let i = 0; i < 60; i++) {
            this.people[i] = new Person(this.game, this.peopleContainer);
            this.people[i].start();
        }

        // Add the sick person
        this.people[this.people.length] = new Person(this.game, this.peopleContainer);
        this.people[this.people.length - 1].start(100, 100);
        this.people[this.people.length - 1].health = Health.HEADED;
        
        // Make the children sortable
        this.peopleContainer.sortableChildren = true;
        
        this.game.container.addChild(this.peopleContainer);

        // Add score text
        this.scoreText = new ScoreText(this.game);
        this.scoreText.start();
        this.adviceText = new GameAdviceText(this.game);
        this.adviceText.start();
    }

    stop(): void {
        this.game.container.removeChild(this.peopleContainer);
    }

    update(deltaTime: number): void {
        if (this.playing) {
            this.people.forEach((value: Person) => {
                value.update(deltaTime);
            })

            this.timer -= deltaTime;
            this.dayTimer -= deltaTime;
            
            // Check for collisions between everyone and make them sick
            if (this.timer <= 0) {
                this.timer = this.COLLISION_CHECK_TIMEOUT;
                for (let i = 0; i < this.people.length; i++) {
                    if (this.people[i].health != Health.HEALTHY) {
                        for (let j = 0; j < this.people.length; j++) {
                            if (i != j && this.people[j].health == Health.HEALTHY &&
                                this.areColliding(this.people[i].bounds, this.people[j].bounds)) {
                                this.scoreText.lowerScore();
                                if (this.people[i].health == Health.HEALTHY)
                                    this.people[i].health = Health.SICK_HIDDEN;
                                else
                                    this.people[j].health = Health.SICK_HIDDEN;
                            }
                        }
                    }
                }
            }

            if (this.dayTimer <= 0) {
                this.dayTimer = this.DAY_DURATION;
                this.scoreText.daysLeft -= 1;

                if (this.scoreText.daysLeft < 0) {
                    this.showResults();
                }
            }
        }
    }

    private areColliding(a: PIXI.Rectangle, b: PIXI.Rectangle): boolean {
        return a.x + a.width > b.x && a.x < b.x + b.width && a.y + a.height > b.y && a.y < b.y + b.height;
    }

    private showResults(): void {
        this.playing = false;
        this.scoreText.showResult();
        this.adviceText.text = 'Time has ended';
        this.game.app.renderer.backgroundColor = 0xCC44CC;
    }
}