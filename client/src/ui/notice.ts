import * as ex from 'excalibur';
import * as res from './resources'

let engine: ex.Engine;

export default class Manager {
    private _queue: Notice[];
    private _active: Notice | null;

    constructor(engine: ex.Engine) {
        engine = engine;
        this._queue = [];
        this._active = null;

        this.addToQueue(NoticeId.MAIN_MENU);
        this.open();
    }

    public addToQueue(id: NoticeId) {
        let notice: Notice;
        switch (id) {
            case NoticeId.MAIN_MENU: {
                notice = mainMenu();
                break;
            }
            default: {
                console.error('Undefined notice id');
                return;
            }
        }
        this._queue.push(notice);
    }

    public open(index?: number) {
        let activeNotice;
        if (index) activeNotice = this._queue[index];
        else if (this._queue[0]) activeNotice = this._queue[0];
        else return console.error('Notice does not exist');
        add(activeNotice);
        this._active = activeNotice;
    }
}

interface Notice {
    components: ex.UIActor[];
}

function init(): Notice {
    return {
        components: []
    };
}

function add(notice: Notice) {
    notice.components.forEach(c => {
        engine.add(c);
    });
}

function letter(notice: Notice): Notice {
    let background = new ex.UIActor();
    background.x = engine.drawWidth / 2;
    background.y = engine.drawHeight / 2;
    background.currentDrawing = new ex.Sprite({
        width: engine.drawWidth / 3,
        height: engine.drawHeight * 0.95,
        image: res.getTexture(res.TextureId.TEXTURE_WHITE_PAPER),
        anchor: new ex.Vector(0.5, 0.5)
    });
    notice.components.push(background);
    return notice;
}

function mainMenu(): Notice {
    let notice = init();
    return letter(notice);
}

export enum NoticeId {
    MAIN_MENU,
}