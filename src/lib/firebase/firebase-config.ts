// Import from Firebase
import { initializeApp, FirebaseApp } from 'firebase/app'
import { getAuth, GithubAuthProvider } from 'firebase/auth'
import { getDatabase, Database } from 'firebase/database'

// Type import.
import type { Auth } from 'firebase/auth'

// Sets config.
const firebaseConfig = JSON.parse(
    process.env['NEXT_PUBLIC_FIREBASE_CONFIG'] || '{}'
)

// Export all new instances to application.
export const GithubProvider = new GithubAuthProvider()

export const initializedApp: FirebaseApp = initializeApp(firebaseConfig)
export const initializedDatabase: Database = getDatabase(initializedApp)
export const initializedAuth: Auth = getAuth(initializedApp)

export const reCaptchaKey = process.env['NEXT_PUBLIC_RECAPTCHA_KEY'] || ''
