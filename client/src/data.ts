import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const database = firebase.initializeApp({
    apiKey: "AIzaSyAO8agjt4l-vPGeHR85RteTU65Eq229p00",
    authDomain: "venture-196117.firebaseapp.com",
    databaseURL: "https://venture-196117.firebaseio.com",
    projectId: "venture-196117",
    storageBucket: "venture-196117.appspot.com",
    messagingSenderId: "356906761499"
}).database().ref();

export class Data {
    private static _instance: Data;
    public user: User | null;
    public character: Character | null;
    public city: City | null;
    constructor() {
        this.user = null;
        this.character = null;
        this.city = null;
    }
    static getInstance(): Data {
        if (!Data._instance) {
            Data._instance = new Data();
        }
        return Data._instance;
    }

    public async register(uid: string, characterMeta: Data.Character.Meta): Promise<void> {
        try {
            let updates: any = {};
            let characterId = database.child('meta').child('character').push().key as string;
            updates['/meta/character/' + characterId] = characterMeta;
            let userMeta: Data.User.Meta = {
                characterId: characterId
            }
            updates['/meta/user/' + uid] = userMeta
            await database.update(updates);
            this.user = new User(uid, userMeta);
            this.character = new Character(characterId, characterMeta);
            //TODO: Load city here
        }
        catch (error) {
            console.error(error);
        }
    }

    public async login(): Promise<string | null> {
        try {
            let googleUser = (await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())).user;
            if (!googleUser) {
                console.error('Could not login user.');
                return null;
            }
            else {
                let userMeta = (await database.child('meta').child('user').child(googleUser.uid).once('value')).val() as Data.User.Meta;
                if (!userMeta) return googleUser.uid;
                else {
                    this.user = new User(googleUser.uid, userMeta);
                    let characterInfo = (await database.child('meta').child('character').child(userMeta.characterId).once('value')).val() as Data.Character.Meta;
                    this.character = new Character(userMeta.characterId, characterInfo);
                    return googleUser.uid;
                    //TODO: Load city here.
                }
            }
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
}
export namespace Data {
    export namespace User {
        export interface Meta {
            characterId: string,
        }
    }

    export namespace City {
        export interface Meta {
            name: string,
        }
        export enum TileTexture {
            Road,
            Tramway,
            Land
        }
    }

    export namespace Character {
        export interface Meta {
            firstName: string;
            lastName: string;
            prefix: Prefix;
        }
        export enum Prefix {
            MR = 'Mr.',
            MS = 'Ms.',
            MX = 'Mx.'
        }
    }
}

class User {
    public id: string;
    public meta: Data.User.Meta;
    // private _raw: User.Raw | null;

    constructor(id: string, meta: Data.User.Meta) {
        this.id = id;
        this.meta = meta;
        // this._raw = null;
    }
}

namespace User {
    export interface Raw {

    }
}

class Character {
    public id: string;
    public meta: Data.Character.Meta;
    // private _raw: Character.Raw | null;

    constructor(id: string, meta: Data.Character.Meta) {
        this.id = id;
        this.meta = meta;
        // this._raw = null;
    }

    public getFullName(): string {
        return this.meta.prefix + ' ' + this.meta.firstName + ' ' + this.meta.lastName;
    }
}

namespace Character {
    export interface Raw {
        balance: number;
    }
}

class City {
    public id: string;
    public meta: Data.City.Meta;
    // private _raw: City.Raw | null;

    constructor(id: string, meta: Data.City.Meta) {
        this.id = id;
        this.meta = meta;
        // this._raw = null;
    }

    static async create(areas: number, tilesPerLot = 16, lotsPerBlock = 4, blocksPerArea = 6): Promise<City.Raw> {
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
                            texture: Data.City.TileTexture.Land,
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
}
namespace City {
    export interface Raw {
        tiles: Tile[];
    }

    export interface Tile {
        x: number;
        y: number;
        rotation: number;
        lotId: number;
        blockId: number;
        areaId: number;
        texture: Data.City.TileTexture;
        characterId: string;
        value: number;
    }
}