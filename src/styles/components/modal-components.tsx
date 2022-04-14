/* eslint-disable @typescript-eslint/no-explicit-any */

// 🐸: Here we will have all modal components, and a wrapper that will be imported inside _app.tsx
// This is just a way to make declarative modals with Redux work.

// React import.
import React, { useRef, useEffect, useState } from 'react'

// Get Redux hooks.
import { useSelector, useDispatch } from 'react-redux'

// Get application actions.
import { addTasksList } from '../../lib/redux/actions/action'

// Get application actions.
import { closeModal } from '../../lib/redux/actions/action'

// Get color picker.
import { SliderPicker, Color } from 'react-color'

// Import Styled Components, Material UI and Framer Motion for stylization.
import styled from 'styled-components'
import { Menu, MenuItem, IconButton, Box } from '@mui/material'
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
    padding: 15px;

    background-color: var(--color-secondary);
    color: var(--color-primary);
    border-radius: 5px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-flow: column;

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
        return (
            // Main box
            <ModalBox
                layout
                initial={{ scale: 0.4, opacity: 0 }}
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
                        sx={{ flex: '1' }}
                        label="List name"
                        color="primary"
                        errorLog={listNameError}
                        error={listNameError != ''}
                        inputProps={{ maxLength: 20 }}
                        placeholder="My list name"
                        value={listName}
                        onChange={e => setListName(e.target.value)}
                        onKeyDown={e => {
                            if (e.key == 'Enter') {
                                if (listName.length < 3)
                                    setListNameError('Min. of 3 characters')
                                else {
                                    setListNameError('')
                                    dispatch(
                                        addTasksList({
                                            color: color.toString(),
                                            title: listName,
                                            created: '',
                                            icon,
                                        })
                                    )
                                    dispatch(closeModal())
                                }
                            }
                        }}
                        focused
                    />
                </Box>
                {/* One of color pickers of React Color */}
                <SliderPicker
                    color={color}
                    onChange={color => setColor(color.hex)}
                />
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
                    transition={{ duration: 0.2 }}
                >
                    <CurrentModal />
                </ModalsDiv>
            ) : (
                <></>
            )}
        </AnimatePresence>
    )
}
