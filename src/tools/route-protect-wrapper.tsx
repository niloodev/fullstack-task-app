// Route Protect Wrapper

// I decided to transform the "useEffect" form of redirect in a wrapper, to make it easily applicable in all
// application pages.

// React import.
import React, { PropsWithChildren, useState, useEffect } from 'react'

// From Next.
import { useRouter } from 'next/router'

// Get hook of redux.
import { useSelector } from 'react-redux'

const RouteProtectWrapper = ({
    redirect = '/auth/login',
    ifAuthUser = 'unlogged',
    children,
}: PropsWithChildren<React.ReactNode> & {
    redirect: string
    ifAuthUser: 'logged' | 'unlogged' | 'waiting' | 'any'
}) => {
    // Define isReady to control renderization.
    const [isReady, setIsReady] = useState(false)
    // Get user info.
    const authUser = useSelector(state => state.auth.authUser)
    // Get router.
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

    // Conditional rendering.
    return isReady ? <> {children} </> : <></>
}

export default RouteProtectWrapper
