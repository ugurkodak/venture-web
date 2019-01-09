import { Container, Sprite, Graphics } from "pixi.js";
import { app } from "..";

export default class Actor {
    private _container: Container; // Contains all sprites of a game object
    private _usesDefaultSprite: boolean;
    protected _rendererWidth: number;
    protected _rendererHeight: number;

    constructor(
        sprite?: Sprite, scaleToRenderer: boolean = false) {
        this._container = new Container();
        this._rendererWidth = app.renderer.width;
        this._rendererHeight = app.renderer.height;
        // Default sprite assigned as first child if no sprite provided.
        if (sprite) {
            this.addChild(sprite);
            this._usesDefaultSprite = false;
        }
        else {
            this.addChild(new Sprite((new Graphics().beginFill(0xff00ff)
                .drawRect(0, 0, 100, 100)
                .endFill().generateCanvasTexture())));
            this._usesDefaultSprite = true;
        }

        if (scaleToRenderer) {
            window.addEventListener('resize', () => {
                this.scaleToRenderer();
            });
        }
    }

    //TODO: Maybe this has a better place
    private scaleToRenderer() {
        let diffX = app.renderer.width / this._rendererWidth,
            diffY = app.renderer.height / this._rendererHeight;
        this._rendererWidth = app.renderer.width;
        this._rendererHeight = app.renderer.height;
        this.width *= diffX;
        this.height *= diffY;
        this.x *= diffX;
        this.y *= diffY;
    }

    private addChild(sprite: Sprite) {
        if (this._usesDefaultSprite) {
            this._container.removeChild(this._container.children[0]);
        }
        this._container.addChild(sprite);
    }

    get x(): number {
        return Math.min(...this._container.children.map(o => o.x, 0));
    }
    set x(value: number) {
        const diff = value - this.x;
        this._container.children.forEach(element => {
            (element as Sprite).x += diff;
        });
    }

    get y(): number {
        return Math.min(...this._container.children.map(o => o.y, 0));
    }
    set y(value: number) {
        const diff = value - this.y;
        this._container.children.forEach(element => {
            (element as Sprite).y += diff;
        });
    }

    get width(): number {
        return this._container.width;
    }
    set width(value: number) {
        const diff = value / this.width;
        this._container.children.forEach(element => {
            (element as Sprite).width *= diff;
        });
    }

    get height(): number {
        return this._container.height;
    }
    set height(value: number) {
        const diff = value / this.height;
        this._container.children.forEach(element => {
            (element as Sprite).height *= diff;
        });
    }

    public perform() {
        app.stage.addChild(this._container);
    }

    public exit() {
        app.stage.removeChild(this._container);
    }
}