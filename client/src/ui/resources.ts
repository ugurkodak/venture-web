import { loader, Texture } from "pixi.js";

const LIST = [
    'images/texture_white_paper.png',
    'images/texture_white_paper_close_0.png',
    'images/texture_white_paper_close_1.png',
    'images/texture_white_paper_close_2.png',
    'images/dice.png'
];

export enum TextureId {
    WHITE_PAPER,
    WHITE_PAPER_CLOSE_0,
    WHITE_PAPER_CLOSE_1,
    WHITE_PAPER_CLOSE_2,
    DICE
}

//Promisify pixi callback style load function for organisation
export async function load(): Promise<void> {
    return new Promise<void>((resolve) => {
        loader.add(LIST).load(resolve);
    });
}

export function getTexture(id: TextureId): Texture {
    return loader.resources[LIST[id]].texture
}