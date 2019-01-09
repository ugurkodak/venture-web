import * as pixi from 'pixi.js';
import { Resources } from './ui';
import Notice from './ui/prefabs';

// Create a fullscreen pixi app
export const app = new pixi.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    // TODO: Maybe this is needed for retina displays
    // I don't know if this is relevant -> pixi.settings.RESOLUTION
    // resolution: window.devicePixelRatio
});

// Make renderer resizable
window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});
document.body.appendChild(app.view);

// Main
(async () => {
    await Resources.load();
    let notice = new Notice();
    notice.perform();
    notice.x = app.renderer.width / 2 - notice.width / 2;
    notice.y = app.renderer.height / 2 - notice.height / 2;

    // let o = new Actor(
    //     new pixi.Sprite(ui.Resources.getTexture(ui.Resources.TextureId.TEXTURE_WHITE_PAPER)),
    //     true);
    // o.perform();
    // o.x = app.renderer.width / 2 - o.width / 2;
    // o.y = app.renderer.height / 2 - o.height / 2;
})();













// import * as ex from 'excalibur';
// import * as res from './resources';
// import * as notice from './notice'

// export const engine = new ex.Engine({
//     displayMode: ex.DisplayMode.FullScreen,
//     pointerScope: ex.Input.PointerScope.Canvas,
//     backgroundColor: ex.Color.Black,
// });

// const loader = new ex.Loader(res.LIST);

// export async function init() {
//     await engine.start(loader);
//     notice.addToQueue(notice.NoticeId.MAIN_MENU);
//     notice.open();
// }