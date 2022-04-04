///////////////////////////////////// dashboard

// react import
import React, { useState, useEffect } from 'react'

// import auth state
import { useAuth } from '../../lib/firebase/firebase-context-hook-provider'

// import components from app-components, made by framer-motion, material-ui and styled components.
import {
    DashboardMain,
    TaskList,
    ListDisplay,
} from '../../components/dashboard-components'
import SideBar from '../../components/dashboard-side-bar'

// head from next.js
import Head from 'next/head'
import { useRouter } from 'next/router'

// redux
import { useSelector } from 'react-redux'

// page component, type ranks as React.FunctionalComponent (React.FC)
const Dashboard: React.FC = () => {
    // local hook
    const [isReady, setIsReady] = useState(false)

    // get authUser
    const { authUser } = useAuth()

    // router
    const router = useRouter()

    // app state
    const toDo = useSelector(state => state.toDo)

    useEffect(() => {
        if (authUser == 'waiting') return
        if (!authUser) {
            router.push('/auth/login')
        } else {
            setIsReady(true)
        }
    }, [authUser])

    return isReady ? (
        <DashboardMain
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* head component, makes easy to search engines to encounter and organize this app's pages */}
            <Head>
                <title>{toDo} | niloodev</title>

                <link rel="shortcut icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            <SideBar />
            <ListDisplay />
            <TaskList />
        </DashboardMain>
    ) : (
        <></>
    )
}

export default Dashboard
