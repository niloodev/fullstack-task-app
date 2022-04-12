// React import.
import React from 'react'

// Framer Motion and Styled components import.
import { motion } from 'framer-motion'
import styled from 'styled-components'

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

    @media (max-width: 600px) {
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
    border-radius: 5px;
    grid-area: display;
    background-color: var(--color-warning);
`
export const ListDisplay = () => {
    return <ListDisplayStyled></ListDisplayStyled>
}
