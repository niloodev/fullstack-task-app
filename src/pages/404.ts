// simple next-page to redirect to login page.
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Custom404() {
    const router = useRouter()

    useEffect(() => {
        router.replace('/auth/login')
    })

    return null
}
