import firebase from 'firebase/app';
import 'firebase/database';
import * as io from './io';
import * as User from './user';

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
let user = new User.User(databaseRef);

(async () => {
    io.printLogo(version);
    await io.prompt('Press return to start...');
    test_prompt();
    // await init();
})();

async function test_prompt() {
    enum Option {
        One = 'One',
        Two = 'Two',
        Three = 'Three'
    }
    io.print('Input: ' + (await io.newprompt(Object.values(Option))));
    io.print('Input: ' + (await io.newprompt('Type something.')));
    io.print('Input: ' + (await io.newprompt('Yes or No', true)));
    io.print('Input: ' + (await io.newprompt('Type something lowercase', false, true)));
    io.print('Input: ' + (await io.newprompt('Type "antidisestablishmentarianism"', false, false, (input) => {
        return (input != 'antidisestablishmentarianism') ? 'You typed something else' : null;
    })));
}

async function init() {
    enum Option {
        LOGIN = 'Login',
        ABOUT = 'About',
        EXIT = 'Exit'
    }
    let option = await io.newprompt(Object.values(Option));
    // let option = await io.prompt(Object.values(Option), true);
    switch (option) {
        case Option.LOGIN: {
            await login();
            break;
        }
        case Option.ABOUT: {
            io.printWithMargin('©2018 Ugur Kodak');
            await init();
            break;
        }
        case Option.EXIT: {
            io.printWithMargin('You can exit anytime by closing the browser tab.');
            await init();
            break;
        }
        default: {
            io.printWithMargin('Please choose from options provided.');
            await init();
            break;
        }
    }
}

async function register() {
    io.printWithMargin('--Registration--');
    let confirmName = false;
    while (!confirmName) {
        let firstName = await io.prompt('Please enter first name for your character...', true);
        let lastName = await io.prompt('Please enter last name for your character...', true);
        io.print('You name will be "' + firstName + ' ' + lastName + '"');
        if (await io.prompt(['Yes', 'No'], true) == 'Yes') confirmName = true;
    }
    io.print('Lets review this prompt.');
}

async function login() {
    let error = await user.login();
    if (error != null) io.printError(error);
    else {
        io.print('Login successful');
        if (user.data == null) await register();
        else await overview();
    }
}

// async function characterCreation() {
//     print()
//     await io.prompt('Please ');
// }

async function overview() {
    io.print('OVERVIEW');
}

// function validateName(name: string): null | string {
//     for (var i = 0; i < name.length; i++) if (name.charAt(i) == ' ') return 'Name contains white space';
//     if (name.length < 4) return 'Name is fewer than 4 characters.';
//     return null;
// }