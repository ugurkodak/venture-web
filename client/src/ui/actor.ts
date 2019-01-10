import { Container, Sprite, Graphics } from "pixi.js";
import { app } from "..";

const DEBUG_BORDER_WIDTH = 2; // TODO: Why 1 looks incorrect?

export default class Actor {
    //TODO: remove app import using the container parent
    private _container: Container; // Contains all sprites of a game object
    private _debugBorder: Sprite;
    private _isUsingDebugBorder: boolean;
    protected _rendererWidth: number;
    protected _rendererHeight: number;

    constructor(sprite?: Sprite, scaleToRenderer: boolean = false) {
        this._container = new Container();
        this._rendererWidth = app.renderer.width;
        this._rendererHeight = app.renderer.height;
        this._debugBorder = new Sprite();
        this._isUsingDebugBorder = false;

        sprite ? this._container.addChild(sprite) : this.UpdateOrDrawDebugBorder();
        if (scaleToRenderer) {
            window.addEventListener('resize', () => {
                this.scaleToRenderer();
            });
        }
    }

    // TODO: Maybe this has a better place
    private scaleToRenderer() {
        let diffX = app.renderer.width - this._rendererWidth,
            diffY = app.renderer.height - this._rendererHeight;
        this._rendererWidth = app.renderer.width;
        this._rendererHeight = app.renderer.height;
        this.width += diffX / 2;
        this.height += diffY / 2;
        this.x += diffX / 2;
        this.y += diffY / 4;
    }

    public addChild(sprite: Sprite) {
        this._container.addChild(sprite);
        this.UpdateOrDrawDebugBorder();
    }

    get x(): number {
        // return Math.min(...this._container.children.map(o => o.x, 0));
        return this._container.x;
    }
    set x(value: number) {
        this._container.x = value;
        this.UpdateOrDrawDebugBorder();
        // const diff = value - this.x;
        // this._container.children.forEach(element => {
        //     element.x += diff; //TODO: Do I need to cast to Sprite?
        // });
    }

    get y(): number {
        // return Math.min(...this._container.children.map(o => o.y, 0));
        return this._container.y;
    }
    set y(value: number) {
        this._container.y = value;
        this.UpdateOrDrawDebugBorder();
        // const diff = value - this.y;
        // this._container.children.forEach(element => {
        //     element.y += diff;
        // });
    }

    get width(): number {
        return this._container.width;
    }
    set width(value: number) {
        this._container.width = value;
        this.UpdateOrDrawDebugBorder();
        // const diff = value - this.width;
        // this._container.children.forEach((element) => {
        //     (element as Sprite).width += diff;
        // });
    }

    get height(): number {
        return this._container.height;
    }
    set height(value: number) {
        this._container.height = value;
        this.UpdateOrDrawDebugBorder();
        // const diff = value - this.height;
        // this._container.children.forEach((element) => {
        //     (element as Sprite).height += diff;
        // });
    }

    set isUsingDebugBorder(boolean: boolean) {
        if (boolean) {
            this._isUsingDebugBorder = true;
            this.UpdateOrDrawDebugBorder();
        }
        else {
            this._isUsingDebugBorder = false;
            this.removeDebugBorder();
        }
    }

    public perform() {
        app.stage.addChild(this._container);
        if (this._debugBorder.texture) app.stage.addChild(this._debugBorder);
    }

    public exit() {
        app.stage.removeChild(this._container);
        this.removeDebugBorder();
    }

    private UpdateOrDrawDebugBorder(color: number = 0xff00ff) {
        this.removeDebugBorder();
        // Draw 100x100 debug border sprite if no sprite added.
        if (this._container.children.length == 0) {
            this._debugBorder = new Sprite((new Graphics()
                .lineStyle(DEBUG_BORDER_WIDTH, color)
                .drawRect(0, 0, 100, 100)
                .endFill().generateCanvasTexture()));
            if (this._container.parent) app.stage.addChild(this._debugBorder);
        }
        else if (this._isUsingDebugBorder) {
            this._debugBorder = new Sprite((new Graphics()
                .lineStyle(DEBUG_BORDER_WIDTH, color)
                .drawRect(0, 0, this.width + DEBUG_BORDER_WIDTH, this.height + DEBUG_BORDER_WIDTH)
                .endFill().generateCanvasTexture()));
            if (this._container.parent) app.stage.addChild(this._debugBorder);
        }
        this._debugBorder.x = this.x - DEBUG_BORDER_WIDTH;
        this._debugBorder.y = this.y - DEBUG_BORDER_WIDTH;
    }

    private removeDebugBorder() {
        if (this._debugBorder.parent) app.stage.removeChild(this._debugBorder);
        this._debugBorder = new Sprite();
    }
}