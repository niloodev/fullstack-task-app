/* eslint @typescript-eslint/no-explicit-any: "off" */

// import react
import * as React from 'React'

// framer-motion integration with styled-components + material.ui
import { motion } from 'framer-motion'
import Styles from 'styled-components'

// some components
import UserIcon from '@mui/icons-material/AccountCircleRounded'
import TextField from '@mui/material/TextField'

import Button from '@mui/material/Button'
import CheckIcon from '@mui/icons-material/Check'

// div that centers anything inside it
export const HundredPercentAlign = Styles(motion.div)`
    position: relative;
    width: 100%; height: 100%;
    
    display: flex; justify-content: center; align-items: center;
`

// auth-box its basically the container of the form
export const AuthBox = Styles.div`
    position: absolute;
    min-width: 300px;
    min-height: 400px;

    display: flex; justify-content: center; align-items: center;
    flex-flow: column;
    gap: 15px;
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
export const AuthIcon = () => <UserIcon color="warning" fontSize="large" />

// auth-input is the material-ui input with some definitions, made it here because of padronization
export const AuthInput = (props: any) => (
    <TextField {...props} variant="outlined" color="warning" />
)

// paragraph of the forms
export const AuthP = Styles.h1`
    color: ${props => props.theme.palette.warning.main};
    font-weight: bold;
    text-align: center;
    font-size: 20px;
    letter-spacing: 2px;

    margin: 0; padding: 0;
`

// customizable button that fits the application design, a good example of material-ui + styled components integration.
export const AuthButton = (props: any) => {
    const AuthButton = Styles(Button)`
        width: 90%;
        padding-top: ${props.padding ? props.padding : '15'}px !important;
        padding-bottom: ${props.padding ? props.padding : '15'}px !important;
    `

    const AuthSpan = Styles.span`
        color: ${props => props.theme.palette.secondary.main};
    `
    return (
        <AuthButton {...props} variant="contained" color="warning">
            {props.buttontype == 'login' || props.buttontype == 'register' ? (
                <CheckIcon color="secondary" />
            ) : (
                <AuthSpan>{props.children}</AuthSpan>
            )}
        </AuthButton>
    )
}
