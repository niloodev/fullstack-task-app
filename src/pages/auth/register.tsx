///////////////////////////////////// register page

// react import
import React, { useEffect, useState } from 'react'

// validate.js to validate inputs and model of validation
import { validate } from 'validate.js'
import validateParams from '../../tools/validatejs-params'

// import components from app-components, made by framer-motion, material-ui and styled components.
import {
    HundredPercentAlign,
    AuthBox,
    AuthInput,
    AuthP,
    AuthButton,
} from '../../styles/auth-components'

// head from next.js
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'

// useAuth from firebase-auth-provider
import { useAuth } from '../../lib/firebase-context-hook-provider' // to component

// page component, type ranks as React.FunctionalComponent (React.FC)
const Register: React.FC = () => {
    const [isReady, setIsReady] = useState(false)

    // state definition
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [userError, setUserError] = useState<string | undefined>()
    const [passError, setPassError] = useState<string | undefined>()
    const [emailError, setEmailError] = useState<string | undefined>()

    // auth information
    const { authUser, isLoading, createUserWithEmailAndPassword } = useAuth()

    // check if user is already logged in, if true send it to dashboard
    const router = useRouter()
    useEffect(() => {
        if (authUser) {
            router.push('/users/dashboard')
        } else setIsReady(true)
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
                <AuthInput
                    label="User"
                    disabled={isLoading}
                    value={user}
                    inputProps={{
                        maxLength: 15,
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUser(e.target.value)
                    }
                    // error exibition properties
                    error={userError != undefined ? true : false}
                    errorlog={userError != undefined ? userError : ''}
                />

                <AuthInput
                    label="E-mail"
                    type="email"
                    disabled={isLoading}
                    inputProps={{
                        maxLength: 35,
                    }}
                    value={email}
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
                    inputProps={{
                        maxLength: 35,
                    }}
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                    // error exibition properties
                    error={passError != undefined ? true : false}
                    errorlog={passError != undefined ? passError : ''}
                />

                {/* register button */}
                <AuthButton
                    disabled={isLoading}
                    buttontype={!isLoading ? 'register' : 'loading'}
                    onClick={() => {
                        const errors = validate(
                            {
                                _user: user,
                                _password: password,
                                _email: email,
                            },
                            validateParams,
                            { fullMessages: false }
                        )
                        if (errors != undefined) {
                            setUserError(
                                errors._user != undefined
                                    ? errors._user[0]
                                    : undefined
                            )
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
                            setUserError(undefined)
                            setPassError(undefined)
                            setEmailError(undefined)

                            createUserWithEmailAndPassword(
                                email,
                                password,
                                user
                            )
                        }
                    }}
                />

                {/* back button */}
                <Link passHref href="/auth/login">
                    <AuthButton disabled={isLoading}>BACK</AuthButton>
                </Link>
            </AuthBox>
        </HundredPercentAlign>
    ) : (
        <></>
    )
}

export default Register
