// Import AnyAction type from Redux.
import { AnyAction } from 'redux'

// Get all action-types constants from action-types.
import {
    SET_USERINFO,
    SET_AUTHUSER,
    SET_ISLOADING,
    SET_AUTHFUNCTIONS,
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
            break
        case SET_ISLOADING:
            return {
                ...state,
                auth: { ...state.auth, isLoading: action.payload },
            }
            break
        case SET_AUTHFUNCTIONS:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    signInEmailAndPassword:
                        action.payload.signInEmailAndPassword,
                    createUserWithEmailAndPassword:
                        action.payload.createUserWithEmailAndPassword,
                    signInWithGithub: action.payload.signInWithGithub,
                    signOut: action.payload.signOut,
                },
            }
            break
        //// USER SECTION.
        case SET_USERINFO:
            return { ...state, user: action.payload }
            break
    }
    return state
}

export default rootReducer
