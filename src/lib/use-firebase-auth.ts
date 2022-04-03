/* eslint @typescript-eslint/no-explicit-any: "off" */

// here we will create a hook state, it will be used as tracker of session state
import { useEffect, useState } from 'react'

// notistack definitions hook from notistack-def.ts
import useNotistack from '../tools/notistack-custom-hook'

// import of firebase-config, instantiated getAuth() and getDatabase() linked to application
import {
    initializedAuth as AuthObj,
    initializedDatabase as DbObj,
    GithubProvider,
} from './firebase-config'

// some of the auth functions provided by auth module of firebase application
import {
    createUserWithEmailAndPassword as createUser,
    signInWithEmailAndPassword as signInUserEmail,
    signOut as sOut,
    signInWithPopup,
    setPersistence,
    browserSessionPersistence,
} from 'firebase/auth'

// firebase errors | .code to string
import firebaseErrors from './firebase-error-translator'

// firebase database ref and set's
import { ref, set } from 'firebase/database'

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
    // set loading
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // to alert errors
    const { queueSnackbar } = useNotistack()

    // clear state
    const clear = () => {
        setAuthUser(null)
    }

    // function that will be called everytime AuthState changes
    const authStateChanged = (authState: any) => {
        if (!authState) {
            setAuthUser(null)
            return
        }

        var formattedUser = filterAuthUser(authState)
        setAuthUser(formattedUser)
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
            // defines loading
            setIsLoading(true)
            // signs in
            return signInUserEmail(AuthObj, email, password)
                .then(() => {
                    // notifies success
                    queueSnackbar('Logged in', 'success', 'top', 'center')
                    // defines loading
                    setIsLoading(false)
                })
                .catch(err => {
                    // if error, alerts notistack-def.ts to create a snackbar
                    queueSnackbar(
                        firebaseErrors[err.code as keyof typeof firebaseErrors],
                        'error',
                        'top',
                        'center'
                    )
                    // defines loading
                    setIsLoading(false)
                })
        })
    }

    ///////////////////////////// create user with password, sets userName on dynamic database after it
    const createUserWithEmailAndPassword = (
        email: string,
        password: string,
        user: string
    ) => {
        // defines loading
        setIsLoading(true)
        createUser(AuthObj, email, password)
            .then(userCredential => {
                set(ref(DbObj, 'users/' + userCredential.user.uid), {
                    user: user,
                })

                // notifies success
                queueSnackbar('Logged in', 'success', 'top', 'center')
                // defines loading
                setIsLoading(false)
            })
            .catch(err => {
                // if error, alerts notistack-def.ts to create a snackbar
                queueSnackbar(
                    firebaseErrors[err.code as keyof typeof firebaseErrors],
                    'error',
                    'top',
                    'center'
                )
                // defines loading
                setIsLoading(false)
            })
    }

    ///////////////////////////// signs out
    const signOut = () => {
        // defines loading
        setIsLoading(true)
        sOut(AuthObj).then(() => {
            clear()

            // notifies logout
            queueSnackbar('Logged out', 'warning', 'top', 'center')
            // defines loading
            setIsLoading(false)
        })
    }

    const signInWithGithub = () => {
        setIsLoading(true)
        signInWithPopup(AuthObj, GithubProvider)
            .then(() => {
                // notifies success
                queueSnackbar('Logged in', 'success', 'top', 'center')
                // defines loading
                setIsLoading(false)
            })
            .catch(err => {
                // if error, alerts notistack-def.ts to create a snackbar
                queueSnackbar(
                    firebaseErrors[err.code as keyof typeof firebaseErrors],
                    'error',
                    'top',
                    'center'
                )
                // defines loading
                setIsLoading(false)
            })
    }

    return {
        authUser,
        isLoading,
        signInEmailAndPassword,
        createUserWithEmailAndPassword,
        signInWithGithub,
        signOut,
    }
}