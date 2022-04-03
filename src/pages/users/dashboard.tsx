///////////////////////////////////// dashboard

// react import
import React, { useState, useEffect } from 'react'

// import auth state
import { useAuth } from '../../lib/firebase-context-hook-provider'

// import components from app-components, made by framer-motion, material-ui and styled components.
import {
    DashboardMain,
    Dashboard as DashboardGrid,
    TaskList,
    Header,
} from '../../styles/dashboard-components'

// head from next.js
import Head from 'next/head'
import { useRouter } from 'next/router'

// page component, type ranks as React.FunctionalComponent (React.FC)
const Dashboard: React.FC = () => {
    const [isReady, setIsReady] = useState(false)

    // list of tasks (connected to server)
    const [toDoList, setToDoList] = useState([])

    // get authUser
    const { authUser } = useAuth()
    // router
    const router = useRouter()

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
                <title>Dashboard | niloodev</title>

                <link rel="shortcut icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            <DashboardGrid>
                <Header />
                <TaskList />
            </DashboardGrid>
        </DashboardMain>
    ) : (
        <></>
    )
}

export default Dashboard
