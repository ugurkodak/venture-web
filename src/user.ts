import firebase from 'firebase/app';
import 'firebase/auth';

export class User {
    public characterId: any | null;
    private _googleUser: firebase.User | null;
    private _database: firebase.database.Reference;

    constructor(databaseRootReference: firebase.database.Reference) {
        this.characterId = null;
        this._googleUser = null;
        this._database = databaseRootReference.child('user');
    }

    public async login(): Promise<null | Error> {
        try {
            this._googleUser = (await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())).user;
            if (this._googleUser == null) return new Error('Could not get google user.');
            else {
                let snap = await this._database.child(this._googleUser.uid).child('characterId').once('value');
                if (snap.exists()) this.characterId = snap.val();
                return null;
            }
        }
        catch (error) {
            return error;
        }
    }
    
    public async register(characterId: string): Promise<null | Error> {
        try {
            this.characterId = characterId;
            if (this._googleUser != null) {
                await this._database.child(this._googleUser.uid).set({
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