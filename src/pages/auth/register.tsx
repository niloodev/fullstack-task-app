// Register page.

// React import.
import React, { useState } from 'react'

// Validate.js to validate inputs and model of validation.
import { validate } from 'validate.js'
import validateParams from '../../tools/validatejs-params'

// Import authentication components.
import {
    HundredPercentAlign,
    AuthBox,
    AuthInput,
    AuthP,
    AuthButton,
} from '../../styles/styled-components/auth-components'

// Head and Link from Next.
import Head from 'next/head'
import Link from 'next/link'

// Get application global state.
import { useSelector } from 'react-redux'

// Get wrapper to protect route.
import RouteProtectWrapper from '../../tools/route-protect-wrapper'

// Page component.
const Register = () => {
    // State definition.
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [userError, setUserError] = useState<string | undefined>()
    const [passError, setPassError] = useState<string | undefined>()
    const [emailError, setEmailError] = useState<string | undefined>()

    // Get auth state.
    const { isLoading, createUserWithEmailAndPassword } = useSelector(
        state => state.auth
    )

    return (
        <HundredPercentAlign
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
        >
            {/* Head component, makes easy to search engines to encounter and organize this app's pages. */}
            <Head>
                <title>Sign-in | niloodev</title>

                <link rel="shortcut icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            {/* Form box. */}
            <AuthBox
                initial={{ transform: 'scale(0.6, 0.6)' }}
                animate={{ transform: 'scale(1, 1)' }}
                exit={{ transform: 'scale(0.6, 0.6)' }}
            >
                {/* Title. */}
                <AuthP>SIGN-IN</AuthP>

                {/* Auth user, email and password inputs. */}
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
                    // Error display properties.
                    error={userError != undefined ? true : false}
                    errorLog={userError != undefined ? userError : ''}
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
                    // Error display properties.
                    error={emailError != undefined ? true : false}
                    errorLog={emailError != undefined ? emailError : ''}
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
                    // Error display properties.
                    error={passError != undefined ? true : false}
                    errorLog={passError != undefined ? passError : ''}
                />

                {/* Register button. */}
                <AuthButton
                    disabled={isLoading}
                    buttonType={!isLoading ? 'register' : 'loading'}
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

                {/* Back button. */}
                <Link passHref href="/auth/login">
                    <AuthButton disabled={isLoading}>BACK</AuthButton>
                </Link>
            </AuthBox>
        </HundredPercentAlign>
    )
}

// Route protect wrapper.
const RegisterProtectWrapper = () => (
    <RouteProtectWrapper ifAuthUser="logged" redirect="/users/dashboard">
        <Register />
    </RouteProtectWrapper>
)

export default RegisterProtectWrapper
