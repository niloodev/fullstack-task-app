// React import.
import React from 'react'

// Framer Motion and Styled components import.
import { motion, HTMLMotionProps } from 'framer-motion'
import Styled from 'styled-components'

// Will render all tasks provided in props.
const TaskListDiv = Styled(motion.div)`
    display: flex;
    flex-flow: column;
    gap: 5px; padding: 5px;
    border-radius: 5px;
    grid-area: task;

    overflow-x: hidden;
    overflow-y: scroll;
    background-color: var(--color-secondary);
`
export default function TaskList({
    tasklist = [],
    ...props
}: { tasklist?: Array<string | undefined> } & HTMLMotionProps<'div'>) {
    return <TaskListDiv {...props}></TaskListDiv>
}
