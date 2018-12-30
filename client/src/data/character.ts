//** Character modelmap */
export default class Character {
    public id: string;
    public meta: ICharacterMeta;
    //@ts-ignore
    private _raw: ICharacterRaw | null;

    constructor(id: string, meta: ICharacterMeta) {
        this.id = id;
        this.meta = meta;
        this._raw = null;
    }

    public getFullName(): string {
        return this.meta.prefix + ' ' + this.meta.firstName + ' ' + this.meta.lastName;
    }
}

//Modifiable data types stored in character document
export interface ICharacterMeta {
    firstName: string;
    lastName: string;
    prefix: CharacterPrefix;
}

export enum CharacterPrefix {
    MR = 'Mr.',
    MS = 'Ms.',
    MX = 'Mx.'
}

// Readonly data types stored in character document 
interface ICharacterRaw {
    balance: number;
}