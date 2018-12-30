import * as ex from 'excalibur';
import * as res from './resources';
import * as notice from './notice';

//Singleton UI instance
class UI {
    private static _instance: UI;
    private _isInitialized: boolean;
    private _engine: ex.Engine;
    private _loader: ex.Loader;
    private _noticeManager: notice.default | null;

    constructor() {
        this._isInitialized = false;
        this._noticeManager = null;
        //Initialize engine
        this._engine = new ex.Engine({
            displayMode: ex.DisplayMode.FullScreen,
            pointerScope: ex.Input.PointerScope.Canvas,
            backgroundColor: ex.Color.Black,
        });
        this._loader = new ex.Loader(res.LIST);
    }

    static get(): UI {
        if (!UI._instance) {
            UI._instance = new UI();
        }
        return UI._instance;
    }

    public async init() {
        if (this._isInitialized) return console.error('UI already initialized.');
        else {
            await this._engine.start(this._loader);
            this._noticeManager = new notice.default(this._engine);
            this._isInitialized = true;
        }
    }
}

export function instance() {
    return UI.get();
}