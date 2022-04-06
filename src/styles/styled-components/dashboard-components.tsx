// import react
import React from 'react'

// framer-motion integration with styled-components + material.ui
import { HTMLMotionProps, motion } from 'framer-motion'
import Styled from 'styled-components'

// dashboard main is the parent div to all others in dashboard
export const DashboardMain = Styled(motion.main)`
    position: relative;
    width: calc(100% - 120px);
    height: calc(100% - 120px);
    padding: 60px;
    
    display: grid;
    grid-template-rows: 1fr 3fr;
    grid-template-columns: 1fr 3fr;

    grid-template-areas: "side display" 
                         "side task";

    gap: 5px;
`

// taskList will render all tasks provided in props
const TaskListDiv = Styled(motion.div)`
    display: flex;
    flex-flow: column;
    gap: 5px; padding: 5px;
    border-radius: 5px;
    grid-area: task;

    overflow-x: hidden;
    overflow-y: scroll;
    background-color: ${props => props.theme.palette.secondary.main};
`

export const TaskList = ({
    tasklist = [],
    ...props
}: { tasklist?: Array<string | undefined> } & HTMLMotionProps<'div'>) => {
    return <TaskListDiv {...props}></TaskListDiv>
}

// will display the list name, and
const ListDisplayStyled = Styled(motion.div)`
    border-radius: 5px;
    grid-area: display;
    background-color: ${props => props.theme.palette.warning.main};
`

export const ListDisplay = () => {
    return <ListDisplayStyled></ListDisplayStyled>
}
