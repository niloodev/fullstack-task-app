// simple next-page to redirect to login page or dashboard.
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/firebase-context-hook-provider'

export default function Custom404() {
    const router = useRouter()
    const { authUser } = useAuth()

    useEffect(() => {
        if (authUser) {
            router.replace('/users/dashboard')
        } else router.replace('/auth/login')
    })

    return null
}
