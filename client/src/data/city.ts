//** City modelmap */
export default class City {
    public id: string;
    public meta: ICityMeta;
    //@ts-ignore
    private _raw: ICityRaw | null;

    constructor(id: string, meta: ICityMeta) {
        this.id = id;
        this.meta = meta;
        this._raw = null;
    }
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