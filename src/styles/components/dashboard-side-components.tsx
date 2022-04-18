/* eslint-disable @typescript-eslint/no-explicit-any */

// React import.
import React, { useState, useEffect } from 'react'

// Framer Motion import.
import { HTMLMotionProps, AnimatePresence, motion } from 'framer-motion'

// Import Styled Components.
import styled from 'styled-components'

// Redux imports.
import { useSelector, useDispatch } from 'react-redux'

// Get UNIX timestamp.
import moment from 'moment'

// Get app functionalities.
import {
    signOut,
    openModal,
    selectTasksList,
    selectDate,
} from '../../lib/redux/actions/action'

// Import some Material UI components.
import {
    List,
    ListItemButton,
    ListSubheader,
    Menu,
    MenuItem,
    Avatar,
    SvgIconProps,
    Divider,
    IconButton,
    TextField,
    ListItemButtonProps,
} from '@mui/material'
import * as Icons from '@mui/icons-material'
import ToggleIcon from 'material-ui-toggle-icon'
type IconsType = typeof Icons // Get icons type.

// Search component.
const SearchButtonDiv = styled(motion.div)`
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
    overflow: hidden;
    transition: all 0.2s ease;

    position: absolute;
    right: 0px;

    width: 60px;
    background: none;

    &[data-opened='true'] {
        width: calc(100% - 10px);
        background: var(--color-primary);
    }
`
const SearchButton = ({
    motionProps,
    iconProps,
    search = '',
    onChange,
}: {
    motionProps?: HTMLMotionProps<'div'>
    iconProps?: SvgIconProps
    search?: string
    onChange: (e: any) => any
}) => {
    // Set states of functional component.
    const [toggle, setToggle] = useState(false)
    const SearchIcon = Icons['Search']
    const SearchOff = Icons['SearchOff']

    // On toggle changes.
    useEffect(() => {
        onChange({ target: { value: '' } })
    }, [toggle])

    return (
        <SearchButtonDiv {...motionProps} data-opened={toggle}>
            <TextField
                label="Search"
                variant="outlined"
                color="secondary"
                value={search}
                onChange={onChange}
                autoComplete="off"
                sx={{
                    input: { color: 'secondary.main' },
                    transform: 'scale(1, 1)',
                    width: '100%',
                    marginTop: '3px',
                }}
                focused
            />
            <IconButton
                color={!toggle ? 'warning' : 'secondary'}
                sx={{
                    position: 'absolute',
                    right: '18.5px',
                }}
                onClick={() => {
                    if (toggle) setToggle(false)
                    else setToggle(true)
                }}
            >
                <ToggleIcon
                    on={toggle}
                    offIcon={<SearchIcon {...iconProps} />}
                    onIcon={<SearchOff {...iconProps} />}
                />
            </IconButton>
        </SearchButtonDiv>
    )
}

// Toggle button.
const ToggleButtonStyled = styled(motion.div)`
    display: none;
    position: absolute;
    z-index: 3;

    @media (max-width: 800px) {
        display: flex;
    }
`
const ToggleButton = ({
    toggle,
    ...props
}: { toggle: boolean } & HTMLMotionProps<'div'>) => {
    const Icon = toggle ? Icons['Menu'] : Icons['Close']
    return (
        <ToggleButtonStyled
            {...props}
            layout
            style={
                toggle
                    ? {
                          top: '15px',
                          left: '15px',
                      }
                    : {
                          bottom: '15px',
                          right: '15px',
                      }
            }
        >
            <IconButton color={toggle ? 'secondary' : 'error'}>
                <Icon />
            </IconButton>
        </ToggleButtonStyled>
    )
}

// List template button.
const ShowListButton = ({
    iconType = 'ListAlt',
    iconColor = 'primary.main',
    textColor = '',
    children = 'template button',
    ...props
}: {
    iconType?: keyof IconsType
    iconColor?: string
    textColor?: string
    children: string
} & ListItemButtonProps) => {
    const Icon = Icons[iconType]

    return (
        <motion.div
            layout
            layoutScroll
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <ListItemButton
                sx={{
                    color: textColor == '' ? iconColor : textColor,
                    gap: '5px',
                    paddingTop: '15px',
                    paddingBottom: '15px',
                }}
                {...props}
            >
                <Icon sx={{ color: iconColor }} />
                {children}
            </ListItemButton>
        </motion.div>
    )
}

// SideBar component.
const SideBarStyled = styled(motion.div)`
    border-radius: 10px;
    grid-area: side;
    min-width: 230px;

    background-color: var(--color-secondary);

    display: flex;
    flex-flow: column;

    overflow-y: auto;
    overflow-x: hidden;

    @media (max-width: 800px) {
        z-index: 2;
        border-radius: 0px;
        position: absolute;

        width: 100%;
        height: 100%;

        transition: all 0.2s ease;
        transform: translateX(0%);

        &[data-toggle='true'] {
            transform: translateX(-100%);
        }
    }
`
export default function SideBar() {
    // Get user data from global state.
    const userData = useSelector(state => state.user)
    // Anchor for Material UI Menu component.
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    // Search string.
    const [search, setSearch] = useState('')
    // For mobile toggle bar.
    const [toggle, setToggle] = useState(false)
    // Redux hook.
    const dispatch = useDispatch()
    const tasksList: any = useSelector(state => state.user.tasksList)

    let renderedTasksList: Array<string> = []
    if (tasksList != null) {
        renderedTasksList = Object.keys(tasksList).filter(key =>
            tasksList[key].title.includes(search)
        )
    }

    return (
        <>
            <ToggleButton
                toggle={toggle}
                onClick={() => {
                    if (toggle) setToggle(false)
                    else setToggle(true)
                }}
            />
            <SideBarStyled data-toggle={toggle} layoutScroll>
                <List
                    sx={{
                        gap: '10px',
                        padding: '10px',
                    }}
                >
                    <ListSubheader
                        sx={{
                            gap: '5px',
                            bgcolor: 'secondary.main',
                            display: 'flex',
                            flexFlow: 'row',
                            flexWrap: 'no-wrap',
                            alignItems: 'center',
                            padding: '10px',
                        }}
                    >
                        <IconButton
                            size="small"
                            onClick={(
                                event: React.MouseEvent<HTMLButtonElement>
                            ) => {
                                setAnchorEl(event.currentTarget)
                            }}
                        >
                            <Avatar />
                        </IconButton>
                        <Menu
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={() => setAnchorEl(null)}
                            sx={{
                                ul: { padding: 0 },
                            }}
                            transitionDuration={{
                                appear: 100,
                                enter: 100,
                                exit: 100,
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    dispatch(signOut())
                                }}
                                sx={{
                                    color: 'error.main',
                                }}
                            >
                                Logout
                            </MenuItem>
                        </Menu>
                        <span>{userData.userName}</span>
                        <SearchButton
                            search={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </ListSubheader>

                    <Divider />

                    <ShowListButton
                        iconType="LightModeOutlined"
                        onClick={() => {
                            dispatch(selectTasksList('today'))
                            dispatch(selectDate(moment().toISOString()))
                            setToggle(true)
                        }}
                    >
                        Today
                    </ShowListButton>
                    <ShowListButton
                        iconType="FavoriteBorder"
                        onClick={() => {
                            dispatch(selectTasksList('favorite'))
                            dispatch(selectDate(''))
                            setToggle(true)
                        }}
                    >
                        Favorite
                    </ShowListButton>
                    <ShowListButton
                        iconType="HomeOutlined"
                        onClick={() => {
                            dispatch(selectTasksList('tasks'))
                            dispatch(selectDate(''))
                            setToggle(true)
                        }}
                    >
                        Tasks
                    </ShowListButton>

                    <Divider />

                    <AnimatePresence>
                        {tasksList
                            ? renderedTasksList.map(key => {
                                  return (
                                      <ShowListButton
                                          key={key}
                                          iconType={tasksList[key].icon}
                                          iconColor={tasksList[key].color}
                                          onClick={() => {
                                              dispatch(selectTasksList(key))
                                              dispatch(selectDate(''))
                                              setToggle(true)
                                          }}
                                      >
                                          {tasksList[key].title}
                                      </ShowListButton>
                                  )
                              })
                            : null}
                        <ShowListButton
                            key="addTasksList"
                            onClick={() => dispatch(openModal('add_tasksList'))}
                            iconType="Add"
                            textColor="warning.main"
                            iconColor="warning.main"
                        >
                            New list
                        </ShowListButton>
                    </AnimatePresence>
                </List>
            </SideBarStyled>
        </>
    )
}
