import * as functions from 'firebase-functions';

namespace City {
    export interface Raw {
        tiles: Tile[];
    }
    export enum TileTexture {
        Road,
        Tramway,
        Land
    }
    export interface Tile {
        x: number;
        y: number;
        rotation: number;
        lotId: number;
        blockId: number;
        areaId: number;
        texture: TileTexture;
        characterId: string;
        value: number;
    }
}

export const createCity = async (areas: number, tilesPerLot = 16, lotsPerBlock = 4, blocksPerArea = 6): Promise<City.Raw> => {
    const LOT_MAX_VALUE = 500000;
    const GOVERNMENT_CHARACTER_ID = "gov";
    let tiles: City.Tile[] = [];
    for (let area = 0; area < areas; area++) {
        for (let block = 0; block < blocksPerArea; block++) {
            for (let lot = 0; lot < lotsPerBlock; lot++) {
                for (let tile = 0; tile < tilesPerLot; tile++) {
                    //TODO: Add lot block and area info to tile positions
                    let x = tile % Math.sqrt(tilesPerLot);
                    let y = Math.floor(tile / Math.sqrt(tilesPerLot));
                    tiles.push({
                        x: x,
                        y: y,
                        rotation: 0,
                        lotId: lot,
                        blockId: block,
                        areaId: area,
                        texture: City.TileTexture.Land,
                        characterId: GOVERNMENT_CHARACTER_ID,
                        value: LOT_MAX_VALUE / tilesPerLot
                    });
                }
            }
        }
    }
    return {
        tiles: tiles
    }
}

//@ts-ignore unused parameter
export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});