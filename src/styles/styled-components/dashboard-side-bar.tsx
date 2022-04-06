// import react
import React from 'react'

// framer-motion integration with styled-components + material.ui
import { HTMLMotionProps, motion } from 'framer-motion'

import {
    List,
    ListItemButton,
    ListSubheader,
    Avatar,
    SvgIconProps,
    Divider,
} from '@mui/material'
import { UseTabsListProps } from '@mui/base'
import * as Icons from '@mui/icons-material'
type IconsType = typeof Icons

import Styled from 'styled-components'

///// search button component
const SearchButtonDiv = Styled(motion.div)`
    background-color: ${props => props.theme.palette.secondary.main};
    border-radius: 50%; display: flex; justify-content: center; align-items: center;
    cursor: pointer;
    transition: all 0.1s ease;
    padding: 5px;

    position: absolute; right: 10px;

    &:hover {
        background-color: ${props => props.theme.palette.primary.main};
        color: ${props => props.theme.palette.secondary.main};
    }
`

const SearchButton = ({
    motionProps,
    iconProps,
}: {
    motionProps?: HTMLMotionProps<'div'>
    iconProps?: SvgIconProps
}) => {
    const SearchIcon = Icons['Search']
    return (
        <SearchButtonDiv
            {...motionProps}
            whileTap={{ scale: 1.15, transition: { duration: 0.05 } }}
        >
            <SearchIcon {...iconProps} sx={{ fontSize: '30px' }} />
        </SearchButtonDiv>
    )
}

///// show list button
const ShowListButton = ({
    iconType = 'ListAlt',
    iconColor = 'primary.main',
    children = 'template button',
}: {
    iconType?: keyof IconsType
    iconColor?: string
    children: string
}) => {
    const Icon = Icons[iconType]
    return (
        <ListItemButton
            sx={{ gap: '5px', paddingTop: '15px', paddingBottom: '15px' }}
        >
            <Icon sx={{ color: iconColor }} />
            {children}
        </ListItemButton>
    )
}

///// sidebar component
const SideBarStyled = Styled(motion.div)`
    border-radius: 10px;
    padding: 10px;
    grid-area: side;
    min-width: 230px;

    background-color: ${props => props.theme.palette.secondary.main};

    display: flex;
    flex-flow: column;
`
export default function SideBar(props: UseTabsListProps) {
    const ListStyle = {
        gap: '10px',
        overflowY: 'auto',
        padding: 0,
    }

    return (
        <SideBarStyled>
            <List sx={ListStyle}>
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
                    <Avatar />
                    <span>kieltwogz</span>
                    <SearchButton />
                </ListSubheader>

                <Divider />

                <ShowListButton iconType="WbSunny">Today</ShowListButton>
                <ShowListButton iconType="Star">Favorite</ShowListButton>
                <ShowListButton iconType="CalendarMonth">
                    Planned
                </ShowListButton>
                <ShowListButton iconType="Home">All Tasks</ShowListButton>
                <Divider />
            </List>
        </SideBarStyled>
    )
}
