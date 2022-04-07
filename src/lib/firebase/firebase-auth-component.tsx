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
} from 'firebase/auth'

// database functions
import { update, ref, get, onValue, DataSnapshot } from 'firebase/database'

// firebase errors | .code to string
import firebaseErrors from './firebase-error-translator'
import type { FilterAuth } from '../redux/store-initial-state'

// get redux selector and other react-redux related components
import { useDispatch } from 'react-redux'
import {
    setAuthUser,
    setIsLoading,
    setAuthFunctions,
    setUserInfo,
} from '../redux/actions/action'

// filterAuthUser to frontend
const filterAuthUser = (user: any): FilterAuth => ({
    uid: user.uid,
    email: user.email,
})

// export state function
export default function FirebaseAuth() {
    // get states from redux, to update in this component
    const dispatch = useDispatch()
    let unsubscribe: () => void | undefined

    // to alert errors
    const { queueSnackbar } = useNotistack()

    // on component did mount, create functions constants and dispatch it to redux
    useEffect(() => {
        // function that will be called everytime AuthState changes, by firebase own event trigger
        const authStateChanged = (authState: any) => {
            if (!authState) {
                dispatch(setAuthUser(null))
                return
            }

            // now we will set some listeners to update client user info based on realtime database
            // the auth will be in state.auth, and user info in state.user
            // this is a good practice since firebase provides auth and user in different locations too.
            const userRef = ref(DataObj, 'user/' + authState.uid)
            // get first snapshot, and dispatch it
            get(userRef).then(snapshot => {
                if (snapshot.exists()) {
                    const val = snapshot.val()
                    dispatch(setUserInfo({ userName: val.userName }))
                }
            })
            // sets listener to changes in this user info (realtime database)
            // unsubscribe is a variable that is defined outside this scope, its used to
            // store the "remove listener" function
            unsubscribe = onValue(userRef, (snapshot: DataSnapshot) => {
                if (snapshot.exists()) {
                    const val = snapshot.val()
                    dispatch(setUserInfo({ userName: val.userName }))
                }
            })

            // filter user info (get only a few properties) and pass it to authUser
            var formattedUser = filterAuthUser(authState)
            dispatch(setAuthUser(formattedUser))
        }

        // initialize auth listener
        const del = AuthObj.onAuthStateChanged(authStateChanged)

        ///////////////////////////// clear state
        const clear = () => {
            if (unsubscribe) unsubscribe()
            dispatch(setAuthUser(null))
        }

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
                            firebaseErrors[
                                err.code as keyof typeof firebaseErrors
                            ],
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

        ///////////////////////////// signs with github
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

        return () => del()
    }, [])

    return <></>
}
