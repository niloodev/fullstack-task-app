/* eslint-disable @typescript-eslint/no-explicit-any */

// React import.
import React, { useState } from 'react'

// Framer Motion import.
import { HTMLMotionProps, AnimatePresence, motion } from 'framer-motion'

// Import Styled Components.
import styled from 'styled-components'

// Redux imports.
import { useSelector, useDispatch } from 'react-redux'

// Get app functionalities.
import { signOut, openModal } from '../../lib/redux/actions/action'

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
}: {
    motionProps?: HTMLMotionProps<'div'>
    iconProps?: SvgIconProps
}) => {
    // Set states of functional component.
    const [toggle, setToggle] = useState(false)
    const SearchIcon = Icons['Search']
    const SearchOff = Icons['SearchOff']

    return (
        <SearchButtonDiv {...motionProps} data-opened={toggle}>
            <TextField
                label="Search"
                variant="outlined"
                color="secondary"
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
    overflow-x: visible;

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
    // For mobile toggle bar.
    const [toggle, setToggle] = useState(false)
    // Redux hook.
    const dispatch = useDispatch()
    const tasksList: any = useSelector(state => state.user.tasksList)

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
                        <SearchButton />
                    </ListSubheader>

                    <Divider />

                    <ShowListButton iconType="LightModeOutlined">
                        Today
                    </ShowListButton>
                    <ShowListButton iconType="FavoriteBorder">
                        Favorite
                    </ShowListButton>
                    <ShowListButton iconType="CalendarMonth">
                        Planned
                    </ShowListButton>
                    <ShowListButton iconType="HomeOutlined">
                        Tasks
                    </ShowListButton>

                    <Divider />

                    <AnimatePresence>
                        {tasksList
                            ? Object.keys(tasksList).map(key => {
                                  return (
                                      <ShowListButton
                                          key={key}
                                          iconType={tasksList[key].icon}
                                          iconColor={tasksList[key].color}
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