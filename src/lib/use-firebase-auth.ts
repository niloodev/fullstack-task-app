/* eslint @typescript-eslint/no-explicit-any: "off" */

// here we will create a hook state, it will be used as tracker of session state
import { useEffect, useState } from 'react'

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

    useEffect(() => {
        const del = AuthObj.onAuthStateChanged(authStateChanged)
        return () => del()
    }, [])

    const signInEmailAndPassword = (email: string, password: string) => {
        setPersistence(AuthObj, browserSessionPersistence).then(() => {
            return signInUserEmail(AuthObj, email, password)
        })
    }

    const createUserWithEmailAndPassword = (
        email: string,
        password: string,
        user: string
    ) =>
        createUser(AuthObj, email, password).then(userCredential => {
            set(ref(DbObj, 'users/' + userCredential.user.uid), {
                user: user,
                toDo: [],
            })
        })

    const signOut = () => {
        sOut(AuthObj).then(() => clear())
    }

    return {
        authUser,
        signInEmailAndPassword,
        createUserWithEmailAndPassword,
        signOut,
    }
}
