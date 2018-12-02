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

    public async load(characterId: string): Promise<null | string> {
        try {
            let snap = await this._database.child(characterId).once('value');
            this.data = snap.val();
            this.id = characterId;
            return null;
        }
        catch {
            return 'Could not load character data';
        }
    }

    public async create(data: Character.Data): Promise<null | string> {
        this.data = data;
        this.id = (await this._database.push(data)).key;
        return (this.id == null) ? 'Failed to create character' : null;
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