///////////////////////////////////// dashboard

// react import
import React from 'react'

// import components from app-components, made by framer-motion, material-ui and styled components.
import {
    DashboardMain,
    TaskList,
    ListDisplay,
} from '../../styles/styled-components/dashboard-components'
import SideBar from '../../styles/styled-components/dashboard-side-bar'

// head from next.js
import Head from 'next/head'

// get wrapper to protect route
import RouteProtectWrapper from '../../tools/route-protect-wrapper'

// page component, type ranks as React.FunctionalComponent (React.FC)
const Dashboard = () => {
    return (
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

            <SideBar />
            <ListDisplay />
            <TaskList />
        </DashboardMain>
    )
}

const DashboardProtectWrapper = () => (
    <RouteProtectWrapper ifAuthUser="unlogged" redirect="/auth/login">
        <Dashboard />
    </RouteProtectWrapper>
)

export default DashboardProtectWrapper
