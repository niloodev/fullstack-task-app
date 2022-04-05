// import AnyAction type from redux, and some action-types
import { AnyAction } from 'redux'
// get all action-types
import {
    SET_TODO,
    SET_AUTHUSER,
    SET_ISLOADING,
    SET_AUTHFUNCTIONS,
} from '../constants/action-types'
// get store initial state to put on reducer
import InitialState from '../store-initial-state'

// auth reducer
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
        ////
        case SET_TODO:
            return { ...state, toDo: action.payload }
            break
    }
    return state
}

export default rootReducer
