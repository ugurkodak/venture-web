// import firebase from 'firebase/app';
// import 'firebase/database';
// import * as io from './io';
// import { User } from './user';
// import { Character } from './character';
// import { City } from './city';

import { UI } from './ui';

let ui = new UI();

(async () => {
    ui.openForm(UI.Form.MAIN_MENU);
})();

// const version = 'v0.1';
// const app = firebase.initializeApp({
//     apiKey: "AIzaSyAO8agjt4l-vPGeHR85RteTU65Eq229p00",
//     authDomain: "venture-196117.firebaseapp.com",
//     databaseURL: "https://venture-196117.firebaseio.com",
//     projectId: "venture-196117",
//     storageBucket: "venture-196117.appspot.com",
//     messagingSenderId: "356906761499"
// });
// const databaseRef = app.database().ref();

// let user = new User(databaseRef);
// let character = new Character(databaseRef);
// let city = new City(databaseRef);

// (async () => {
//     io.printLogo(version);
//     await io.prompt('Press return to start...');
//     city.create();

//     //Print Lots
//     io.print('-- Lots --');
//     let lots: string[][] = [];
//     city.lots.forEach(l => {
//         lots.push([l.number.toString(), io.formatCurrency(l.value)]);
//     });
//     io.printTable(['Number', 'Price'], lots);
//     // await init();
// })();

// async function init() {
//     enum Option {
//         LOGIN = 'Login',
//         ABOUT = 'About',
//         EXIT = 'Exit'
//     }
//     let option = await io.promptOptions(Object.values(Option));
//     switch (option) {
//         case Option.LOGIN: {
//             await login();
//             break;
//         }
//         case Option.ABOUT: {
//             io.printWithMargin('©2018 Ugur Kodak');
//             await init();
//             break;
//         }
//         case Option.EXIT: {
//             io.printWithMargin('You can exit anytime by closing the browser tab.');
//             await init();
//             break;
//         }
//         default: {
//             io.printError(new Error('Unexpected input.'));
//             break;
//         }
//     }
// }

// async function register() {
//     io.clear();
//     io.printWithMargin('-- Registration --');
//     let firstName = io.toProperCase(await io.prompt('Please enter first name for your character...', validateName));
//     let lastName = io.toProperCase(await io.prompt('Please enter last name for your character...', validateName));
//     let prefix = io.toProperCase(await io.promptOptions(Object.values(Character.Prefix), 'Please select a prefix for your character...'));
//     if (!(await io.promptPolar('You name will be "' + prefix + ' ' + firstName + ' ' + lastName + '"?'))) await register();
//     else {
//         await character.create({
//             firstName: firstName,
//             lastName: lastName,
//             prefix: prefix as Character.Prefix,
//             balance: Character.INITIAL_BALANCE
//         });
//         //TODO: this error checkings will go away
//         let userRegistrationError = await user.register(character.id);
//         if (userRegistrationError != null) io.printError(userRegistrationError)
//         else {
//             io.print('Registration successful.');
//             await overview();
//         }
//     }

//     function validateName(name: string): null | string {
//         for (var i = 0; i < name.length; i++) if (name.charAt(i) == ' ') return 'Name contains white space';
//         return name.length < 2 ? 'Name is fewer than 2 characters.' : null;
//     }
// }

// async function login() {
//     let loginError = await user.login();
//     if (loginError != null) io.printError(loginError);
//     else {
//         io.print('Login successful');
//         if (user.characterId == null) await register();
//         else {
//             let characterError = await character.load(user.characterId);
//             if (characterError == null) await overview();
//             else io.printError(characterError);
//         }
//     }
// }

// async function overview() {
//     io.clear();
//     io.print('-- Overview --');
//     io.print(character.getFullName());
//     io.print('Balance: ' + io.formatCurrency(character.balance));
// }

// // async function test_prompt() {
// //     enum Option {
// //         One = 'One',
// //         Two = 'Two',
// //         Three = 'Three'
// //     }
// //     io.print('Input: ' + (await io.prompt('Type something.')));
// //     io.print('Input: ' + (await io.promptPolar('Yes or No?')));
// //     io.print('Input: ' + (await io.promptOptions(Object.values(Option))));
// //     io.print('Input: ' + (await io.prompt('Type "antidisestablishmentarianism"', (input) => {
// //         return (input != 'antidisestablishmentarianism') ? 'You typed something else' : null;
// //     })));
// // }