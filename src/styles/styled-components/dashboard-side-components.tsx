// React import.
import React, { useState } from 'react'

// Framer Motion import.
import { HTMLMotionProps, motion } from 'framer-motion'

// Import Styled Components.
import Styled from 'styled-components'

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
} from '@mui/material'
import * as Icons from '@mui/icons-material'
import ToggleIcon from 'material-ui-toggle-icon'
type IconsType = typeof Icons // Get icons type.

// Import application global state. (Hook from Redux)
import { useSelector } from 'react-redux'

// Search component.
const SearchButtonDiv = Styled(motion.div)`
    border-radius: 10px; display: flex; justify-content: flex-start; align-items: center;
    padding: 5px; overflow: hidden;
    transition: all 0.2s ease;

    position: absolute; right: 0px;
    
    width: 60px;
    background: none;

    &[data-opened = "isopen"] {
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
        <SearchButtonDiv
            {...motionProps}
            data-opened={toggle ? 'isopen' : 'isntopen'}
        >
            <TextField
                label="Search"
                variant="outlined"
                color="secondary"
                autoComplete="off"
                sx={{
                    input: { color: 'secondary.main' },
                    transform: 'scale(1, 1)',
                    width: '100%',
                }}
                focused
            />
            <IconButton
                color={!toggle ? 'warning' : 'secondary'}
                sx={{
                    position: 'absolute',
                    right: '15px',
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

// List template button.
const ShowListButton = ({
    iconType = 'ListAlt',
    iconColor = 'primary.main',
    textColor = 'primary.main',
    children = 'template button',
    onClick_ = () => {
        return
    },
}: {
    iconType?: keyof IconsType
    iconColor?: string
    textColor?: string
    children: string
    onClick_?: () => void
}) => {
    const Icon = Icons[iconType]
    return (
        <ListItemButton
            sx={{
                color: textColor,
                gap: '5px',
                paddingTop: '15px',
                paddingBottom: '15px',
            }}
            onClick={onClick_}
        >
            <Icon sx={{ color: iconColor }} />
            {children}
        </ListItemButton>
    )
}

// SideBar component.
const SideBarStyled = Styled(motion.div)`
    border-radius: 10px;
    padding: 10px;
    grid-area: side;
    min-width: 230px;

    background-color: var(--color-secondary);

    display: flex;
    flex-flow: column;

    @media(max-width: 600px) {
        z-index: 2;
        border-radius: 0px;
        position: absolute;

        width: calc(100% - 20px);
        height: calc(100% - 20px);
    }
`
export default function SideBar() {
    // Get "signOut" function and user data from global state.
    const signOut = useSelector(state => state.auth.signOut)
    const userData = useSelector(state => state.user)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    return (
        <SideBarStyled>
            <List
                sx={{
                    gap: '10px',
                    overflowY: 'auto',
                    padding: 0,
                }}
            >
                <ListSubheader
                    sx={{
                        gap: '10px',
                        bgcolor: 'secondary.main',
                        display: 'flex',
                        flexFlow: 'row',
                        flexWrap: 'no-wrap',
                        alignItems: 'center',
                        paddingTop: '10px',
                        paddingBottom: '10px',
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
                            onClick={signOut}
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

                <ShowListButton iconType="WbSunny">Today</ShowListButton>
                <ShowListButton iconType="Star">Favorite</ShowListButton>
                <ShowListButton iconType="CalendarMonth">
                    Planned
                </ShowListButton>
                <ShowListButton iconType="HomeOutlined">Tasks</ShowListButton>
                <Divider />
                <ShowListButton
                    iconType="Add"
                    textColor="warning.main"
                    iconColor="warning.main"
                >
                    New list
                </ShowListButton>
            </List>
        </SideBarStyled>
    )
}
