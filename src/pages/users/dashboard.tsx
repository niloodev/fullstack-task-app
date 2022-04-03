///////////////////////////////////// login page

// react import
import React from 'react'

// import auth state
// import { useAuth } from '../../lib/firebase-auth-provider'

// import components from app-components, made by framer-motion, material-ui and styled components.
import { HundredPercentAlign, AuthBox } from '../../styles/auth-components'

// head from next.js
import Head from 'next/head'

// page component, type ranks as React.FunctionalComponent (React.FC)
const Dashboard: React.FC = () => {
    return (
        <HundredPercentAlign
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* head component, makes easy to search engines to encounter and organize this app's pages */}
            <Head>
                <title>Dashboard | niloodev</title>

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            {/* form box */}
            <AuthBox></AuthBox>
        </HundredPercentAlign>
    )
}

export default Dashboard
