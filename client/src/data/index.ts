import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import * as user from './user';
import * as character from './character';
import * as city from './city';

//Export namespaces
export { user as User };
export { character as Character };
export { city as City };

export const database = firebase.initializeApp({
    apiKey: "AIzaSyAO8agjt4l-vPGeHR85RteTU65Eq229p00",
    authDomain: "venture-196117.firebaseapp.com",
    databaseURL: "https://venture-196117.firebaseio.com",
    projectId: "venture-196117",
    storageBucket: "venture-196117.appspot.com",
    messagingSenderId: "356906761499"
}).database().ref();

// Registers a character, all user registration is done by OAuth
export async function register(uid: string, characterMeta: character.ICharacterMeta): Promise<void> {
    try {
        let updates: any = {};
        let characterId = database.child('meta').child('character').push().key as string;
        updates['/meta/character/' + characterId] = characterMeta;
        let userMeta: user.IUserMeta = {
            characterId: characterId
        }
        updates['/meta/user/' + uid] = userMeta
        await database.update(updates);
        user.init(uid, userMeta);
        character.init(characterId, characterMeta);
        //TODO: Load city here
    }
    catch (error) {
        console.error(error);
    }
}

export async function login(): Promise<string | null> {
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
                user.init(googleUser.uid, userMeta);
                let characterInfo = (await database.child('meta').child('character').child(userMeta.characterId).once('value')).val() as character.ICharacterMeta;
                character.init(userMeta.characterId, characterInfo);
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