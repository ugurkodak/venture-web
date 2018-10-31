import firebase from 'firebase/app';
import 'firebase/database';
import * as io from './io';
import { User } from './user';

export enum Action {
    Login = 'Login',
    Register = 'Register',
    About = 'About',
    Exit = 'Exit'
}

//Initialize Firebase
const app = firebase.initializeApp({
    apiKey: "AIzaSyAO8agjt4l-vPGeHR85RteTU65Eq229p00",
    authDomain: "venture-196117.firebaseapp.com",
    databaseURL: "https://venture-196117.firebaseio.com",
    projectId: "venture-196117",
    storageBucket: "venture-196117.appspot.com",
    messagingSenderId: "356906761499"
});

const databaseRef = app.database().ref();
let user = new User(databaseRef);
io.print(' __      __        _');
io.print(' \\ \\    / /       | |                 ');
io.print('  \\ \\  / /__ _ __ | |_ _   _ _ __ ___ ');
io.print('   \\ \\/ / _ \\ \'_ \\| __| | | | \'__/ _ \\');
io.print('    \\  /  __/ | | | |_| |_| | | |  __/');
io.print('     \\/ \\___|_| |_|\\__|\\__,_|_|  \\___|');
io.print(' ');
io.print(' ');

io.prompt('Press return to start...', input => {
    io.promptActions([Action.Login, Action.Register, Action.About], action => {
        switch (action) {
            case Action.Login: {
                //PromptAsync
                break;
            }
            case Action.Register: {
                io.print('Register selected');
                break;
            }
            case Action.About: {
                io.print('About selected');
                break;
            }
            default: {
                //TODO: Log
                return 'Undefined.';
            }
        }
        return null;
    });
    return null;
});