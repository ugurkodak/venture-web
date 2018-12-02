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

    public async login(): Promise<null | string> {
        let provider = new firebase.auth.GoogleAuthProvider();
        this._googleUser = (await firebase.auth().signInWithPopup(provider)).user;
        if (this._googleUser == null) return 'Could not complete google authentication.';
        else {
            let snap = await this._database.child(this._googleUser.uid).child('characterId').once('value');
            if (snap.exists) this.characterId = snap.val();
        }
        return null;
    }
    
    public async register(characterId: string): Promise<null | string> {
        this.characterId = characterId;
        if (this._googleUser != null) {
            try {
                await this._database.child(this._googleUser.uid).set({
                    characterId: this.characterId
                });
            }
            catch {
                return 'Could not add user.';
            }
            return null;
        }
        else return 'Could not register. User not logged in';
    }
}