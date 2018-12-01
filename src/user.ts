import firebase from 'firebase/app';
import 'firebase/auth';

export class User {
    public data: any | null;
    private _googleUser: firebase.User | null;
    private _database: firebase.database.Reference;

    constructor(databaseReference: firebase.database.Reference) {
        this.data = null;
        this._googleUser = null;
        this._database = databaseReference;
    }

    public async login(): Promise<null | string> {
        let provider = new firebase.auth.GoogleAuthProvider();
        this._googleUser = (await firebase.auth().signInWithPopup(provider)).user;
        if (this._googleUser == null) return 'Could not complete google authentication.';
        else {
            let snap = await this._database.child(this._googleUser.uid).once('value');
            if (snap.exists) this.data = snap.val();
        }
        return null;
    }
}