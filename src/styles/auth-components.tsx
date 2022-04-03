/* eslint @typescript-eslint/no-explicit-any: "off" */
/* eslint @typescript-eslint/no-unused-vars: "off" */

// import react
import React, { Ref } from 'react'

// framer-motion integration with styled-components + material.ui
import { motion } from 'framer-motion'
import Styled from 'styled-components'

// some components | icons
import {
    AccountCircleRounded as UserIcon,
    GitHub as GitHubIcon,
    Check as CheckIcon,
} from '@mui/icons-material'

// solid components
import {
    Button,
    TextField,
    CircularProgress,
    ButtonProps,
    TextFieldProps,
} from '@mui/material'

// div that centers anything inside it
export const HundredPercentAlign = Styled(motion.div)`
    position: relative;
    width: 100%; height: 100%;

    display: flex; justify-content: center; align-items: center;
`

// auth-box its basically the container of the form
export const AuthBox = Styled.div`
    position: absolute;
    min-width: 300px;
    min-height: 400px;

    display: flex; justify-content: center; align-items: center;
    flex-flow: column;
    gap: 10px;
    padding: 12px;

    background-color: ${props => props.theme.palette.secondary.main};
    border-radius: 5%;

    box-shadow: 0px 0px 20px rgb(0, 0, 0, 0.5);

    border-bottom: 6px solid ${props => props.theme.palette.warning.main};
    border-left: 6px solid ${props => props.theme.palette.warning.main};

    @media (max-width: 450px) {
        width: calc(100% - 20px);
        height: calc(100% - 20px);

        min-width: auto; min-height: auto;

        margin: 10px;

        padding: 0;
        
        border-radius: 0;
    }
`

// auth-icon is the css settings of the user-icon; used in login and register page
export const AuthIcon = (): JSX.Element => (
    <UserIcon color="warning" style={{ fontSize: '40px' }} />
)

export const AuthSeparator = Styled.div`
    width: 90%;
    height: 2.5px;
    border-radius: 100%;

    background-color: ${props => props.theme.palette.warning.main};
`

// auth-input is the material-ui input with some definitions, made it here because of padronization
const CapsuleDiv = Styled.div`
    width: 90%;
    position: relative;
`

const LabelError = Styled.div`
    color: ${props => props.theme.palette.error.main};
    bottom: 0px;
    position: absolute;
    display: flex; justify-content: center; align-items: center;
    font-size: 12px; 
    width: 100%;
`
export const AuthInput = ({
    errorlog = '',
    ...props
}: {
    errorlog: string
} & TextFieldProps): JSX.Element => {
    return (
        <CapsuleDiv>
            <TextField
                {...props}
                variant="outlined"
                color="warning"
                style={{ width: '100%' }}
            />
            <LabelError>{errorlog}</LabelError>
        </CapsuleDiv>
    )
}

// paragraph of the forms
export const AuthP = Styled.h1`
    color: ${props => props.theme.palette.warning.main};
    font-weight: bold;
    text-align: center;
    font-size: 20px;
    letter-spacing: 2px;

    margin: 0; padding: 0;
`

// customizable button that fits the application design, a good example of material-ui + Styled components integration.
const AuthButton_ = Styled(Button)`
        width: 90%;
        font-size: 14px !important;
`
const AuthSpan = Styled.span`
        color: ${props => props.theme.palette.secondary.main};
`
// here we defined some default values to custom props, and then the optional type of then (? indicator)
export const AuthButton = React.forwardRef(function AuthButton(
    {
        padding = '5px',
        buttontype = undefined,
        ...props
    }: {
        padding?: string | undefined
        buttontype?: 'register' | 'login' | 'github' | 'loading' | undefined
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
            {buttontype == 'login' || buttontype == 'register' ? (
                <CheckIcon color="secondary" />
            ) : buttontype == 'github' ? (
                <GitHubIcon color="secondary" />
            ) : buttontype == 'loading' ? (
                <CircularProgress color="secondary" size="1.5rem" />
            ) : (
                <AuthSpan>{props.children}</AuthSpan>
            )}
        </AuthButton_>
    )
})
