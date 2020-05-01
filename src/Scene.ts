import Game from "./Game";

export default abstract class Scene {
    protected game: Game;
    constructor(game: Game) {
        this.game = game;
    }

    public abstract start(): void;
    public abstract stop(): void;
    public abstract update(deltaTime: number): void;
}