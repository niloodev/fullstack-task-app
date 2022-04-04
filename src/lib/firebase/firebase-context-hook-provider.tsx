/* eslint @typescript-eslint/no-explicit-any: "off" */
import React from 'react'
import type { PropsWithChildren, ReactNode } from 'react'

// import createContext to create, useContext to export context as hook
import { createContext, useContext } from 'react'
import useFirebaseAuth from '../firebase/firebase-custom-hook'

// create AuthUserContext format
// empty functions are just templates, make typescript consider it in syntax
const AuthUserContext = createContext({
    authUser: 'waiting',
    authError: '',
    isLoading: false,
    signInEmailAndPassword: (email: string, password: string) => {
        return { email, password }
    },
    createUserWithEmailAndPassword: (
        email: string,
        password: string,
        user: string
    ) => {
        return { email, password, user }
    },
    signInWithGithub: () => {
        return
    },
    signOut: () => {
        return
    },
})

// export custom provider to auth informations.
export function AuthUserProvider(
    props: PropsWithChildren<ReactNode | undefined>
) {
    const auth = useFirebaseAuth()

    return (
        <AuthUserContext.Provider value={auth as any}>
            {props.children}
        </AuthUserContext.Provider>
    )
}

export const useAuth = () => useContext(AuthUserContext)
