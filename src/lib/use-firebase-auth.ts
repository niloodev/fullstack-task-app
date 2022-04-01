/* eslint @typescript-eslint/no-explicit-any: "off" */

// here we will create a hook state, it will be used as tracker of session state
import { useEffect, useState } from 'react'

// notistack definitions hook from notistack-def.ts
import useNotistack from '../tools/notistack-def'

// import of firebase-config, instantiated getAuth() and getDatabase() linked to application
import {
    initializedAuth as AuthObj,
    initializedDatabase as DbObj,
} from './firebase-config'

// some of the auth functions provided by auth module of firebase application
import {
    createUserWithEmailAndPassword as createUser,
    signInWithEmailAndPassword as signInUserEmail,
    signOut as sOut,
    setPersistence,
    browserSessionPersistence,
} from 'firebase/auth'

// firebase errors | .code to string
import firebaseErrors from './firebase-error-translator'

// firebase database ref and set's
import { ref, set } from 'firebase/database'
//import type { FirebaseError } from 'firebase/app'

// declare filterUser interface type
interface filterUser {
    uid: string
    email: string
}

// filterAuthUser to frontend
const filterAuthUser = (user: any) => ({
    uid: user.uid,
    email: user.email,
})

// export state function
export default function useFirebaseAuth() {
    // set states
    const [authUser, setAuthUser] = useState<filterUser | null>(null)

    // to alert errors
    const { queueSnackbar } = useNotistack()

    // function that will be called everytime AuthState changes
    const authStateChanged = (authState: any) => {
        if (!authState) {
            setAuthUser(null)
            return
        }

        var formattedUser = filterAuthUser(authState)
        setAuthUser(formattedUser)
    }

    // clear state
    const clear = () => {
        setAuthUser(null)
    }

    // dispose event trigger
    useEffect(() => {
        const del = AuthObj.onAuthStateChanged(authStateChanged)
        return () => del()
    }, [])

    ///////////////////////////// sign in with email and password function
    const signInEmailAndPassword = (email: string, password: string) => {
        // setPersistence is used to make session stored in user current browser
        setPersistence(AuthObj, browserSessionPersistence).then(() => {
            // signs in
            return signInUserEmail(AuthObj, email, password)
                .then(() => {
                    // notifies success
                    queueSnackbar('Logged in', 'success', 'top', 'center')
                })
                .catch(err => {
                    // if error, alerts notistack-def.ts to create a snackbar
                    queueSnackbar(
                        firebaseErrors[err.code as keyof typeof firebaseErrors],
                        'error',
                        'top',
                        'center'
                    )
                })
        })
    }

    ///////////////////////////// create user with password, sets userName on dynamic database after it
    const createUserWithEmailAndPassword = (
        email: string,
        password: string,
        user: string
    ) =>
        createUser(AuthObj, email, password)
            .then(userCredential => {
                set(ref(DbObj, 'users/' + userCredential.user.uid), {
                    user: user,
                })

                // notifies success
                queueSnackbar('Logged in', 'success', 'top', 'center')
            })
            .catch(err => {
                // if error, alerts notistack-def.ts to create a snackbar
                queueSnackbar(
                    firebaseErrors[err.code as keyof typeof firebaseErrors],
                    'error',
                    'top',
                    'center'
                )
            })

    ///////////////////////////// signs out
    const signOut = () => {
        sOut(AuthObj).then(() => {
            clear()

            // notifies logout
            queueSnackbar('Logged out', 'warning', 'top', 'center')
        })
    }

    return {
        authUser,
        signInEmailAndPassword,
        createUserWithEmailAndPassword,
        signOut,
    }
}
