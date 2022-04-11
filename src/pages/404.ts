// Simple 404 page to do redirection base on session state.
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

export default function Custom404() {
    const router = useRouter()
    const authUser = useSelector(state => state.auth.authUser)

    useEffect(() => {
        if (authUser == 'waiting') return
        if (authUser) {
            router.replace('/users/dashboard')
        } else router.replace('/auth/login')
    }, [authUser])

    return null
}
