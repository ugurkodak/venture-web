import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyAO8agjt4l-vPGeHR85RteTU65Eq229p00",
    authDomain: "venture-196117.firebaseapp.com",
    databaseURL: "https://venture-196117.firebaseio.com",
    projectId: "venture-196117",
    storageBucket: "venture-196117.appspot.com",
    messagingSenderId: "356906761499"
});
const dbRoot = app.database().ref();

export class City {
    static db: firebase.database.Reference = dbRoot.child('city');
    // private _id: string | null = null;
    private _data: City.Data | null = null;
    get data(): City.Data {
        if (this._data != null) return this._data;
        else {
            console.error('City data uninitialized.');
            return {
                name: "",
                tiles: []
            };
        }
    }
    public load(data: City.Data) {
        this._data = data;
    }
    static async create(areas: number, tilesPerLot = 16, lotsPerBlock = 4, blocksPerArea = 6): Promise<City.Data> {
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
                            characterId: City.GOVERNMENT_CHARACTER_ID,
                            value: City.LOT_MAX_VALUE / tilesPerLot
                        });
                    }
                }
            }
        }
        return {
            name: "City Name",
            tiles: tiles
        }
    }
}
export namespace City {
    export const LOT_MAX_VALUE = 500000;
    export const GOVERNMENT_CHARACTER_ID = "gov";
    export interface Data {
        name: string;
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
export class Character {
    static db: firebase.database.Reference = dbRoot.child('character');
    private _id: string | null = null;
    private _prefix: Character.Prefix | null = null;
    private _firstName: string | null = null;
    private _lastName: string | null = null;
    private _balance: number | null = null;

    get id(): string {
        if (this._id != null) return this._id;
        else {
            console.error('Uninitialized character id.');
            return '';
        }
    }
    get prefix(): Character.Prefix {
        if (this._prefix != null) return this._prefix;
        else {
            console.error('Uninitialized character prefix.');
            return Character.Prefix.MX;
        }
    }
    set prefix(prefix: Character.Prefix) {
        this._prefix = prefix;
    }
    get firstName(): string {
        if (this._firstName != null) return this._firstName;
        else {
            console.error('Uninitialized character firstName.');
            return '';
        }
    }
    set firstName(firstName: string) {
        this._firstName = firstName;
    }
    get lastName(): string {
        if (this._lastName != null) return this._lastName;
        else {
            console.error('Uninitialized character lastName.');
            return '';
        }
    }
    set lastName(lastName: string) {
        this._lastName = lastName;
    }
    get balance(): number {
        if (this._balance != null) return this._balance;
        else {
            console.error('Uninitialized character balance');
            return 0;
        }
    }
    set balance(balance: number) {
        this._balance = balance;
    }

    public async load(characterId: string) {
        try {
            let snap = await Character.db.child(characterId).once('value');
            let data = snap.val() as Character.Data;
            this._id = characterId;
            this.populateData(data);
        }
        catch (error) {
            console.error('Failed to load character.');
        }
    }

    /** Creates a character entry in the database for the first time. */
    public async create(data: Character.Data) {
        try {
            this._id = (await Character.db.push(data)).key;
            this.populateData(data);
        }
        catch (error) {
            console.error('Failed to create character.');
        }
    }

    public getFullName(): string {
        return this.prefix + ' ' + this.firstName + ' ' + this.lastName;
    }

    private populateData(data: Character.Data) {
        this.prefix = data.prefix;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.balance = data.balance;
    }
}
export namespace Character {
    export interface Data {
        prefix: Prefix;
        firstName: string;
        lastName: string;
        balance: number;
    }

    export const INITIAL_BALANCE = 1000000;

    export enum Prefix {
        MR = 'Mr.',
        MS = 'Ms.',
        MX = 'Mx.'
    }
}
export class User {
    static db: firebase.database.Reference = dbRoot.child('user');
    public characterId: any | null = null;
    private _googleUser: firebase.User | null = null;

    /** Login and set character id if exists */
    public async login(): Promise<null | Error> {
        try {
            this._googleUser = (await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())).user;
            if (this._googleUser == null) return new Error('Could not get google user.');
            else {
                let snap = await User.db.child(this._googleUser.uid).child('characterId').once('value');
                if (snap.exists()) this.characterId = snap.val();
                return null;
            }
        }
        catch (error) {
            return error;
        }
    }

    /** Registers a new user with characterId foreign key */
    public async register(characterId: string): Promise<null | Error> {
        try {
            this.characterId = characterId;
            if (this._googleUser != null) {
                await User.db.child(this._googleUser.uid).set({
                    characterId: this.characterId
                });
            }
            return null;
        }
        catch (error) {
            return error;
        }
    }
}