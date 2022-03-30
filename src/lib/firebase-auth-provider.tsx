/* eslint @typescript-eslint/no-explicit-any: "off" */

import React from 'react'
import type { PropsWithChildren, ReactNode } from 'react'

// import createContext to create, useContext to export context as hook
import { createContext, useContext } from 'react'
import useFirebaseAuth from './use-firebase-auth'

// create AuthUserContext format
const AuthUserContext = createContext({
    authUser: null,
    loading: false,
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
