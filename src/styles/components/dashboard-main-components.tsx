// React import.
import React from 'react'

// Framer Motion and Styled components import.
import { motion } from 'framer-motion'
import styled from 'styled-components'

// Material UI imports.
import { TextField } from '@mui/material'

// SweetAlert2 imperative modals and snackbars.
import swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const reactSwal = withReactContent(swal)

// Moment import. (Date management)
import moment from 'moment'

// Dashboard main is the parent component to all others in dashboard.
export const DashboardMain = styled(motion.main)`
    position: relative;
    width: calc(100% - 120px);
    height: calc(100% - 120px);
    padding: 60px;

    display: grid;
    grid-template-rows: 1fr 3fr;
    grid-template-columns: 1fr 3fr;
    grid-template-areas:
        'side display'
        'side task';
    gap: 5px;
    overflow: hidden;

    @media (max-width: 800px) {
        width: 100%;
        height: 100%;
        padding: 0px;

        grid-template-rows: 1fr 3fr;
        grid-template-columns: 3fr;

        grid-template-areas:
            'display'
            'task';
    }
`

// Will display the list name, and some date information.
const ListDisplayStyled = styled(motion.div)`
    position: relative;
    border-radius: 5px;
    grid-area: display;
    background-image: var(--gradient-primary);

    display: flex;
    align-items: center;
    padding: 0px 40px;

    @media (max-width: 800px) {
        justify-content: center;
    }
`
const ListName = styled(motion.h1)`
    font-size: 45px;
    color: var(--color-secondary);
`
const Date = styled(motion.span)`
    position: absolute;
    bottom: 15px;
    color: var(--color-secondary);

    @media (min-width: 800px) {
        padding-left: 5px;
    }
`
export const ListDisplay = () => {
    return (
        <ListDisplayStyled>
            <ListName>Today</ListName>
            <Date>{moment().format('dddd, MMMM Do')}</Date>
        </ListDisplayStyled>
    )
}
