///////////////////////////////////// register page

// react import
import React from 'react'

// import components from app-components, made by framer-motion, material-ui and styled components.
import {
    HundredPercentAlign,
    AuthBox,
    AuthInput,
    AuthP,
    AuthButton,
} from '../styles/app-components'

// head from next.js
import Head from 'next/head'

// page component, type ranks as React.FunctionalComponent (React.FC)
const Register: React.FC = () => {
    return (
        <HundredPercentAlign
            key="register"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* head component, makes easy to search engines to encounter and organize this app's pages */}
            <Head>
                <title>Sign-in | niloodev</title>

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            {/* form box */}
            <AuthBox>
                {/* auth title */}
                <AuthP>SIGN-IN</AuthP>

                {/* auth inputs | user, email and password */}
                <AuthInput label="User" style={{ width: '90%' }} />

                <AuthInput
                    label="E-mail"
                    type="email"
                    style={{ width: '90%' }}
                />

                <AuthInput
                    label="Password"
                    type="password"
                    style={{ width: '90%' }}
                />

                {/* login button */}
                <AuthButton buttontype="register" />

                {/* back button */}
                <AuthButton
                    padding="5"
                    onClick={() => (window.location.href = '/login')}
                >
                    BACK
                </AuthButton>
            </AuthBox>
        </HundredPercentAlign>
    )
}

export default Register
