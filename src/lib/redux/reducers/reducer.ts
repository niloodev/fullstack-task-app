// Import AnyAction type from Redux.
import { AnyAction } from 'redux'

// Get all action-types constants from action-types.
import {
    SET_USERINFO,
    SET_AUTHUSER,
    SET_ISLOADING,
    SNACKBAR,
    CLEAR_SNACKBAR,
    OPEN_MODAL,
    CLOSE_MODAL,
} from '../constants/action-types'

// Get store initial state to put on reducer.
import InitialState from '../store-initial-state'

// Root reducer.
function rootReducer(state = InitialState, action: AnyAction) {
    switch (action.type) {
        //// AUTH SECTION
        case SET_AUTHUSER:
            return {
                ...state,
                auth: { ...state.auth, authUser: action.payload },
            }
        case SET_ISLOADING:
            return {
                ...state,
                auth: { ...state.auth, isLoading: action.payload },
            }
        //// USER SECTION.
        case SET_USERINFO:
            return { ...state, user: action.payload }

        //// INTERFACE SECTION.
        case SNACKBAR:
            return {
                ...state,
                interface: { ...state.interface, toast: action.payload },
            }
        case CLEAR_SNACKBAR:
            return {
                ...state,
                interface: { ...state.interface, toast: null },
            }
        case OPEN_MODAL:
            return {
                ...state,
                interface: { ...state.interface, modal: action.payload },
            }
        case CLOSE_MODAL:
            return {
                ...state,
                interface: {
                    ...state.interface,
                    modal: { open: false, type: '' },
                },
            }
    }
    return state
}

export default rootReducer
