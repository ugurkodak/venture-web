import firebase from 'firebase/app';
import 'firebase/auth';

export class Character {
    private _database: firebase.database.Reference;
    private _id: string | null;
    private _prefix: Character.Prefix | null;
    private _firstName: string | null;
    private _lastName: string | null;
    private _balance: number | null;
    
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

    constructor(databaseRootReference: firebase.database.Reference) {
        this._id = null;
        this._prefix = null;
        this._firstName = null;
        this._lastName = null;
        this._balance = null;
        this._database = databaseRootReference.child('character');
    }

    public async load(characterId: string): Promise<void> {
        try {
            let snap = await this._database.child(characterId).once('value');
            let data = snap.val() as Character.Data;
            this._id = characterId;
            this.populateData(data);
        }
        catch (error) {
            console.error('Failed to load character.');
        }
    }

    /** Creates a character entry in the database for the first time. */
    public async create(data: Character.Data): Promise<void> {
        try {
            this._id = (await this._database.push(data)).key;
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
    export const INITIAL_BALANCE = 1000000;

    export interface Data {
        prefix: Prefix;
        firstName: string;
        lastName: string;
        balance: number;
    }

    export enum Prefix {
        MR = 'Mr.',
        MS = 'Ms.',
        MX = 'Mx.'
    }
}