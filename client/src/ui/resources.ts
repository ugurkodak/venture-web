import { loader, Texture } from "pixi.js";

export const LIST = [
    'images/texture_white_paper.png',
    'images/texture_white_paper_close_0.png',
    'images/texture_white_paper_close_1.png',
    'images/texture_white_paper_close_2.png',
    'images/dice.png'
];

export enum TextureId {
    TEXTURE_WHITE_PAPER,
    TEXTURE_WHITE_PAPER_CLOSE_0,
    TEXTURE_WHITE_PAPER_CLOSE_1,
    TEXTURE_WHITE_PAPER_CLOSE_2,
    TEXTURE_DICE
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