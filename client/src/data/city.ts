//** City modelmap */

export let id: string;
export let meta: ICityMeta;
//@ts-ignore
let _raw: ICityRaw | null;

export function init(id: string, meta: ICityMeta) {
    id = id;
    meta = meta;
    _raw = null;
}

//Modifiable data types stored in city document
export interface ICityMeta {
    name: string,
}

export enum CityTileTexture {
    Road,
    Tramway,
    Land
}

//Readonly data types stored in city document 
interface ICityRaw {
    tiles: ICityTile[];
}

interface ICityTile {
    x: number;
    y: number;
    rotation: number;
    lotId: number;
    blockId: number;
    areaId: number;
    texture: CityTileTexture;
    characterId: string;
    value: number;
}