import * as ex from 'excalibur';
import * as res from './resources';
import * as notice from './notice-manager'

export const engine = new ex.Engine({
    displayMode: ex.DisplayMode.FullScreen,
    pointerScope: ex.Input.PointerScope.Canvas,
    backgroundColor: ex.Color.Black,
});

const loader = new ex.Loader(res.LIST);

export async function init() {
    await engine.start(loader);
    notice.addToQueue(notice.NoticeId.MAIN_MENU);
    notice.open();
}