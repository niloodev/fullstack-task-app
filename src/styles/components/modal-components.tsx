// React import.
import React from 'react'

// Framer Motion and Styled components import.
import { motion } from 'framer-motion'
import styled from 'styled-components'

// Material UI imports.
import { TextField } from '@mui/material'

// SweetAlert2 imperative modals and snackbars.
import swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const reactSwal = withReactContent(swal)

// 🐸: Here we will have all mixin functions of SweetAlert2, it basically makes the "template" of toasts
// and modals. (They are imperative! Thats why I didn't started with capital letter)

// Toast model.
export const toast = reactSwal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    color: 'var(--color-primary)',
    background: 'var(--color-secondary)',
    didOpen: toast => {
        toast.addEventListener('mouseenter', reactSwal.stopTimer)
        toast.addEventListener('mouseleave', reactSwal.resumeTimer)
    },
})

// Tasks Lists template modal.
const TasksListHTMLStyled = styled(motion.div)`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 10px 25px;

    align-items: center;
    justify-content: center;
`
const TasksListHTML = () => {
    return (
        <TasksListHTMLStyled>
            <TextField label="List name" id="listName" color="warning" />
        </TasksListHTMLStyled>
    )
}

export const tasksListModal = reactSwal.mixin({
    heightAuto: false,
    color: 'var(--color-primary)',
    background: 'var(--color-secondary)',
    html: <TasksListHTML></TasksListHTML>,
})
