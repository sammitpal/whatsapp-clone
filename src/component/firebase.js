import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCpzG6QLUnr76bFY4nuiT4M7FAjq24nT6k",
    authDomain: "whatsapp-fabc3.firebaseapp.com",
    databaseURL: "https://whatsapp-fabc3.firebaseio.com",
    projectId: "whatsapp-fabc3",
    storageBucket: "whatsapp-fabc3.appspot.com",
    messagingSenderId: "901602140653",
    appId: "1:901602140653:web:c44574761d4d6fa1ecc7e4",
    measurementId: "G-CZ085RN01Q"
}
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

export {auth, db};