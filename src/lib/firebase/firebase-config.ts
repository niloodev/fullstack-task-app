// Import from Firebase
import { initializeApp, FirebaseApp } from 'firebase/app'
import { getAuth, GithubAuthProvider } from 'firebase/auth'
import { getDatabase, Database } from 'firebase/database'

// Type import.
import type { Auth } from 'firebase/auth'

// Sets config.
console.log(JSON.parse(process.env['FIREBASE_CONFIG'] || '{}'))
const firebaseConfig = JSON.parse(process.env['FIREBASE_CONFIG'] || '{}')

// Export all new instances to application.
export const GithubProvider = new GithubAuthProvider()

export const initializedApp: FirebaseApp = initializeApp(firebaseConfig)
export const initializedDatabase: Database = getDatabase(initializedApp)
export const initializedAuth: Auth = getAuth(initializedApp)

console.log(process.env['RECAPTCHA_KEY'] || '')
export const reCaptchaKey = process.env['RECAPTCHA_KEY'] || ''
