// React import.
import React, { useEffect } from 'react'

// Notistack hook.
import { useSnackbar } from 'notistack'

// Redux hooks.
import { useSelector, useDispatch } from 'react-redux'

// Actions.
import { clearSnackbar } from '../lib/redux/actions/action'

export default function SnackbarHandler() {
    // Get enqueueSnackbar function.
    const { enqueueSnackbar } = useSnackbar()
    // Get current snackbar from Redux.
    const toast = useSelector(state => state.interface.toast)
    // Get dispatch from Redux.
    const dispatch = useDispatch()

    useEffect(() => {
        if (toast == null) return

        enqueueSnackbar(toast.message, toast)
        dispatch(clearSnackbar())
    }, [toast])

    return <></>
}
