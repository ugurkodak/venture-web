import { Application, Sprite, Graphics } from 'pixi.js';
import Notice from './ui/prefabs';
import { Resources, Actor, RendererScaleMode } from './ui';

// Create a fullscreen pixi app
export const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    // TODO: Maybe this is needed for retina displays
    // I don't know if this is relevant -> pixi.settings.RESOLUTION
    // resolution: window.devicePixelRatio
});
document.body.appendChild(app.view);

// Make renderer resizable
window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

(async () => {
    await Resources.load();
    testActor();
    
})();

(function loop() {
    requestAnimationFrame(loop);
    // if (red300.x > app.renderer.width / 2 + 100) xDirection = false;
    // if (red300.x < app.renderer.width / 2 - 100) xDirection = true;
    // xDirection ? red300.x++ : red300.x--;
    // if (red300.y > app.renderer.height / 2 + 100) yDirection = false;
    // if (red300.y < app.renderer.height / 2 - 100) yDirection = true;
    // yDirection ? red300.y += 2 : red300.y -= 2;
})();


function testActor() {
    let red300 = new Sprite((new Graphics()
        .lineStyle(1, 0xff0000)
        .drawRect(0, 0, 300, 300)
        .endFill().generateCanvasTexture()));
    red300.y = 400;

    let green100 = new Sprite((new Graphics()
        .lineStyle(1, 0x00ff00)
        .drawRect(0, 0, 100, 100)
        .endFill().generateCanvasTexture()));
    green100.x = 400;

    let paper = new Sprite(Resources.getTexture(Resources.TextureId.WHITE_PAPER));

    let act = new Actor(paper);
    act.x = 500;
    act.useDebugBorder(true);
    act.setRendererScaleMode(RendererScaleMode.MAINTAIN_ASPECT_RATIO);
    act.setRendererScaleMode(RendererScaleMode.NONE);
    // act.addChild(red300);
    // act.addChild(green100);
    // act.x = 100;
    // act.y = 100;
    // // act.width = 200;
    // // act.height = 200;

    act.perform();
}
