import firebase from 'firebase/app';
//import 'firebase/auth';

export class User {
    public name: string | null;
    private _database: firebase.database.Reference;

    constructor(databaseReferance: firebase.database.Reference) {
        this.name = null;
        this._database = databaseReferance;
    }

    public async login(userName: string): Promise<null | string> {
        let usersRef = this._database.child('user');
        let user = await usersRef.orderByValue().equalTo(userName).once('value');
        if (user.exists()) {
            this.name = userName;
            console.log('New login: ' + user.val());
            return null;
        }
        else {
            return 'User not found.';
        }
    }

    public async register(userName: string): Promise<null | string> {
        let validationError = this.validateUsername(userName);
        if (validationError == null) {
            let usersRef = this._database.child('user');
            let userCheck = await usersRef.orderByValue().equalTo(userName).once('value');
            if (userCheck.exists()) {
                return 'User exists.';
            }
            else {
                let user = await usersRef.push(userName);
                this.name = userName;
                console.log('New registeree: ' + userName);
                return null;
            }
        }
        else
            return validationError;
    }

    private validateUsername(username: string): null | string {
        for (var i = 0; i < username.length; i++) {
            if (username.charAt(i) == ' ')
                return 'Username contains white space';
        }
        if (username.length < 4)
            return 'Username is fewer than 4 characters.';
        return null;
    }
}