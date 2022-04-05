// import initializeApp from firebase
import { initializeApp, FirebaseApp } from 'firebase/app'
import { getAuth, GithubAuthProvider } from 'firebase/auth'

// import database
import { getDatabase, Database } from 'firebase/database'

// type import
import type { Auth } from 'firebase/auth'

// sets config
const firebaseConfig = {
    apiKey: 'AIzaSyBn1UILO8jnQ-MsTIdlzlTgPz-_7lscsqw',
    authDomain: 'niloodev-full-stack-task-app.firebaseapp.com',
    projectId: 'niloodev-full-stack-task-app',
    storageBucket: 'niloodev-full-stack-task-app.appspot.com',
    messagingSenderId: '782847110207',
    appId: '1:782847110207:web:3073c6c14cfaf25b235c8a',
    measurementId: 'G-EZLLS83HPL',
}

// initializeApp on firebase checking if other instance exists
export const GithubProvider = new GithubAuthProvider()

export const initializedApp: FirebaseApp = initializeApp(firebaseConfig)
export const initializedDatabase: Database = getDatabase(initializedApp)
export const initializedAuth: Auth = getAuth(initializedApp)