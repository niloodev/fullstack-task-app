/* eslint @typescript-eslint/no-explicit-any: "off" */

// React import.
import React, { useEffect } from 'react'

// 🐸: Import of firebase-config, instantiated getAuth() and getDatabase() linked to application.
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check' // AppCheck ReCaptchaV3 provider.
import {
    initializedApp,
    initializedAuth as AuthObj,
    initializedDatabase as dataObj,
    reCaptchaKey,
} from './firebase-config'

// Database functions provided by Firebase.
import { ref, get, onValue, DataSnapshot } from 'firebase/database'

// Type of store-initial-state.ts
import type { FilterAuth } from '../redux/store-initial-state'

// Get Redux selector and other React and Redux related components.
import { useDispatch } from 'react-redux'
import { setAuthUser, setUserInfo } from '../redux/actions/action'

// Function to filter user information to send to global state of application.
const filterAuthUser = (user: any): FilterAuth => ({
    uid: user.uid,
    email: user.email,
})

export default function FirebaseAuth() {
    // Get states from Redux, to update in this component.
    const dispatch = useDispatch()
    let unsubscribe: () => void | undefined

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
                if (unsubscribe) unsubscribe()
                dispatch(setAuthUser(null))
                return
            }

            // 🐸: Now we will set some listeners to update client user info based on realtime database.
            // 🛑: The auth data will be in "state.auth", and user data in "state.user".
            // This is a good practice since Firebase provides auth and user informations in different locations too.
            const userRef = ref(dataObj, 'user/' + authState.uid)
            // Get first snapshot, and dispatch it.
            get(userRef).then(snapshot => {
                if (snapshot.exists()) {
                    const val = snapshot.val()
                    dispatch(
                        setUserInfo({
                            userName: val.userName,
                            tasks: val.tasks,
                            tasksList: val.tasksList,
                        })
                    )
                }
            })

            // 🐸: Sets listener to changes in user information.
            // The "unsubscribe" variable that is defined outside this scope, its used to store the "remove listener" function.
            unsubscribe = onValue(userRef, (snapshot: DataSnapshot) => {
                if (snapshot.exists()) {
                    const val = snapshot.val()
                    dispatch(
                        setUserInfo({
                            userName: val.userName,
                            tasks: val.tasks,
                            tasksList: val.tasksList,
                        })
                    )
                }
            })

            // Filter user information and dispatch it.
            var formattedUser = filterAuthUser(authState)
            dispatch(setAuthUser(formattedUser))
        }

        // Initialize auth listener.
        const del = AuthObj.onAuthStateChanged(authStateChanged)

        return () => del()
    }, [])

    return <></>
}
