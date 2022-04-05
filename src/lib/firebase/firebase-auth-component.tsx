/* eslint @typescript-eslint/no-explicit-any: "off" */

import React from 'react'

// here we will create a hook state, it will be used as tracker of session state
import { useEffect } from 'react'

// notistack definitions hook from notistack-def.ts
import useNotistack from '../../tools/notistack-custom-hook'

// import of firebase-config, instantiated getAuth() and getDatabase() linked to application
import {
    initializedAuth as AuthObj,
    initializedDatabase as DataObj,
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
    UserCredential,
    User,
} from 'firebase/auth'

// database functions
import { update, ref } from 'firebase/database'

// firebase errors | .code to string
import firebaseErrors from './firebase-error-translator'
import type { FilterUser } from '../redux/store-initial-state'

// get redux selector and other react-redux related components
import { useDispatch } from 'react-redux'
import {
    setAuthUser,
    setIsLoading,
    setAuthFunctions,
} from '../redux/actions/action'

// filterAuthUser to frontend
const filterAuthUser = (user: User): FilterUser => ({
    uid: user.uid,
    email: user.email,
})

// export state function
export default function FirebaseAuth() {
    // get states from redux, to update in this component
    const dispatch = useDispatch()

    // to alert errors
    const { queueSnackbar } = useNotistack()

    // clear state
    const clear = () => {
        dispatch(setAuthUser(null))
    }

    // function that will be called everytime AuthState changes
    const authStateChanged = (authState: any) => {
        if (!authState) {
            dispatch(setAuthUser(null))
            return
        }

        var formattedUser = filterAuthUser(authState)
        dispatch(setAuthUser(formattedUser))
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
            dispatch(setIsLoading(true))
            // signs in
            return signInUserEmail(AuthObj, email, password)
                .then(() => {
                    // notifies success
                    queueSnackbar('Logged in', 'success', 'top', 'center')
                    // defines loading
                    dispatch(setIsLoading(false))
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
                    dispatch(setIsLoading(false))
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
        dispatch(setIsLoading(true))
        createUser(AuthObj, email, password)
            .then((userCredential: UserCredential) => {
                // update user name (creates if it not exists)
                update(ref(DataObj, 'user/' + userCredential.user.uid), {
                    userName: user,
                })
                // uodate user name on realtime database
                queueSnackbar('Logged in', 'success', 'top', 'center')
                // defines loading
                dispatch(setIsLoading(false))
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
                dispatch(setIsLoading(false))
            })
    }

    ///////////////////////////// signs out
    const signOut = () => {
        // defines loading
        dispatch(setIsLoading(true))
        sOut(AuthObj).then(() => {
            clear()
            // notifies logout
            queueSnackbar('Logged out', 'warning', 'top', 'center')
            // defines loading
            dispatch(setIsLoading(false))
        })
    }

    const signInWithGithub = () => {
        dispatch(setIsLoading(true))
        signInWithPopup(AuthObj, GithubProvider)
            .then((userCredential: UserCredential) => {
                // update user name (creates if it not exists)
                update(ref(DataObj, 'user/' + userCredential.user.uid), {
                    userName: userCredential.user.displayName,
                })
                // notifies success
                queueSnackbar('Logged in', 'success', 'top', 'center')
                // defines loading
                dispatch(setIsLoading(false))
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
                dispatch(setIsLoading(false))
            })
    }

    // dispatch all event triggers
    dispatch(
        setAuthFunctions({
            signInEmailAndPassword,
            createUserWithEmailAndPassword,
            signOut,
            signInWithGithub,
        })
    )

    return <></>
}
