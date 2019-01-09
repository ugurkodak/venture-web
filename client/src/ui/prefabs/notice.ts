import { app } from "../..";
import * as res from '../resources';
import { Sprite } from "pixi.js";
import Actor from "../actor";

const a4Ratio = Math.sqrt(2);
const maxScreenCoverageRatio = 0.8;

export default class Notice extends Actor {
    constructor() {
        super(new Sprite(res.getTexture(res.TextureId.TEXTURE_WHITE_PAPER)));
        this.respondToRendererSize();
        
        // TODO: Maybe adding event listeners to the same event 
        // from different places is a bad idea.
        window.addEventListener('resize', () => {
            this.respondToRendererSize();
        });
    }

    public respondToRendererSize() {
        this.height = app.renderer.height * maxScreenCoverageRatio;
        this.width = this.height / a4Ratio;
        this.x = app.renderer.width / 2 - this.width / 2;
        this.y = app.renderer.height / 2 - this.height / 2;

        if (this.width >= maxScreenCoverageRatio * app.renderer.width) {
            this.width = maxScreenCoverageRatio * app.renderer.width;
            this.height = this.width * a4Ratio;
            this.x = app.renderer.width / 2 - this.width / 2;
            this.y = app.renderer.height / 2 - this.height / 2;
        }
    }
}