/* eslint @typescript-eslint/no-explicit-any: "off" */
/* eslint @typescript-eslint/no-unused-vars: "off" */

// Import React.
import React, { Ref } from 'react'

// Framer Motion and Styled Components import.
import { motion } from 'framer-motion'
import styled from 'styled-components'

// Material UI imports.
import {
    CodeOutlined as UserIcon,
    GitHub as GitHubIcon,
    Check as CheckIcon,
} from '@mui/icons-material'

import {
    Button,
    TextField,
    CircularProgress,
    ButtonProps,
    TextFieldProps,
} from '@mui/material'

// DIV that centers everything inside it.
export const HundredPercentAlign = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`

// As the name says, is the authentication wrapper that contains the formulary of login and register pages.
export const AuthBox = styled(motion.div)`
    position: absolute;
    min-width: 300px;
    min-height: 400px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    gap: 10px;
    padding: 12px;

    background-color: var(--color-secondary);
    border-radius: 5%;

    box-shadow: 0px 0px 20px rgb(0, 0, 0, 0.5);

    border-bottom: 6px solid var(--color-warning);
    border-left: 6px solid var(--color-warning);

    @media (max-width: 600px) {
        width: calc(100% - 20px);
        height: calc(100% - 20px);

        min-width: auto;
        min-height: auto;

        margin: 10px;
        padding: 0;
        border-radius: 0;
    }
`

// This is the standard auth icon.
export const AuthIcon = (): JSX.Element => (
    <UserIcon color="warning" style={{ fontSize: '40px' }} />
)

// Just a color line.
export const AuthSeparator = styled.div`
    width: 90%;
    height: 2.5px;
    border-radius: 100%;

    background-color: var(--color-warning);
`

// 🐸: AuthInput component is the Material UI input with some customizations.
const CapsuleDiv = styled.div`
    width: 90%;
    position: relative;
`
const LabelError = styled.div`
    color: var(--color-error);
    bottom: 0px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    width: 100%;
`
export const AuthInput = ({
    errorLog = '',
    ...props
}: {
    errorLog: string
} & TextFieldProps): JSX.Element => {
    return (
        <CapsuleDiv>
            <TextField
                {...props}
                variant="outlined"
                color="warning"
                style={{ width: '100%' }}
            />
            <LabelError>{errorLog}</LabelError>
        </CapsuleDiv>
    )
}

// Basic text of forms.
export const AuthP = styled.h1`
    color: var(--color-warning);
    font-weight: bold;
    text-align: center;
    font-size: 20px;
    letter-spacing: 2px;

    margin: 0;
    padding: 0;
`

// Credits.
export const AuthCredits = styled.div`
    position: absolute;
    width: 100%;
    display: inline-block;
    text-align: center;

    font-size: 10px;
    bottom: 10px;
    color: var(--color-warning);

    a {
        color: var(--color-warning);
    }

    a:hover {
        opacity: 0.8;
    }
`

// 🐸: A custom button that fits the application design, a good example of the Styled Components + Material UI
// integration, it is forwarding the reference because of the Link component of Next.
const AuthButton_ = styled(Button)`
    width: 90%;
    font-size: 14px !important;
`
const AuthSpan = styled.span`
    color: var(--color-secondary);
`
export const AuthButton = React.forwardRef(function AuthButton(
    {
        padding = '5px',
        buttonType = undefined,
        ...props
    }: {
        padding?: string | undefined
        buttonType?: 'register' | 'login' | 'github' | 'loading' | undefined
    } & ButtonProps,
    ref: Ref<any>
): JSX.Element {
    return (
        <AuthButton_
            {...props}
            variant="contained"
            color="warning"
            style={{
                paddingTop: padding,
                paddingBottom: padding,
            }}
        >
            {buttonType == 'login' || buttonType == 'register' ? (
                <CheckIcon color="secondary" />
            ) : buttonType == 'github' ? (
                <GitHubIcon color="secondary" />
            ) : buttonType == 'loading' ? (
                <CircularProgress color="secondary" size="1.5rem" />
            ) : (
                <AuthSpan>{props.children}</AuthSpan>
            )}
        </AuthButton_>
    )
})
