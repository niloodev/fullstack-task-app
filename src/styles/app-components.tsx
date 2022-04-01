/* eslint @typescript-eslint/no-explicit-any: "off" */

// import react
import React from 'react'

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
import { Button, TextField } from '@mui/material'

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
export const AuthIcon = () => (
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
    justify-content: center; align-items: center;
    font-size: 12px; 
    width: 100%;
`
export const AuthInput = (props: any) => {
    return (
        <CapsuleDiv>
            <TextField
                {...props}
                variant="outlined"
                color="warning"
                style={{ width: '100%' }}
            />
            <LabelError
                style={{ display: props.logerror != '' ? 'flex' : 'none' }}
            >
                {props.errorlog}
            </LabelError>
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
`
const AuthSpan = Styled.span`
        color: ${props => props.theme.palette.secondary.main};
`
export const AuthButton = (props: any) => {
    return (
        <AuthButton_
            {...props}
            variant="contained"
            color="warning"
            style={{
                paddingTop: props.padding ? props.padding : '5px',
                paddingBottom: props.padding ? props.padding : '5px',
            }}
        >
            {props.buttontype == 'login' || props.buttontype == 'register' ? (
                <CheckIcon color="secondary" />
            ) : props.buttontype == 'github' ? (
                <GitHubIcon color="secondary" />
            ) : (
                <AuthSpan>{props.children}</AuthSpan>
            )}
        </AuthButton_>
    )
}
