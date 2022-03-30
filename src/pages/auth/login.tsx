///////////////////////////////////// login page

// react import
import React from 'react'

// import components from app-components, made by framer-motion, material-ui and styled components.
import {
    HundredPercentAlign,
    AuthBox,
    AuthInput,
    AuthIcon,
    AuthP,
    AuthButton,
} from '../../styles/app-components'

// head from next.js
import Head from 'next/head'

// page component, type ranks as React.FunctionalComponent (React.FC)
const Login: React.FC = () => {
    return (
        <HundredPercentAlign
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* head component, makes easy to search engines to encounter and organize this app's pages */}
            <Head>
                <title>Log-in | niloodev</title>

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            {/* form box */}
            <AuthBox>
                {/* auth icon */}
                <AuthIcon />

                {/* auth title */}
                <AuthP>LOG-IN</AuthP>

                {/* auth inputs | user and password */}
                <AuthInput label="User" style={{ width: '90%' }} />

                <AuthInput
                    label="Password"
                    type="password"
                    style={{ width: '90%' }}
                />

                {/* login button */}
                <AuthButton buttontype="login" />

                {/* github login button */}
                <AuthButton buttontype="github" padding="8" />

                {/* register button */}
                <AuthButton
                    padding="5"
                    onClick={() => (window.location.href = '/register')}
                >
                    REGISTER
                </AuthButton>
            </AuthBox>
        </HundredPercentAlign>
    )
}

export default Login
