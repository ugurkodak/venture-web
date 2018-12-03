import firebase from 'firebase/app';
import 'firebase/auth';

export class Character {
    public id: string | null;
    public data: Character.Data | null;
    private _database: firebase.database.Reference;

    constructor(databaseRootReference: firebase.database.Reference) {
        this._database = databaseRootReference.child('character');
        this.id = null;
        this.data = null;
    }

    public async load(characterId: string): Promise<null | Error> {
        try {
            let snap = await this._database.child(characterId).once('value');
            this.data = snap.val();
            this.id = characterId;
            return null;
        }
        catch (error) {
            return error;
        }
    }

    /** Creates a character entry in the database for the first time. */
    public async create(data: Character.Data): Promise<null | Error> {
        try {
            this.data = data;
            this.id = (await this._database.push(data)).key;
            return null;
        }
        catch (error) {
            return error;
        }
    }
}

export namespace Character {
    export interface Data {
        prefix: Prefix;
        firstName: string;
        lastName: string;
    }

    export enum Prefix {
        MR = 'Mr.',
        MS = 'Ms.',
        MX = 'Mx.'
    }
}