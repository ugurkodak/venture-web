// import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { IO } from './io';

// Initialize Firebase
// const app = firebase.initializeApp({
//     apiKey: "AIzaSyAO8agjt4l-vPGeHR85RteTU65Eq229p00",
//     authDomain: "venture-196117.firebaseapp.com",
//     databaseURL: "https://venture-196117.firebaseio.com",
//     projectId: "venture-196117",
//     storageBucket: "venture-196117.appspot.com",
//     messagingSenderId: "356906761499"
// });
//const database = app.database().ref();
let io = new IO();
io.welcome();