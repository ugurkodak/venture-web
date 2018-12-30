import * as ex from 'excalibur';
import * as res from '../resources';
import { engine } from '../index';

function letter(): ex.UIActor[] {
    let components: ex.UIActor[] = [];

    let background = new ex.UIActor();
    background.x = engine.drawWidth / 2;
    background.y = engine.drawHeight / 2;
    background.currentDrawing = new ex.Sprite({
        width: engine.drawWidth / 3,
        height: engine.drawHeight * 0.95,
        image: res.getTexture(res.TextureId.TEXTURE_WHITE_PAPER),
        anchor: new ex.Vector(0.5, 0.5)
    });
    components.push(background);
    return components;
}

export function mainMenu(): ex.UIActor[] {
    return letter();
}