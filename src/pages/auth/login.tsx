// Login page.

// React import.
import React, { useState } from 'react'

// Import redux hook to access application global state.
import { useSelector } from 'react-redux'

// Import validateParams and validate function, to make values validation.
import { validate } from 'validate.js'
import validateParams from '../../tools/validatejs-params'

// Import authentication components.
import {
    HundredPercentAlign,
    AuthBox,
    AuthInput,
    AuthButton,
    AuthSeparator,
    AuthP,
    AuthCredits,
} from '../../styles/styled-components/auth-components'

// Head and Link from Next.
import Head from 'next/head'
import Link from 'next/link'

// Get wrapper to protect this route.
import RouteProtectWrapper from '../../tools/route-protect-wrapper'

// Page component.
const Login = () => {
    // State of input values and its errors state.
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [passError, setPassError] = useState<string | undefined>()
    const [emailError, setEmailError] = useState<string | undefined>()

    // Auth state from application global state.
    const { isLoading, signInEmailAndPassword, signInWithGithub } = useSelector(
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
                <title>Log-in | niloodev</title>

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
                <AuthP>{'<TaskApp />'}</AuthP>

                {/* Separator.*/}
                <AuthSeparator />

                {/* User and password inputs. */}
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
                    errorLog={emailError != undefined ? emailError : ''}
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
                    errorLog={passError != undefined ? passError : ''}
                />

                {/* Login button. */}
                <AuthButton
                    padding="15px"
                    disabled={isLoading}
                    buttonType={!isLoading ? 'login' : 'loading'}
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

                {/* Github login button. */}
                <AuthButton
                    disabled={isLoading}
                    buttonType="github"
                    onClick={signInWithGithub}
                />

                {/* Register button. */}
                <Link passHref href="/auth/register">
                    <AuthButton disabled={isLoading}>REGISTER</AuthButton>
                </Link>

                {/* Credits. */}
                <AuthCredits>
                    created by&nbsp;
                    <Link href="https://www.github.com/niloodev">niloodev</Link>
                </AuthCredits>
            </AuthBox>
        </HundredPercentAlign>
    )
}

// Wrap the page here.
const LoginProtectWrapper = () => (
    <RouteProtectWrapper ifAuthUser="logged" redirect="/users/dashboard">
        <Login />
    </RouteProtectWrapper>
)

export default LoginProtectWrapper
