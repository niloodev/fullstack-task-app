// React import.
import React from 'react'

// Styled Components import.
import { motion } from 'framer-motion'
import styled from 'styled-components'

// React hooks and actions.
import { useSelector, useDispatch } from 'react-redux'
import { openModal } from '../../lib/redux/actions/action'
import { editTasks, deleteTasks } from '../../lib/redux/actions/action'

// Import Moment.
import moment from 'moment'

// Material UI components.
import {
    List,
    ListItem,
    Divider,
    Checkbox,
    IconButton,
    ListItemButton,
} from '@mui/material'
import * as Icons from '@mui/icons-material' // For general icons accessed by key.
import {
    FavoriteBorder,
    Favorite,
    CircleOutlined,
    CheckCircle,
    Close,
    Add,
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
`
const TaskSpan = styled(motion.div)`
    grid-area: text;
    display: flex;
    flex-flow: column;
    justify-content: center;
    overflow-wrap: break-word;

    padding: 0px 20px;
`
const TaskSpanDesc = styled(motion.span)`
    transition: all 0.15s ease;
`
const TaskModel = ({
    keyId,
    title,
    checked,
    fav,
    taskListId = '',
    date,
}: {
    keyId: string
    title: string
    checked: boolean
    fav: boolean
    taskListId: string
    date: string
}) => {
    // Get Redux hooks.
    const tasksList = useSelector(state => state.user.tasksList)
    const dispatch = useDispatch()

    const Icon =
        tasksList != null && taskListId != ''
            ? Icons[tasksList[taskListId].icon as keyof typeof Icons]
            : Icons['HomeOutlined']

    return (
        <motion.div layout>
            <ListItem>
                <ListModel>
                    <Checkbox
                        sx={{ gridArea: 'check' }}
                        color="warning"
                        icon={<CircleOutlined />}
                        checkedIcon={<CheckCircle />}
                        checked={checked}
                        onChange={e =>
                            dispatch(
                                editTasks({
                                    key: keyId,
                                    checked: e.target.checked,
                                })
                            )
                        }
                    />
                    <TaskSpan>
                        <TaskSpanDesc
                            layout
                            style={{
                                color: 'var(--color-warning)',
                                fontSize: '10px',
                            }}
                        >
                            {moment(date).calendar()}
                        </TaskSpanDesc>

                        <TaskSpanDesc
                            layout
                            style={
                                checked
                                    ? {
                                          textDecoration: 'line-through',
                                          color: 'var(--color-warning)',
                                      }
                                    : {}
                            }
                        >
                            {title}
                        </TaskSpanDesc>
                        {taskListId != '' && tasksList != null ? (
                            <TaskSpanDesc
                                layout
                                style={{
                                    fontSize: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '3.5px',
                                }}
                            >
                                <Icon sx={{ fontSize: '12px' }} />
                                {tasksList[taskListId].title}
                            </TaskSpanDesc>
                        ) : (
                            ''
                        )}
                    </TaskSpan>
                    <Checkbox
                        sx={{ gridArea: 'fav' }}
                        color="error"
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        checked={fav}
                        onChange={e =>
                            dispatch(
                                editTasks({ key: keyId, fav: e.target.checked })
                            )
                        }
                    />
                    <IconButton
                        sx={{
                            gridArea: 'close',
                            marginTop: 'auto',
                            marginBottom: 'auto',
                            maxHeight: '42px',
                        }}
                        onClick={() => dispatch(deleteTasks(keyId))}
                    >
                        <Close />
                    </IconButton>
                </ListModel>
            </ListItem>
            <Divider />
        </motion.div>
    )
}

// Will render all tasks provided in props.
const TaskListWrapper = styled(motion.div)`
    border-radius: 2.5px;
    overflow-x: hidden;
    overflow-y: auto;
    grid-area: task;
`
const TaskListDiv = styled(List)`
    display: flex;
    flex-flow: column;
    gap: 5px;

    min-height: calc(100% - 16px);
    width: 100%;

    background-color: var(--color-secondary);
`
export default function TaskList() {
    // Redux hooks.
    const dispatch = useDispatch()

    // Get lists and interface info.
    const tasks = useSelector(state => state.user.tasks)
    const { dateFilter, tasksListId } = useSelector(
        state => state.interface.current
    )

    let renderedTasks: Array<string> = []
    if (tasks != null) {
        // Filter by list
        renderedTasks = Object.keys(tasks).filter(key => {
            switch (tasksListId) {
                case 'favorite':
                    return tasks[key].fav == true
                case 'tasks':
                    return true
                case 'today':
                    return true
                default:
                    return tasks[key].taskList == tasksListId
            }
        })
        // Filter by date
        renderedTasks = renderedTasks.filter(key => {
            if (dateFilter == '') return true
            else return moment(tasks[key].date).isSame(dateFilter, 'day')
        })
        // Order by date
        renderedTasks = renderedTasks.sort(
            (a, b) =>
                moment(tasks[a].date).unix() - moment(tasks[b].date).unix()
        )
    }

    return (
        <TaskListWrapper layoutScroll>
            <TaskListDiv>
                {tasks != null
                    ? renderedTasks.map(key => (
                          <TaskModel
                              key={key}
                              keyId={key}
                              title={tasks[key].title}
                              date={tasks[key].date}
                              taskListId={tasks[key].taskList}
                              checked={tasks[key].checked}
                              fav={tasks[key].fav}
                          />
                      ))
                    : ''}
                <motion.div layout>
                    <ListItemButton
                        key="addtask_btn"
                        sx={{
                            gap: '2.5px',
                            justifyContent: 'center',
                            height: '60px',
                        }}
                        onClick={() => dispatch(openModal('add_task'))}
                    >
                        <Add /> Add task
                    </ListItemButton>
                </motion.div>
            </TaskListDiv>
        </TaskListWrapper>
    )
}
