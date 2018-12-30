//External imports
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

//Internal imports
import * as user from './user';
import * as character from './character';
import * as city from './city';

const database = firebase.initializeApp({
    apiKey: "AIzaSyAO8agjt4l-vPGeHR85RteTU65Eq229p00",
    authDomain: "venture-196117.firebaseapp.com",
    databaseURL: "https://venture-196117.firebaseio.com",
    projectId: "venture-196117",
    storageBucket: "venture-196117.appspot.com",
    messagingSenderId: "356906761499"
}).database().ref();

//Singleton data instance
class Data {
    private static _instance: Data;
    public user: user.default | null;
    public character: character.default | null;
    public city: city.default | null;

    constructor() {
        this.user = null;
        this.character = null;
        this.city = null;
    }

    static get(): Data {
        if (!Data._instance) {
            Data._instance = new Data();
        }
        return Data._instance;
    }

    public async register(uid: string, characterMeta: character.ICharacterMeta): Promise<void> {
        try {
            let updates: any = {};
            let characterId = database.child('meta').child('character').push().key as string;
            updates['/meta/character/' + characterId] = characterMeta;
            let userMeta: user.IUserMeta = {
                characterId: characterId
            }
            updates['/meta/user/' + uid] = userMeta
            await database.update(updates);
            this.user = new user.default(uid, userMeta);
            this.character = new character.default(characterId, characterMeta);
            //TODO: Load city here
        }
        catch (error) {
            console.error(error);
        }
    }

    public async login(): Promise<string | null> {
        try {
            let googleUser = (await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())).user;
            if (!googleUser) {
                console.error('Could not login user.');
                return null;
            }
            else {
                let userMeta = (await database.child('meta').child('user').child(googleUser.uid).once('value')).val() as user.IUserMeta;
                if (!userMeta) return googleUser.uid;
                else {
                    this.user = new user.default(googleUser.uid, userMeta);
                    let characterInfo = (await database.child('meta').child('character').child(userMeta.characterId).once('value')).val() as character.ICharacterMeta;
                    this.character = new character.default(userMeta.characterId, characterInfo);
                    return googleUser.uid;
                    //TODO: Load city here.
                }
            }
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
}

export function instance(): Data {
    return Data.get();
}

//Expose public types
export * from './user';
export * from './character';
export * from './city';