//** User modelmap */
export default class User {
    public id: string;
    public meta: IUserMeta;
    //@ts-ignore
    private _raw: IUserRaw | null;

    constructor(id: string, meta: IUserMeta) {
        this.id = id;
        this.meta = meta;
        this._raw = null;
    }
}

//Modifiable data types stored in user document
export interface IUserMeta {
    characterId: string,
}

// Readonly data types stored in user document 
interface IUserRaw {

}