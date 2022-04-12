/* eslint @typescript-eslint/no-explicit-any: "off" */

// React import.
import React, { useEffect } from 'react'

// Notistack definitions hook from notistack-custom-hook.
import useNotistack from '../../tools/notistack-custom-hook'

// 🐸: Import of firebase-config, instantiated getAuth() and getDatabase() linked to application.
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check' // AppCheck ReCaptchaV3 provider.
import {
    initializedApp,
    initializedAuth as AuthObj,
    initializedDatabase as DataObj,
    reCaptchaKey,
    GithubProvider,
} from './firebase-config'

// Some of the auth functions provided by Firebase library.
import {
    createUserWithEmailAndPassword as createUser,
    signInWithEmailAndPassword as signInUserEmail,
    signOut as sOut,
    signInWithPopup,
    setPersistence,
    browserSessionPersistence,
    UserCredential,
} from 'firebase/auth'

// Database functions provided by Firebase.
import { update, ref, get, onValue, DataSnapshot } from 'firebase/database'

// Firebase errors translation | code to string.
import firebaseErrors from './firebase-error-translator'
import type { FilterAuth } from '../redux/store-initial-state'

// Get Redux selector and other React and Redux related components.
import { useDispatch } from 'react-redux'
import {
    setAuthUser,
    setIsLoading,
    setAuthFunctions,
    setUserInfo,
} from '../redux/actions/action'

// Function to filter user information to send to global state of application.
const filterAuthUser = (user: any): FilterAuth => ({
    uid: user.uid,
    email: user.email,
})

export default function FirebaseAuth() {
    // Get states from Redux, to update in this component.
    const dispatch = useDispatch()
    let unsubscribe: () => void | undefined

    // To alert errors.
    const { queueSnackbar } = useNotistack()

    // On mount (client-side) sets AppCheck from Firebase.
    useEffect(() => {
        initializeAppCheck(initializedApp, {
            provider: new ReCaptchaV3Provider(reCaptchaKey),
            isTokenAutoRefreshEnabled: true,
        })
    }, [])

    // On mount, create functions and dispatch it to Redux.
    useEffect(() => {
        // Function that will be called everytime AuthState changes, by Firebase own event trigger.
        const authStateChanged = (authState: any) => {
            if (!authState) {
                dispatch(setAuthUser(null))
                return
            }

            // 🐸: Now we will set some listeners to update client user info based on realtime database.
            // 🛑: The auth data will be in "state.auth", and user data in "state.user".
            // This is a good practice since Firebase provides auth and user informations in different locations too.
            const userRef = ref(DataObj, 'user/' + authState.uid)
            // Get first snapshot, and dispatch it.
            get(userRef).then(snapshot => {
                if (snapshot.exists()) {
                    const val = snapshot.val()
                    dispatch(setUserInfo({ userName: val.userName }))
                }
            })
            // 🐸: Sets listener to changes in user information.
            // The "unsubscribe" variable that is defined outside this scope, its used to store the "remove listener" function.
            unsubscribe = onValue(userRef, (snapshot: DataSnapshot) => {
                if (snapshot.exists()) {
                    const val = snapshot.val()
                    dispatch(setUserInfo({ userName: val.userName }))
                }
            })

            // Filter user information and dispatch it.
            var formattedUser = filterAuthUser(authState)
            dispatch(setAuthUser(formattedUser))
        }

        // Initialize auth listener.
        const del = AuthObj.onAuthStateChanged(authStateChanged)

        ///////////////////////////// Clear the state | this is called after SignOut mostly times.
        const clear = () => {
            if (unsubscribe) unsubscribe()
            dispatch(setAuthUser(null))
        }

        ///////////////////////////// Sign-in with email and password function.
        const signInEmailAndPassword = (email: string, password: string) => {
            // The "setPersistence" function is used to make session stored in the current browser.
            setPersistence(AuthObj, browserSessionPersistence).then(() => {
                // Sets loading.
                dispatch(setIsLoading(true))
                // Signs in.
                return signInUserEmail(AuthObj, email, password)
                    .then(() => {
                        // Notifies success.
                        queueSnackbar('Logged in', 'success', 'top', 'center')
                        // Sets loading.
                        dispatch(setIsLoading(false))
                    })
                    .catch(err => {
                        // If error, alerts notistack-custom-hook.ts to create an error snackbar.
                        queueSnackbar(
                            firebaseErrors[
                                err.code as keyof typeof firebaseErrors
                            ],
                            'error',
                            'top',
                            'center'
                        )
                        // Sets loading.
                        dispatch(setIsLoading(false))
                    })
            })
        }

        ///////////////////////////// Create user with password, sets "userName" on realtime database after it.
        const createUserWithEmailAndPassword = (
            email: string,
            password: string,
            user: string
        ) => {
            // Sets loading.
            dispatch(setIsLoading(true))
            // Creates the user. (This function creates and authenticate the user, without the needing to call sign-in function).
            createUser(AuthObj, email, password)
                .then((userCredential: UserCredential) => {
                    // Update user name (creates if it not exists).
                    update(ref(DataObj, 'user/' + userCredential.user.uid), {
                        userName: user,
                    })
                    // Notifies success.
                    queueSnackbar('Logged in', 'success', 'top', 'center')
                    // Sets loading.
                    dispatch(setIsLoading(false))
                })
                .catch(err => {
                    // If error, alerts notistack-custom-hook.ts to create an error snackbar.
                    queueSnackbar(
                        firebaseErrors[err.code as keyof typeof firebaseErrors],
                        'error',
                        'top',
                        'center'
                    )
                    // Sets loading.
                    dispatch(setIsLoading(false))
                })
        }

        ///////////////////////////// Sign-in with Github.
        const signInWithGithub = () => {
            // Sets loading.
            dispatch(setIsLoading(true))
            // Sign-in with popup.
            signInWithPopup(AuthObj, GithubProvider)
                .then((userCredential: UserCredential) => {
                    // Update user name (creates if it not exists).
                    update(ref(DataObj, 'user/' + userCredential.user.uid), {
                        userName: userCredential.user.displayName,
                    })
                    // Notifies success.
                    queueSnackbar('Logged in', 'success', 'top', 'center')
                    // Sets loading.
                    dispatch(setIsLoading(false))
                })
                .catch(err => {
                    // If error, alerts notistack-custom-hook.ts to create an error snackbar.
                    queueSnackbar(
                        firebaseErrors[err.code as keyof typeof firebaseErrors],
                        'error',
                        'top',
                        'center'
                    )
                    // Sets loading.
                    dispatch(setIsLoading(false))
                })
        }

        ///////////////////////////// Signs out.
        const signOut = () => {
            // Sets loading.
            dispatch(setIsLoading(true))
            // Signs out, and then call clear() function.
            sOut(AuthObj).then(() => {
                clear()
                // Notifies logout.
                queueSnackbar('Logged out', 'warning', 'top', 'center')
                // Sets loading.
                dispatch(setIsLoading(false))
            })
        }

        // Dispatch all authentication functions.
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
