import { Container, Sprite, Graphics } from "pixi.js";
import { app } from "..";

export class Actor {
    //TODO: remove app import using the container parent
    private _container: Container; // Contains all sprites of a game object
    private _debugBorder: Sprite;
    private _isUsingDebugBorder: boolean;
    private _debugBorderWidth: number;
    private _debugBorderColor: number;
    private _rendererWidth: number;
    private _rendererHeight: number;
    private _rendererScaleMode: RendererScaleMode;
    private _maxWidth?: number;
    private _maxHeight?: number;
    private _minWidth?: number;
    private _minHeight?: number;
    private _rendererScaleEventListener: () => void;

    constructor(sprite?: Sprite) {
        this._container = new Container();
        this._rendererWidth = app.renderer.width;
        this._rendererHeight = app.renderer.height;
        this._debugBorder = new Sprite();
        this._isUsingDebugBorder = false;
        this._debugBorderWidth = 2;
        this._debugBorderColor = 0xff00ff
        this._rendererScaleMode = RendererScaleMode.NONE;
        this._rendererScaleEventListener = () => {
            this.scaleToRenderer();
        };

        //TODO: replace this with this.Addchild()
        sprite ? this._container.addChild(sprite) : this.UpdateOrDrawDebugBorder();
    }

    private scaleToRenderer() {
        if (this._container.children.length > 0) {
            switch (this._rendererScaleMode) {
                case RendererScaleMode.NONE: {
                    break;
                }
                case RendererScaleMode.RELATIVE: {
                    let diffX = app.renderer.width / this._rendererWidth,
                        diffY = app.renderer.height / this._rendererHeight;
                    this._rendererWidth = app.renderer.width;
                    this._rendererHeight = app.renderer.height;
                    this.width *= diffX;
                    this.height *= diffY;
                    this.x *= diffX;
                    this.y *= diffY;
                    break;
                }
                case RendererScaleMode.MAINTAIN_ASPECT_RATIO: {
                    break;
                }
                case RendererScaleMode.CLAMP: {
                    break;
                }
            }


        }
    }

    private setClampBounds(bounds: IClampBounds) {
        this._maxWidth = bounds.maxWidth;
        this._maxHeight = bounds.maxHeight;
        this._minWidth = bounds.minWidth;
        this._minHeight = bounds.minHeight;
    }

    private unsetClampBounnds() {
        this._maxWidth = undefined;
        this._maxHeight = undefined;
        this._minWidth = undefined;
        this._minHeight = undefined;
    }

    private UpdateOrDrawDebugBorder() {
        this.removeDebugBorder();
        // Draw 100x100 debug border sprite if no sprite added.
        if (this._container.children.length == 0) {
            this._debugBorder = new Sprite((new Graphics()
                .lineStyle(this._debugBorderWidth, this._debugBorderColor)
                .drawRect(0, 0, 100, 100)
                .endFill().generateCanvasTexture()));
            if (this._container.parent) app.stage.addChild(this._debugBorder);
        }
        else if (this._isUsingDebugBorder) {
            this._debugBorder = new Sprite((new Graphics()
                .lineStyle(this._debugBorderWidth, this._debugBorderColor)
                .drawRect(0, 0, this.width + this._debugBorderWidth, this.height + this._debugBorderWidth)
                .endFill().generateCanvasTexture()));
            if (this._container.parent) app.stage.addChild(this._debugBorder);
        }
        this._debugBorder.x = this.x - this._debugBorderWidth;
        this._debugBorder.y = this.y - this._debugBorderWidth;
    }

    private removeDebugBorder() {
        if (this._debugBorder.parent) app.stage.removeChild(this._debugBorder);
        this._debugBorder = new Sprite();
    }

    public addChild(sprite: Sprite) {
        this._container.addChild(sprite);
        this.UpdateOrDrawDebugBorder();
    }

    get x(): number {
        return this._container.x;
    }
    set x(value: number) {
        this._container.x = value;
        this.UpdateOrDrawDebugBorder();
    }

    get y(): number {
        return this._container.y;
    }
    set y(value: number) {
        this._container.y = value;
        this.UpdateOrDrawDebugBorder();
    }

    get width(): number {
        return this._container.width;
    }
    set width(value: number) {
        this._container.width = value;
        this.UpdateOrDrawDebugBorder();
    }

    get height(): number {
        return this._container.height;
    }
    set height(value: number) {
        this._container.height = value;
        this.UpdateOrDrawDebugBorder();
    }

    public perform() {
        app.stage.addChild(this._container);
        if (this._debugBorder.texture) app.stage.addChild(this._debugBorder);
    }

    public exit() {
        app.stage.removeChild(this._container);
        this.removeDebugBorder();
    }

    public setRendererScaleMode(
        mode: RendererScaleMode, bounds?: IClampBounds) {
        switch (mode) {
            case RendererScaleMode.NONE: {
                this._rendererScaleMode = RendererScaleMode.NONE;
                this.unsetClampBounnds();
                window.removeEventListener('resize', this._rendererScaleEventListener);
                break;
            }
            case RendererScaleMode.RELATIVE: {
                this._rendererScaleMode = RendererScaleMode.RELATIVE;
                this.unsetClampBounnds();
                window.addEventListener('resize', this._rendererScaleEventListener);
                break;
            }
            case RendererScaleMode.MAINTAIN_ASPECT_RATIO: {
                this._rendererScaleMode = RendererScaleMode.MAINTAIN_ASPECT_RATIO;
                this.unsetClampBounnds();
                window.addEventListener('resize', this._rendererScaleEventListener);
                break;
            }
            case RendererScaleMode.CLAMP: {
                if (bounds) {
                    this._rendererScaleMode = RendererScaleMode.CLAMP;
                    this.setClampBounds(bounds);
                    window.addEventListener('resize', this._rendererScaleEventListener);
                }
                else {
                    console.warn(`Tried to set renderer scale mode to clamp 
                    without providing boundaries. Setting is ignored.`);
                    return;
                }
                break;
            }
        }
    }

    public useDebugBorder(boolean: boolean, borderColor?: number, borderWidth?: number) {
        if (borderColor) this._debugBorderColor = borderColor;
        if (borderWidth) this._debugBorderWidth = borderWidth;
        if (boolean) {
            this._isUsingDebugBorder = true;
            this.UpdateOrDrawDebugBorder();
        }
        else {
            this._isUsingDebugBorder = false;
            this.removeDebugBorder();
        }
    }
}

export enum RendererScaleMode {
    NONE,
    RELATIVE,
    MAINTAIN_ASPECT_RATIO,
    CLAMP
}

export interface IClampBounds {
    maxWidth: number,
    maxHeight: number,
    minWidth: number,
    minHeight: number
}