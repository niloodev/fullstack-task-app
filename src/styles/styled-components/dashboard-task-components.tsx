// React import.
import React from 'react'

// Styled Components import.
import { motion } from 'framer-motion'
import styled from 'styled-components'

// Material UI components.
import { List, ListItem, Divider, Checkbox } from '@mui/material'
import {
    FavoriteBorder,
    Favorite,
    CircleOutlined,
    CheckCircle,
} from '@mui/icons-material'

// Task model.
const ListModel = styled(motion.div)`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 42px 1fr 42px;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
        'check text fav'
        'check text fav';

    @media (max-width: 600px) {
        grid-template-areas:
            'check text text'
            'fav text text';
    }
`
const TaskModel = () => {
    return (
        <>
            <ListItem>
                <ListModel>
                    <Checkbox
                        sx={{ gridArea: 'check' }}
                        color="warning"
                        icon={<CircleOutlined />}
                        checkedIcon={<CheckCircle />}
                    />
                    <Checkbox
                        sx={{ gridArea: 'fav' }}
                        color="error"
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                    />
                </ListModel>
            </ListItem>
            <Divider />
        </>
    )
}

// Will render all tasks provided in props.
const TaskListDiv = styled(List)`
    display: flex;
    flex-flow: column;
    gap: 5px;
    border-radius: 2.5px;
    grid-area: task;

    overflow-x: hidden;
    overflow-y: scroll;
    background-color: var(--color-secondary);
`
export default function TaskList({
    tasklist = [],
}: {
    tasklist?: Array<string | undefined>
}) {
    return (
        <TaskListDiv>
            <TaskModel />
            <TaskModel />
            <TaskModel />
            <TaskModel />
            <TaskModel />
            <TaskModel />
        </TaskListDiv>
    )
}
