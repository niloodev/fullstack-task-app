///////////////////////////////////// login page

// react import
import React, { useEffect, useState } from 'react'

// import auth state
import { useAuth } from '../../lib/firebase-context-hook-provider' // to component

// validate.js to validate inputs and model of validation
import { validate } from 'validate.js'
import validateParams from '../../tools/validatejs-params'

// import components from app-components, made by framer-motion, material-ui and styled components.
import {
    HundredPercentAlign,
    AuthBox,
    AuthInput,
    AuthIcon,
    AuthButton,
    AuthSeparator,
} from '../../styles/auth-components'

// head from next.js
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'

// page component, type ranks as React.FunctionalComponent (React.FC)
const Login: React.FC = () => {
    const [isReady, setIsReady] = useState(false)

    // state of input values (controlled component) and errors log.
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [passError, setPassError] = useState<string | undefined>()
    const [emailError, setEmailError] = useState<string | undefined>()

    // auth state
    const { authUser, isLoading, signInEmailAndPassword, signInWithGithub } =
        useAuth()

    // check if user is already logged in, if true send it to dashboard
    const router = useRouter()
    useEffect(() => {
        if (authUser) {
            router.push('/users/dashboard')
        } else {
            setIsReady(true)
        }
    }, [authUser])

    return isReady ? (
        <HundredPercentAlign
            initial={{ opacity: 0, transform: 'scale(0, 0)' }}
            animate={{ opacity: 1, transform: 'scale(1, 1)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                    buttontype={!isLoading ? 'login' : 'loading'}
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
                <AuthButton
                    disabled={isLoading}
                    buttontype="github"
                    onClick={signInWithGithub}
                />

                {/* register button */}
                <Link passHref href="/auth/register">
                    <AuthButton disabled={isLoading}>REGISTER</AuthButton>
                </Link>
            </AuthBox>
        </HundredPercentAlign>
    ) : (
        <></>
    )
}

export default Login
