///////////////////////////////////// auth route protect wrapper

// I decided to transform the useEffect form of redirect in a wrapper, to make it easily applicable in all
// application pages.

// react import
import React, { PropsWithChildren, useState, useEffect } from 'react'

// from next
import { useRouter } from 'next/router'

// import auth state from redux
import { useSelector } from 'react-redux'

const RouteProtectWrapper = ({
    redirect = '/auth/login',
    ifAuthUser = 'unlogged',
    children,
}: PropsWithChildren<React.ReactNode> & {
    redirect: string
    ifAuthUser: 'logged' | 'unlogged' | 'waiting' | 'any'
}) => {
    // define isReady to control renderization
    const [isReady, setIsReady] = useState(false)
    // get user info
    const authUser = useSelector(state => state.auth.authUser)
    // get router
    const router = useRouter()

    useEffect(() => {
        if (authUser == 'waiting') return

        switch (ifAuthUser) {
            case 'logged':
                if (authUser) router.push(redirect)
                else setIsReady(true)
                return
                break
            case 'unlogged':
                if (!authUser) router.push(redirect)
                else setIsReady(true)
                return
                break
            case 'waiting':
                return
                break
        }
    }, [authUser])

    // conditional render
    return isReady ? <> {children} </> : <div></div>
}

export default RouteProtectWrapper
