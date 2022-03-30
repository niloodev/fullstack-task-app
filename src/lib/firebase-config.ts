// import initializeApp from firebase
import { initializeApp, FirebaseApp } from 'firebase/app'

// sets config
const FirebaseConfig = {
    apiKey: 'AIzaSyBn1UILO8jnQ-MsTIdlzlTgPz-_7lscsqw',
    authDomain: 'niloodev-full-stack-task-app.firebaseapp.com',
    projectId: 'niloodev-full-stack-task-app',
    storageBucket: 'niloodev-full-stack-task-app.appspot.com',
    messagingSenderId: '782847110207',
    appId: '1:782847110207:web:3073c6c14cfaf25b235c8a',
    measurementId: 'G-EZLLS83HPL',
}

// initializeApp on firebase checking if other instance exists
const initializedApp: FirebaseApp = initializeApp(FirebaseConfig)

export default initializedApp
