///////////////////////////////////// login page

// react import
import React, { useEffect, useState } from 'react'

// import auth state
import { useAuth } from '../../lib/firebase-auth-provider'

// validate.js to validate inputs and model of validation
import { validate } from 'validate.js'
import validateParams from '../../tools/validate-model'

// import components from app-components, made by framer-motion, material-ui and styled components.
import {
    HundredPercentAlign,
    AuthBox,
    AuthInput,
    AuthIcon,
    AuthButton,
    AuthSeparator,
} from '../../styles/app-components'

// head from next.js
import Head from 'next/head'
import { useRouter } from 'next/router'

// page component, type ranks as React.FunctionalComponent (React.FC)
const Login: React.FC = () => {
    // state of input values (controlled component) and errors log.
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [passError, setPassError] = useState<string | undefined>()
    const [emailError, setEmailError] = useState<string | undefined>()

    // auth state
    const { authUser, signInEmailAndPassword } = useAuth()

    // check if user is already logged in, if true send it to dashboard
    const router = useRouter()
    useEffect(() => {
        if (authUser) {
            router.push('/users/dashboard')
        }
    }, [authUser])

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

                {/* auth separator */}
                <AuthSeparator />

                {/* auth inputs | user and password */}
                <AuthInput
                    label="E-mail"
                    value={email}
                    inputProps={{
                        maxLength: 35,
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                    }
                    // error exibition properties
                    error={emailError != undefined ? true : false}
                    errorlog={emailError != undefined ? emailError : ''}
                />

                <AuthInput
                    label="Password"
                    type="password"
                    value={password}
                    inputProps={{
                        maxLength: 35,
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                    // error exibition properties
                    error={passError != undefined ? true : false}
                    errorlog={passError != undefined ? passError : ''}
                />

                {/* login button */}
                <AuthButton
                    padding="15px"
                    buttontype="login"
                    onClick={() => {
                        const errors = validate(
                            {
                                _password: password,
                                _email: email,
                            },
                            validateParams,
                            { fullMessages: false }
                        )
                        if (errors != undefined) {
                            setPassError(
                                errors._password != undefined
                                    ? errors._password[0]
                                    : undefined
                            )
                            setEmailError(
                                errors._email != undefined
                                    ? errors._email[0]
                                    : undefined
                            )
                        } else {
                            setPassError(undefined)
                            setEmailError(undefined)

                            signInEmailAndPassword(email, password)
                        }
                    }}
                />

                {/* github login button */}
                <AuthButton buttontype="github" />

                {/* register button */}
                <AuthButton
                    onClick={() => (window.location.href = '/auth/register')}
                >
                    REGISTER
                </AuthButton>
            </AuthBox>
        </HundredPercentAlign>
    )
}

export default Login
