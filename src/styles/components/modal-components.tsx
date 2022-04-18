/* eslint-disable @typescript-eslint/no-explicit-any */

// 🐸: Here we will have all modal components, and a wrapper that will be imported inside _app.tsx
// This is just a way to make declarative modals with Redux work.

// React import.
import React, { useRef, useEffect, useLayoutEffect, useState } from 'react'

// Get Redux hooks.
import { useSelector, useDispatch } from 'react-redux'

// Get application actions.
import {
    addTasksList,
    editTasksList,
    deleteTasksList,
    addTasks,
    selectTasksList,
    selectDate,
} from '../../lib/redux/actions/action'

// Get application actions.
import { closeModal } from '../../lib/redux/actions/action'

// Get color picker.
import { SliderPicker, Color } from 'react-color'

// Import Moment and MUI Time Picker.
import moment from 'moment'
import { MobileDateTimePicker, StaticDatePicker } from '@mui/x-date-pickers'

// Import Styled Components, Material UI and Framer Motion for stylization.
import styled from 'styled-components'
import {
    Menu,
    MenuItem,
    IconButton,
    Box,
    Button,
    Select,
    TextField,
} from '@mui/material'
import * as Icons from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'

// Some application custom components.
import { AuthInput } from '../components/auth-components'

// Icon palette for tasks.
const iconPalette = [
    'FilterVintageRounded',
    'FastfoodRounded',
    'DarkModeRounded',
    'AnchorRounded',
    'AttachMoney',
    'CoffeeMakerRounded',
    'BackupRounded',
    'CoffeeRounded',
    'ColorLensRounded',
    'AutoStoriesRounded',
    'FlatwareRounded',
    'FlashlightOnRounded',
    'BorderColorRounded',
    'GridViewRounded',
    'BuildCircleRounded',
    'LocalGroceryStoreRounded',
    'CloudDoneRounded',
    'MinorCrashRounded',
    'PointOfSaleRounded',
    'RocketLaunchRounded',
    'ShoppingCartRounded',
    'ErrorRounded',
    'FolderRounded',
]

// Creation of the modals.
const ModalBox = styled(motion.div)`
    position: relative;
    padding: 15px;

    background-color: var(--color-secondary);
    color: var(--color-primary);
    border-radius: 5px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-flow: column;
    overflow-x: auto;

    flex: 1;
    max-width: 350px;
`
const modals = {
    add_tasksList: () => {
        // AnchorEl
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>()
        // Form states.
        const [listName, setListName] = useState('')
        const [listNameError, setListNameError] = useState('')
        const [color, setColor] = useState<Color>('#810')
        const [icon, setIcon] = useState(iconPalette[0])
        // Get dispatch
        const dispatch = useDispatch()
        // Get the current icon.
        const SelectedIcon = Icons[icon as keyof typeof Icons]
        // Confirm function.
        function confirmAdd(listName: string, color: string, icon: string) {
            if (listName.length < 3) setListNameError('Min. of 3 characters')
            else {
                setListNameError('')
                dispatch(
                    addTasksList({
                        color: color,
                        title: listName,
                        created: '',
                        icon,
                    })
                )
                dispatch(closeModal())
            }
        }

        return (
            // Main box
            <ModalBox
                key="add_tasksList"
                initial={{ opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
            >
                {/* Simple input wrapper. (Makes IconButton and the TextField aligned in a row) */}
                <Box
                    sx={{
                        marginBottom: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                    }}
                >
                    <IconButton
                        sx={{ maxHeight: '40px' }}
                        onClick={e => setAnchorEl(e.currentTarget)}
                    >
                        <SelectedIcon sx={{ color: color.toString() }} />
                    </IconButton>
                    <AuthInput
                        divProps={{ style: { width: '100%' } }}
                        color="primary"
                        label="List name"
                        errorLog={listNameError}
                        error={listNameError != ''}
                        inputProps={{ maxLength: 15 }}
                        placeholder="My list name"
                        value={listName}
                        onChange={e => setListName(e.target.value)}
                        onKeyDown={e => {
                            if (e.key == 'Enter')
                                confirmAdd(listName, color.toString(), icon)
                        }}
                    />
                </Box>
                {/* One of color pickers of React Color */}
                <SliderPicker
                    color={color}
                    onChange={color => setColor(color.hex)}
                />
                {/* Add button */}
                <Button
                    onClick={() => confirmAdd(listName, color.toString(), icon)}
                    sx={{
                        marginTop: '15px',
                        color: color.toString(),
                    }}
                >
                    Add
                </Button>
                {/* Menu from IconButton */}
                <Menu
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    open={anchorEl != null}
                >
                    {iconPalette.map(val => {
                        const Icon = Icons[val as keyof typeof Icons]
                        return (
                            <MenuItem
                                key={val}
                                onClick={() => {
                                    setIcon(val)
                                    setAnchorEl(null)
                                }}
                            >
                                <Icon sx={{ color: color.toString() }} />
                            </MenuItem>
                        )
                    })}
                </Menu>
            </ModalBox>
        )
    },
    edit_tasksList: () => {
        // Get list info
        const tasksListId = useSelector(
            state => state.interface.current.tasksListId
        )
        const tasksList = useSelector(state => state.user.tasksList)
        // Get dispatch
        const dispatch = useDispatch()
        // AnchorEl
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>()
        // Form states.
        const [listName, setListName] = useState('')
        const [listNameError, setListNameError] = useState('')
        const [color, setColor] = useState<Color>('#810')
        const [icon, setIcon] = useState(iconPalette[0])
        // Get the current icon.
        const SelectedIcon = Icons[icon as keyof typeof Icons]
        // Confirm function.
        function confirmEdit(listName: string, color: string, icon: string) {
            if (listName.length < 3) setListNameError('Min. of 3 characters')
            if (!tasksListId) setListNameError('Id error.')
            else {
                setListNameError('')
                dispatch(
                    editTasksList({
                        key: tasksListId,
                        color: color,
                        title: listName,
                        icon,
                    })
                )
                dispatch(closeModal())
            }
        }

        // 🐸: Before rendering, check if tasksList and tasksListId are in the right spot, and then defines the
        // initial values.
        useLayoutEffect(() => {
            if (
                !Object.keys(tasksList != null ? tasksList : {}).includes(
                    tasksListId
                )
            )
                dispatch(closeModal())
            else {
                setListName(
                    tasksList != null ? tasksList[tasksListId].title : ''
                )
                setColor(tasksList != null ? tasksList[tasksListId].color : '')
                setIcon(tasksList != null ? tasksList[tasksListId].icon : '')
            }
        }, [])

        return (
            // Main box
            <ModalBox
                key="edit_tasksList"
                initial={{ opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
            >
                {/* Simple input wrapper. (Makes IconButton and the TextField aligned in a row) */}
                <Box
                    sx={{
                        marginBottom: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                    }}
                >
                    <IconButton
                        sx={{ maxHeight: '40px' }}
                        onClick={e => setAnchorEl(e.currentTarget)}
                    >
                        <SelectedIcon sx={{ color: color.toString() }} />
                    </IconButton>
                    <AuthInput
                        divProps={{ style: { width: '100%' } }}
                        color="primary"
                        label="List name"
                        errorLog={listNameError}
                        error={listNameError != ''}
                        inputProps={{ maxLength: 15 }}
                        placeholder="My list name"
                        value={listName}
                        onChange={e => setListName(e.target.value)}
                        onKeyDown={e => {
                            if (e.key == 'Enter')
                                confirmEdit(listName, color.toString(), icon)
                        }}
                    />
                </Box>
                {/* One of color pickers of React Color */}
                <SliderPicker
                    color={color}
                    onChange={color => setColor(color.hex)}
                />
                {/* Add button */}
                <Button
                    onClick={() =>
                        confirmEdit(listName, color.toString(), icon)
                    }
                    sx={{
                        marginTop: '15px',
                        color: color.toString(),
                    }}
                >
                    Edit
                </Button>
                {/* Menu from IconButton */}
                <Menu
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    open={anchorEl != null}
                >
                    {iconPalette.map(val => {
                        const Icon = Icons[val as keyof typeof Icons]
                        return (
                            <MenuItem
                                key={val}
                                onClick={() => {
                                    setIcon(val)
                                    setAnchorEl(null)
                                }}
                            >
                                <Icon sx={{ color: color.toString() }} />
                            </MenuItem>
                        )
                    })}
                </Menu>
            </ModalBox>
        )
    },
    remove_taskslist: () => {
        // Get list id and tasksLists.
        const tasksList = useSelector(state => state.user.tasksList)
        const tasksListId = useSelector(
            state => state.interface.current.tasksListId
        )
        // Get dispatch.
        const dispatch = useDispatch()

        // Check if tasksListId exists on current lists.
        if (
            !Object.keys(tasksList != null ? tasksList : {}).includes(
                tasksListId
            )
        ) {
            dispatch(closeModal())
            return <></>
        }

        return (
            <ModalBox>
                <Box sx={{ display: 'flex', flexFlow: 'column', gap: '10px' }}>
                    <span>
                        Are you sure you want to delete this list? (This will
                        delete all tasks associated to it)
                    </span>
                    <Box
                        style={{
                            display: 'flex',
                            flexFlow: 'row',
                        }}
                    >
                        <Button
                            color="error"
                            sx={{ flex: 1 }}
                            onClick={() => {
                                dispatch(selectTasksList('tasks'))
                                dispatch(deleteTasksList(tasksListId))
                                dispatch(closeModal())
                            }}
                        >
                            Delete
                        </Button>
                        <Button
                            sx={{ flex: 1 }}
                            onClick={() => {
                                dispatch(closeModal())
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </ModalBox>
        )
    },
    add_task: () => {
        // Get tasks list and selected list.
        const tasksList = useSelector(state => state.user.tasksList)
        const tasksListId = useSelector(
            state => state.interface.current.tasksListId
        )
        // Form states.
        const [taskName, setTaskName] = useState('')
        const [taskNameError, setTaskNameError] = useState('')
        const [list, setList] = useState(
            tasksList != null
                ? Object.keys(tasksList).filter(key => key == tasksListId)
                      .length != 0
                    ? tasksListId
                    : ''
                : ''
        )
        const [date, setDate] = useState<string>(moment().toISOString())
        // Get dispatch
        const dispatch = useDispatch()
        // Confirm function.
        function confirmAdd(taskName: string, taskList: string, date: string) {
            if (taskName.length < 3) setTaskNameError('Min. of 3 characters')
            else {
                setTaskNameError('')
                dispatch(
                    addTasks({
                        title: taskName,
                        checked: false,
                        created: moment().toISOString(),
                        date: date != null ? date : '',
                        taskList,
                        fav: false,
                    })
                )
                dispatch(closeModal())
            }
        }
        // Get icon from TaskList
        const Icon =
            list != '' && tasksList != null
                ? Icons[tasksList[list].icon as keyof typeof Icons]
                : Icons['Home']

        return (
            // Main box
            <ModalBox
                key="add_task"
                style={{ gap: '5px' }}
                initial={{ opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
            >
                {/* Basic TextField for task title */}
                <AuthInput
                    divProps={{ style: { width: '100%' } }}
                    color="primary"
                    label="Task name"
                    errorLog={taskNameError}
                    error={taskNameError != ''}
                    inputProps={{ maxLength: 60 }}
                    placeholder="My task name"
                    value={taskName}
                    onChange={e => setTaskName(e.target.value)}
                    onKeyDown={e => {
                        if (e.key == 'Enter') confirmAdd(taskName, list, date)
                    }}
                />
                {/* Simple input wrapper. (Makes IconButton and the TextField aligned in a row) */}
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                    }}
                >
                    <Icon sx={{ flex: '1' }} />
                    <Select
                        displayEmpty
                        value={list}
                        onChange={e => setList(e.target.value)}
                        sx={{ flex: '8' }}
                    >
                        <MenuItem value="">Without task list</MenuItem>
                        {tasksList != null
                            ? Object.keys(tasksList).map(key => {
                                  return (
                                      <MenuItem
                                          key={key}
                                          value={key}
                                          sx={{ gap: '5px' }}
                                      >
                                          {tasksList[key].title}
                                      </MenuItem>
                                  )
                              })
                            : ''}
                    </Select>
                </Box>
                {/* Time picker */}
                <MobileDateTimePicker
                    label="To"
                    renderInput={props => <TextField {...props} />}
                    value={date}
                    onChange={e => setDate(moment(e).toISOString())}
                />
                {/* Add button */}
                <Button
                    onClick={() => confirmAdd(taskName, list, date)}
                    color="primary"
                >
                    Add
                </Button>
            </ModalBox>
        )
    },
    select_date: () => {
        // Get info from Redux and dispatch function.
        const dateFilter = useSelector(
            state => state.interface.current.dateFilter
        )
        const dispatch = useDispatch()

        return (
            <ModalBox
                key="select_date"
                style={{ gap: '5px' }}
                initial={{ opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
            >
                <Button onClick={() => dispatch(selectDate(''))}>Clear</Button>
                <motion.div style={{ width: '100%', overflowX: 'auto' }}>
                    <StaticDatePicker
                        orientation="portrait"
                        open={true}
                        renderInput={props => <TextField {...props} />}
                        value={dateFilter}
                        onChange={e =>
                            dispatch(selectDate(moment(e).toISOString()))
                        }
                    />
                </motion.div>
            </ModalBox>
        )
    },
}

// Exporting the possible modals.
export type ModalType = keyof typeof modals

// Creation of modal wrapper.
const ModalsDiv = styled(motion.div)`
    --padding: 15px;

    z-index: 500;

    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - (var(--padding) * 2));
    height: calc(100% - (var(--padding) * 2));
    padding: var(--padding);

    display: flex;
    justify-content: center;
    align-items: center;

    background: rgba(0, 0, 0, 0.4);
`
export default function ApplicationModals() {
    // Get ApplicationModals ref.
    const ref = useRef<any>(null)
    // Get Redux state and dispatch.
    const { open, type } = useSelector(state => state.interface.modal)
    const dispatch = useDispatch()
    // If clicks in the background, close modal.
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (ref.current == event.target) dispatch(closeModal())
        }

        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [])

    const CurrentModal = modals[type]
    return (
        <AnimatePresence>
            {open ? (
                <ModalsDiv
                    key="applicationsModals"
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <CurrentModal />
                </ModalsDiv>
            ) : (
                <></>
            )}
        </AnimatePresence>
    )
}
