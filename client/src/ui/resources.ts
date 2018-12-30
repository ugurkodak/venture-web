import { Texture } from "excalibur";

export const LIST = [
    new Texture('images/texture_white_paper.png'),
    new Texture('images/texture_white_paper_close_0.png'),
    new Texture('images/texture_white_paper_close_1.png'),
    new Texture('images/texture_white_paper_close_2.png'),
    new Texture('images/dice.png')
];

export enum TextureId {
    TEXTURE_WHITE_PAPER,
    TEXTURE_WHITE_PAPER_CLOSE_0,
    TEXTURE_WHITE_PAPER_CLOSE_1,
    TEXTURE_WHITE_PAPER_CLOSE_2,
}

export function getTexture(id: TextureId): Texture {
    return LIST[id];
}