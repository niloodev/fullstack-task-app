// React import.
import React from 'react'

// Styled Components import.
import { motion } from 'framer-motion'
import styled from 'styled-components'

// Material UI components.
import { List, ListItem, Divider, Checkbox, IconButton } from '@mui/material'
import Icons from '@mui/icons-material' // For general icons accessed by key.
import {
    FavoriteBorder,
    Favorite,
    CircleOutlined,
    CheckCircle,
    Close,
} from '@mui/icons-material'

// Task model.
const ListModel = styled(motion.div)`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 42px 1fr 42px 42px;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
        'check text fav close'
        'check text fav close';

    @media (max-width: 800px) {
        grid-template-areas:
            'check text text close'
            'fav text text close';
    }
`
const TaskSpan = styled(motion.div)`
    grid-area: text;
    display: flex;
    flex-flow: column;
    justify-content: center;
    overflow-wrap: break-word;

    padding: 0px 20px;
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
                    <TaskSpan>
                        <span>
                            Clean the house if is too dirty please mama
                            c&apos;mon lets clean
                        </span>
                        <span
                            style={{
                                fontSize: '13px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                            }}
                        >
                            <Favorite sx={{ fontSize: '13px' }} /> house tasks |
                            Tomorrow
                        </span>
                    </TaskSpan>
                    <Checkbox
                        sx={{ gridArea: 'fav' }}
                        color="error"
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                    />
                    <IconButton
                        sx={{
                            gridArea: 'close',
                            marginTop: 'auto',
                            marginBottom: 'auto',
                            maxHeight: '42px',
                        }}
                    >
                        <Close />
                    </IconButton>
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
        </TaskListDiv>
    )
}
