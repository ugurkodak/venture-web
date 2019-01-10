import { app } from "../..";
import * as res from '../resources';
import { Sprite, Text } from "pixi.js";
import Actor from "../actor";
import * as data from "../../data";

const a4Ratio = Math.sqrt(2);
const maxScreenCoverageRatio = 0.8;

export default class Notice extends Actor {
    constructor() {
        super(new Sprite(res.getTexture(res.TextureId.WHITE_PAPER)));
        // Login button
        let button_login = new Text('Login', {
            fontFamily: 'Courier New',
            fill: "#2fd526",
        });
        button_login.on('click', async () => {
            await data.login();
            console.log(data.User.id);
        });
        button_login.x = this.x;
        button_login.y = this.y;
        this.addChild(button_login);

        // TODO: Maybe adding event listeners to the same event 
        // from different places is a bad idea.
        // window.addEventListener('resize', () => {
        //     this.respondToRendererSize();
        // });
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