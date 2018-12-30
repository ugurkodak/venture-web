//** User modelmap */

export let id: string;
export let meta: IUserMeta;
//@ts-ignore
let _raw: IUserRaw | null;

export function init(id: string, meta: IUserMeta) {
    id = id;
    meta = meta;
    _raw = null;
}

//Modifiable data types stored in user document
export interface IUserMeta {
    characterId: string,
}

// Readonly data types stored in user document 
interface IUserRaw {

}