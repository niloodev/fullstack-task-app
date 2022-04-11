// Here we will organize and export all of the notistack snackbars.
import React from 'react'

// Notistack hook | Material UI dependent.
import { useSnackbar, VariantType } from 'notistack'
import { Grow } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

// Title and variant as props, and then enqueue snackbar.
const useNotistack = () => {
    const { enqueueSnackbar } = useSnackbar()

    const queueSnackbar = (
        title: string,
        variant: VariantType | undefined = 'warning',
        verticalAlign: 'top' | 'bottom' = 'top',
        horizontalAlign: 'center' | 'left' | 'right' = 'center'
    ) => {
        enqueueSnackbar(title, {
            variant: variant,
            anchorOrigin: {
                vertical: verticalAlign,
                horizontal: horizontalAlign,
            },
            // these props are static for all snackbars
            autoHideDuration: 1600,
            TransitionComponent: Grow as React.ComponentType<TransitionProps>,
            preventDuplicate: true,
        })
    }

    return { queueSnackbar }
}

export default useNotistack
