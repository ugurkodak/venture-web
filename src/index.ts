import * as pixi from 'pixi.js';
import { Data } from './data';

class Renderer extends pixi.Application {
    private _activeNotice: Notice | null = null;
    constructor() {
        super({ width: 640, height: 360 });
        document.body.appendChild(this.renderer.view);
        pixi.loader.add(["images/test.png"]).load(() => {
            //TODO: Load images here
        });
    }

    public openNotice(formName: NoticeName, extra?: any) {
        if (this._activeNotice != null) this.closeNotice();
        this._activeNotice = new Notice(this, formName, extra);
        this.stage.addChild(this._activeNotice);
    }

    public closeNotice() {
        if (this._activeNotice != null) this.stage.removeChild(this._activeNotice);
        else {
            console.error('Tried to close nonexistent form');
        }
    }

    // public renderCity(data: data.City.Data) {
    //     data.tiles.forEach(tile => {
    //         let t = pixi.Sprite.fromImage('./images/test.png');
    //         t.width = 20;
    //         t.height = 20;
    //         t.x = tile.x * t.width;
    //         t.y = tile.y * t.height;
    //         this.stage.addChild(t);
    //         console.log(t.x + ', ' + t.y)
    //     });
    // }
}
class Notice extends pixi.Container {
    private _renderer: Renderer
    private _panel: pixi.Sprite = new pixi.Sprite();
    constructor(renderer: Renderer, noticeName: NoticeName, extra?: any) {
        super();
        this._renderer = renderer;
        switch (noticeName) {
            case NoticeName.MAIN_MENU: {
                this.mainMenu();
                break;
            }
            case NoticeName.CHARACTER_REGISTRATION: {
                this.characterRegistration(extra);
                break;
            }
            case NoticeName.ABOUT: {
                this.about();
                break;
            }
        }
    }

    private mainMenu() {
        this._panel = new pixi.Sprite(pixi.Texture.fromImage('./images/texture_white_paper.png'));
        this._panel.anchor.x = 0.5;
        this._panel.anchor.y = 0.5;
        this._panel.width = this._renderer.view.width / 3;
        this._panel.height = this._renderer.view.height * 0.95;
        this._panel.x = this._renderer.view.width / 2;
        this._panel.y = this._renderer.view.height / 2;
        this.addChild(this._panel);

        let button_login = new pixi.Text('Login', {
            fontFamily: "\"Courier New\", Courier, monospace",
            fontSize: 20
        });
        button_login.interactive = true;
        button_login.anchor.x = 0.5;
        button_login.anchor.y = 0.5;
        button_login.x = this._panel.x;
        button_login.y = this._panel.height * 0.33;
        button_login.on('click', async () => {
            let uid = await Data.getInstance().login();
            if (!uid) return;
            else if (!Data.getInstance().user) this._renderer.openNotice(NoticeName.CHARACTER_REGISTRATION, uid);
            else {
                this._renderer.closeNotice();
                //TODO: Proceed to character overview and loading city.
            }
        });
        this.addChild(button_login);

        let button_about = new pixi.Text('About', {
            fontFamily: "\"Courier New\", Courier, monospace",
            fontSize: 20
        });
        button_about.interactive = true;
        button_about.anchor.x = 0.5;
        button_about.anchor.y = 0.5;
        button_about.x = this._panel.x;
        button_about.y = this._panel.height * 0.66;
        button_about.on('click', () => {
            this._renderer.openNotice(NoticeName.ABOUT);
        });
        this.addChild(button_about);
    }

    characterRegistration(uid: string) {
        this.document();
        let firstNames = ['Jack', 'Michael', 'Adam', 'James', 'John', 'Robert'];
        let lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis'];

        let prefix = Data.Character.Prefix.MR;
        let firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        let lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

        let text_name = new pixi.Text('Full Name:  ' + firstName + ' ' + lastName, {
            fontFamily: "\"Courier New\", Courier, monospace",
            fontSize: 12
        });
        text_name.anchor.x = 0.5;
        text_name.anchor.y = 0.5;
        text_name.x = this._panel.x;
        text_name.y = this._panel.height * 0.33;
        this.addChild(text_name);

        let button_register = new pixi.Text('Register', {
            fontFamily: "\"Courier New\", Courier, monospace",
            fontSize: 20
        });
        button_register.interactive = true;
        button_register.anchor.x = 0.5;
        button_register.anchor.y = 0.5;
        button_register.x = this._panel.x;
        button_register.y = this._panel.height * 0.70;
        button_register.on('click', async () => {
            Data.getInstance().register(uid, {
                prefix,
                firstName,
                lastName
            });
            this._renderer.closeNotice();
            //TODO: Proceed to character overview and loading city.
        });
        this.addChild(button_register);
    }

    private about() {
        this._panel = new pixi.Sprite(pixi.Texture.fromImage('./images/texture_white_paper_close_0.png'));
        this._panel.anchor.x = 0.5;
        this._panel.anchor.y = 0.5;
        this._panel.width = this._renderer.view.width / 3;
        this._panel.height = this._renderer.view.height * 0.95;
        this._panel.x = this._renderer.view.width / 2;
        this._panel.y = this._renderer.view.height / 2;
        this.addChild(this._panel);

        let text = new pixi.Text('©2018 Ugur Kodak', {
            fontFamily: "\"Courier New\", Courier, monospace",
            fontSize: 20
        });
        text.anchor.x = 0.5;
        text.anchor.y = 0.5;
        text.x = this._panel.x;
        text.y = this._panel.height * 0.33;
        this.addChild(text);
        let button_close = new pixi.Sprite();
        button_close.interactive = true;
        button_close.anchor.x = 0.5;
        button_close.anchor.y = 0.5;
        button_close.width = this._panel.width * 0.3;
        button_close.height = button_close.width;
        button_close.x = this._panel.x + this._panel.width / 2 - button_close.width / 2;
        button_close.y = this._panel.y - this._panel.height / 2 + button_close.height / 2;
        button_close.on('click', () => {
            this._renderer.openNotice(NoticeName.MAIN_MENU);
        });
        this.addChild(button_close);
    }

    private document() {
        this._panel = new pixi.Sprite(pixi.Texture.fromImage('./images/texture_white_paper.png'));
        this._panel.anchor.x = 0.5;
        this._panel.anchor.y = 0.5;
        this._panel.width = this._renderer.view.width / 3;
        this._panel.height = this._renderer.view.height * 0.95;
        this._panel.x = this._renderer.view.width / 2;
        this._panel.y = this._renderer.view.height / 2;
        this.addChild(this._panel);
    }
}

enum NoticeName {
    MAIN_MENU,
    LOGIN,
    CHARACTER_REGISTRATION,
    ABOUT
}

//Main
(async () => {
    let renderer = new Renderer();
    renderer.openNotice(NoticeName.MAIN_MENU);
})();