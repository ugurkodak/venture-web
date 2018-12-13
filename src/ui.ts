import * as Pixi from 'pixi.js'

export class UI extends Pixi.Application {
    constructor() {
        super({width: 640, height: 360});
        document.body.appendChild(this.renderer.view);
        Pixi.loader.add(["images/test.png"]).load(() => {
            //TODO: Load images here
        });
    }

    public openForm(formName: UI.Form) {
        this.stage.addChild(new Form(this, formName));
    }
}

export namespace UI {
    export enum Form {
        MAIN_MENU,
        LOGIN,
        ABOUT
    }
}

class Form extends Pixi.Container {
    ui: UI
    panel: Pixi.Sprite;
    constructor(ui: UI, formName: UI.Form) {
        super();
        this.ui = ui;
        
        this.panel = new Pixi.Sprite(Pixi.Texture.WHITE);
        this.panel.anchor.x = 0.5;
        this.panel.anchor.y = 0.5;
        this.addChild(this.panel);

        switch (formName) {
            case UI.Form.MAIN_MENU: {
                this.mainMenu();
                break;
            }
        }
    }

    private mainMenu() {
        this.panel.width = this.ui.view.width / 3;
        this.panel.height = this.ui.view.height * 0.95;
        this.panel.x = this.ui.view.width / 2;
        this.panel.y = this.ui.view.height / 2;

        let button_login = new Pixi.Text('Login', {
            fontFamily: "\"Courier New\", Courier, monospace",
            fontSize: 20
        });
        button_login.interactive = true;
        button_login.anchor.x = 0.5;
        button_login.anchor.y = 0.5;
        button_login.x = this.panel.x;
        button_login.y = this.panel.height * 0.25;
        button_login.on('click', () => {
            console.log('Login pressed');
        });
        this.addChild(button_login);

        let button_about = new Pixi.Text('About', {
            fontFamily: "\"Courier New\", Courier, monospace",
            fontSize: 20
        });
        button_about.interactive = true;
        button_about.anchor.x = 0.5;
        button_about.anchor.y = 0.5;
        button_about.x = this.panel.x;
        button_about.y = this.panel.height * 0.50;
        button_about.on('click', () => {
            console.log('About pressed');
        });
        this.addChild(button_about);

        let button_exit = new Pixi.Text('Exit', {
            fontFamily: "\"Courier New\", Courier, monospace",
            fontSize: 20
        });
        button_exit.interactive = true;
        button_exit.anchor.x = 0.5;
        button_exit.anchor.y = 0.5;
        button_exit.x = this.panel.x;
        button_exit.y = this.panel.height * 0.75;
        button_exit.on('click', () => {
            console.log('Exit pressed');
        });
        this.addChild(button_exit);
    }
}

