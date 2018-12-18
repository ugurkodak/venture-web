import firebase from 'firebase/app';
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
    // public city: City | null;
    constructor() {
        this.user = null;
        this.character = null;
        // this.city = null;
    }
    static getInstance(): Data {
        if (!Data._instance) {
            Data._instance = new Data();
        }
        return Data._instance;
    }

    public async register(uid: string, characterInfo: Data.Character.Info): Promise<void> {
        try {
            let characterId = database.child('character').push().key as string;
            console.log(characterId);
            await database.child('character').child(characterId).child('info').set(characterInfo);
            console.log(uid);
            await database.child('user').child(uid).child('info').set({
                characterId: characterId
            });
            this.character = new Character(characterId, characterInfo); //TODO: Should this be here?
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
                let userInfo = (await database.child('user').child(googleUser.uid).child('info').once('value')).val() as Data.User.Info;
                if (!userInfo) return googleUser.uid;
                else {
                    this.user = new User(googleUser.uid, userInfo);
                    let characterInfo = (await database.child('character').child(userInfo.characterId).child('info').once('value')).val() as Data.Character.Info;
                    this.character = new Character(userInfo.characterId, characterInfo); //TODO: Should this be here?
                    return googleUser.uid;
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
        export interface Info {
            characterId: string,
        }
    }

    export namespace Character {
        export interface Info {
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
    private readonly _collection: firebase.database.Reference;
    public id: string;
    public _info: Data.User.Info;
    private _data: User.Data | null;

    constructor(id: string, info: Data.User.Info) {
        this._collection = database.child('user');
        this.id = id;
        this._info = info;
        this._data = null;
    }
}

namespace User {
    export interface Data {

    }
}

class Character {
    private readonly _collection: firebase.database.Reference;
    public id: string;
    public _info: Data.Character.Info;
    private _data: Character.Data | null;

    constructor(id: string, info: Data.Character.Info) {
        this._collection = database.child('character');
        this.id = id;
        this._info = info;
        this._data = null;
    }

    public getFullName(): string {
        return this._info.prefix + ' ' + this._info.firstName + ' ' + this._info.lastName;
    }
}

namespace Character {
    export interface Data {
        balance: number;
    }
}

// class City {
//     static db: firebase.database.Reference = dbRoot.child('city');
//     // private _id: string | null = null;
//     private _data: City.Data | null = null;
//     get data(): City.Data {
//         if (this._data != null) return this._data;
//         else {
//             console.error('City data uninitialized.');
//             return {
//                 name: "",
//                 tiles: []
//             };
//         }
//     }
//     public load(data: City.Data) {
//         this._data = data;
//     }
//     static async create(areas: number, tilesPerLot = 16, lotsPerBlock = 4, blocksPerArea = 6): Promise<City.Data> {
//         let tiles: City.Tile[] = [];
//         for (let area = 0; area < areas; area++) {
//             for (let block = 0; block < blocksPerArea; block++) {
//                 for (let lot = 0; lot < lotsPerBlock; lot++) {
//                     for (let tile = 0; tile < tilesPerLot; tile++) {

//                         //TODO: Add lot block and area info to tile positions
//                         let x = tile % Math.sqrt(tilesPerLot);
//                         let y = Math.floor(tile / Math.sqrt(tilesPerLot));

//                         tiles.push({
//                             x: x,
//                             y: y,
//                             rotation: 0,
//                             lotId: lot,
//                             blockId: block,
//                             areaId: area,
//                             texture: City.TileTexture.Land,
//                             characterId: City.GOVERNMENT_CHARACTER_ID,
//                             value: City.LOT_MAX_VALUE / tilesPerLot
//                         });
//                     }
//                 }
//             }
//         }
//         return {
//             name: "City Name",
//             tiles: tiles
//         }
//     }
// }
// namespace City {
//     export const LOT_MAX_VALUE = 500000;
//     export const GOVERNMENT_CHARACTER_ID = "gov";
//     export interface Data {
//         name: string;
//         tiles: Tile[];
//     }
//     export enum TileTexture {
//         Road,
//         Tramway,
//         Land
//     }
//     export interface Tile {
//         x: number;
//         y: number;
//         rotation: number;
//         lotId: number;
//         blockId: number;
//         areaId: number;
//         texture: TileTexture;
//         characterId: string;
//         value: number;
//     }
// }