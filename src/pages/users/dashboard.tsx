// Dashboard page.

// React import.
import React from 'react'

// Import dashboard components.
import {
    DashboardMain,
    ListDisplay,
} from '../../styles/components/dashboard-main-components'
import TaskList from '../../styles/components/dashboard-task-components'
import SideBar from '../../styles/components/dashboard-side-components'

// Head from Next.
import Head from 'next/head'

// Get wrapper to protect route.
import RouteProtectWrapper from '../../tools/route-protect-wrapper'

// Page component.
const Dashboard = () => {
    return (
        <DashboardMain
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Head component, makes easy to search engines to encounter and organize this app's pages. */}
            <Head>
                <title>Dashboard | niloodev</title>

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
    )
}

// Route protection.
const DashboardProtectWrapper = () => (
    <RouteProtectWrapper ifAuthUser="unlogged" redirect="/auth/login">
        <Dashboard />
    </RouteProtectWrapper>
)

export default DashboardProtectWrapper
