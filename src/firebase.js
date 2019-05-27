import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyBtDeA3umaEJlytm-qJ__cpiAYtB5aZCnc",
    authDomain: "gameone-a9e6c.firebaseapp.com",
    databaseURL: "https://gameone-a9e6c.firebaseio.com",
    projectId: "gameone-a9e6c",
    storageBucket: "gameone-a9e6c.appspot.com",
    messagingSenderId: "96378863397"
};
var fire = firebase.initializeApp(config);
export default fire;