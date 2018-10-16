import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Terminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';
// import xterm_css from 'xterm-css';

// Initialize Firebase
const app = firebase.initializeApp({
    apiKey: "AIzaSyAO8agjt4l-vPGeHR85RteTU65Eq229p00",
    authDomain: "venture-196117.firebaseapp.com",
    databaseURL: "https://venture-196117.firebaseio.com",
    projectId: "venture-196117",
    storageBucket: "venture-196117.appspot.com",
    messagingSenderId: "356906761499"
});

// Initialize terminal
Terminal.applyAddon(fit);
const terminal = new Terminal({ cursorBlink: true });
terminal.open(document.getElementById('terminal-container'));
fit.fit(terminal);
const ref = app.database().ref().child('text');

// Test
ref.on('value', function (snap) {
    return terminal.writeln(snap.val());
});
