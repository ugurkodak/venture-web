// Character modelmap

export let id: string;
export let meta: ICharacterMeta;
//@ts-ignore
let _raw: ICharacterRaw | null;

export function init(id: string, meta: ICharacterMeta) {
    id = id;
    meta = meta;
    _raw = null;
}

export function getFullName(): string {
    return meta.prefix + ' ' + meta.firstName + ' ' + meta.lastName;
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