// import react
import React from 'react'

// framer-motion integration with styled-components + material.ui
import { HTMLMotionProps, motion } from 'framer-motion'
import Styled from 'styled-components'

export const DashboardMain = Styled(motion.main)`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex; justify-content: center; align-items: center;
`

export const Dashboard = Styled(motion.div)`
    width: 600px;
    height: 600px;
    padding: 5px;

    display: grid;
    grid-template-rows: 1fr 10fr;
    grid-template-columns: 1fr;
    gap: 5px;

    @media (max-width: 600px) {
        height: calc(100% - 10px);
    }
`

const HeaderDiv = Styled(motion.header)`
    display: flex;
    flex-flow: row;
    border-radius: 5px;
    
    background-color: ${props => props.theme.palette.secondary.main};
    border-bottom: 2px solid ${props => props.theme.palette.warning.main};
    border-left: 2px solid ${props => props.theme.palette.warning.main};
`

export const Header = (props: HTMLMotionProps<'header'>) => {
    return <HeaderDiv {...props}></HeaderDiv>
}

const TaskListDiv = Styled(motion.div)`
    display: flex;
    flex-flow: column;
    gap: 5px; padding: 5px;
    border-radius: 5px;

    overflow-x: hidden;
    overflow-y: scroll;
    background-color: ${props => props.theme.palette.secondary.main};
    border-bottom: 2px solid ${props => props.theme.palette.warning.main};
    border-left: 2px solid ${props => props.theme.palette.warning.main};
`

export const TaskList = ({
    tasklist = [],
    ...props
}: { tasklist?: Array<string | undefined> } & HTMLMotionProps<'div'>) => {
    return <TaskListDiv {...props}></TaskListDiv>
}
