// React import.
import React, { useState } from 'react'

// Framer Motion and Styled components import.
import { motion } from 'framer-motion'
import styled from 'styled-components'

// Material UI import.
import { Button, IconButton, TextField, Modal } from '@mui/material'
import { DateRangeRounded, MoreHorizRounded } from '@mui/icons-material'

// Moment import and MUI time picker.
import moment from 'moment'
import { StaticDatePicker } from '@mui/x-date-pickers'

// Redux hooks and actions.
import { useSelector, useDispatch } from 'react-redux'
import { selectDate } from '../../lib/redux/actions/action'

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
const Settings = styled(motion.div)`
    position: absolute;
    bottom: 15px;
    right: 15px;

    display: flex;
    flex-flow: row-reverse;

    gap: 5px;

    @media (max-width: 500px) {
        top: 15px;
        max-height: 40px;
    }
`
export const ListDisplay = () => {
    // Get tasks payload.
    const tasksListMap = useSelector(state => state.user.tasksList)
    // Get dispatch.
    const dispatch = useDispatch()
    // State of simple date modal.
    const [open, setOpen] = useState(false)
    // Get interface payload.
    const { tasksListId, dateFilter } = useSelector(
        state => state.interface.current
    )

    return (
        <ListDisplayStyled>
            <ListName>
                {tasksListId == 'today'
                    ? 'Today'
                    : tasksListId == 'favorite'
                    ? 'Favorite'
                    : tasksListId == 'tasks'
                    ? 'Tasks'
                    : tasksListMap != null
                    ? tasksListMap[tasksListId as keyof typeof tasksListMap]
                          .title
                    : 'undefined'}
            </ListName>
            <Date>
                {dateFilter != ''
                    ? moment(dateFilter).format('dddd, MMMM Do, YYYY')
                    : ''}
            </Date>

            <Settings>
                {tasksListId != 'today' &&
                tasksListId != 'favorite' &&
                tasksListId != 'tasks' ? (
                    <IconButton color="secondary">
                        <MoreHorizRounded />
                    </IconButton>
                ) : (
                    ''
                )}

                {tasksListId != 'today' ? (
                    <>
                        <Modal
                            open={open}
                            onClose={() => setOpen(false)}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <motion.div style={{ position: 'relative' }}>
                                <StaticDatePicker
                                    renderInput={props => (
                                        <TextField {...props} />
                                    )}
                                    value={dateFilter}
                                    onChange={e =>
                                        dispatch(
                                            selectDate(moment(e).toISOString())
                                        )
                                    }
                                />
                                <Button
                                    sx={{
                                        width: '100%',
                                        position: 'absolute',
                                        bottom: '0px',
                                    }}
                                    onClick={() => dispatch(selectDate(''))}
                                >
                                    Clear
                                </Button>
                            </motion.div>
                        </Modal>
                        <IconButton
                            color="secondary"
                            onClick={() =>
                                open ? setOpen(false) : setOpen(true)
                            }
                        >
                            <DateRangeRounded />
                        </IconButton>
                    </>
                ) : (
                    ''
                )}
            </Settings>
        </ListDisplayStyled>
    )
}
