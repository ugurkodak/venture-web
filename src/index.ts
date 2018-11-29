import firebase from 'firebase/app';
import 'firebase/database';
import * as io from './io';
import { User } from './user';

const version = 'v0.1';

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

(async () => {
    io.printLogo(version);
    await io.prompt('Press return to start...');
    await init();
})();

async function init() {
    enum Action {
        LOGIN = 'Login',
        REGISTER = 'Register',
        ABOUT = 'About',
        EXIT = 'Exit'
    }
    let action = await io.prompt([Action.LOGIN, Action.REGISTER, Action.ABOUT, Action.EXIT], true);
    switch (action) {
        case Action.LOGIN: {
            await login();
            break;
        }
        case Action.REGISTER: {
            await register();
            break;
        }
        case Action.ABOUT: {
            io.printWithMargin('©2018 Ugur Kodak');
            await init();
            break;
        }
        case Action.EXIT: {
            io.printWithMargin('You can exit anytime by closing the browser tab.');
            await init();
            break;
        }
        default: {
            await init();
            break;
        }
    }
}

async function register() {
    let registirationError = await user.register(await io.prompt('Please type username...'));
    if (registirationError == null) {
        io.print('Success.');
    } else {
        io.printError(registirationError);
        await init();
    }
}

async function login() {
    let loginError = await user.login(await io.prompt('Please type username...'));
    if (loginError == null) {
        io.print('Success.');
    } else {
        io.printError(loginError);
        await init();
    }
}
