/* eslint @typescript-eslint/no-explicit-any: "off" */

// here we will create a hook state, it will be used as tracker of session state
import { useEffect, useState } from 'react'
import fireApp from './firebase-config'

import { getAuth } from 'firebase/auth'
console.log(fireApp)

// declare filterUser interface type
interface filterUser {
    uid: string
    email: string
    toDo: []
}

// filterAuthUser to frontend
const filterAuthUser = (user: any) => ({
    uid: user.uid,
    email: user.email,
    toDo: user.toDo,
})

// export state function
export default function useFirebaseAuth() {
    // set states
    const [authUser, setAuthUser] = useState<filterUser | null>(null)
    const [loading, setLoading] = useState(true)

    // function that will be called everytime AuthState changes
    const authStateChanged = (authState: any) => {
        if (!authState) {
            setAuthUser(null)
            setLoading(false)
            return
        }

        setLoading(true)
        var formattedUser = filterAuthUser(authState)
        setAuthUser(formattedUser)
        setLoading(false)
    }

    // works as a DidComponentMount, and returns a dismount.
    useEffect(() => {
        const unsubscribe =
            getAuth(fireApp).onAuthStateChanged(authStateChanged)
        return () => unsubscribe()
    }, [])

    return { authUser, loading }
}
