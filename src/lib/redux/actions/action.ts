/* eslint-disable @typescript-eslint/no-explicit-any */
// Import action-types constants. (🐸: Avoid using strings!)
import {
    SET_AUTHUSER,
    SET_ISLOADING,
    SET_USERINFO,
    SNACKBAR,
    CLEAR_SNACKBAR,
    OPEN_MODAL,
    CLOSE_MODAL,
} from '../constants/action-types'

// Get types.
import { ModalType } from '../../../styles/components/modal-components' // Modal types.
import {
    FilterAuth,
    FilterTasksList,
    FilterUser,
    FilterToast,
    InitialStateType,
} from '../store-initial-state'
import { Dispatch } from 'redux' // Dispatch type from Redux. (Thunks)

// Import Moment for timestamps and everything related to it.
import moment from 'moment'

// Some of the auth functions provided by Firebase library.
import {
    createUserWithEmailAndPassword as createUser,
    signInWithEmailAndPassword as signInUserEmail,
    signOut as sOut,
    signInWithPopup,
    setPersistence,
    browserSessionPersistence,
} from 'firebase/auth'

// My Firebase config instantiated classes.
import {
    initializedAuth as AuthObj,
    initializedDatabase as dataObj,
    GithubProvider,
} from '../../firebase/firebase-config'

// 🐸: Import of Firebase Realtime Database functions; to set, delete, create and update it.
import {
    child,
    push,
    ref,
    update,
    set,
    get,
    DatabaseReference,
} from 'firebase/database'

// Get error translator (🐸: Just for making code errors legible)
import firebaseErrors from '../../firebase/firebase-error-translator'

// Basically sets the user initial values. (🐸: Used in createUserWithEmailAndPassword and signInWithGithub!)
const setUserBasicValues = (ref: DatabaseReference, userName: string) => {
    set(ref, {
        userName,
    })
}

////// Interface actions.
export function callSnackbar(payload: FilterToast) {
    return { type: SNACKBAR, payload }
}

export function clearSnackbar() {
    return { type: CLEAR_SNACKBAR }
}

export function openModal(type: ModalType) {
    return { type: OPEN_MODAL, payload: { open: true, type } }
}

export function closeModal() {
    return { type: CLOSE_MODAL }
}

////// Auth actions.
export function setAuthUser(payload: FilterAuth | null | string) {
    return { type: SET_AUTHUSER, payload }
}

export function setIsLoading(payload: boolean) {
    return { type: SET_ISLOADING, payload }
}

export function signInEmailAndPassword(email: string, password: string) {
    return async (dispatch: Dispatch) => {
        // Sets loading.
        dispatch(setIsLoading(true))
        // The "setPersistence" function is used to make session stored in the current browser.
        await setPersistence(AuthObj, browserSessionPersistence)
        try {
            // Signs in.
            await signInUserEmail(AuthObj, email, password)
            // Calls snackbar.
            dispatch(callSnackbar({ message: 'Signed in', variant: 'success' }))
        } catch (err: any) {
            // Calls snackbar error.
            dispatch(
                callSnackbar({
                    message:
                        firebaseErrors[err.code as keyof typeof firebaseErrors],
                    variant: 'error',
                })
            )
        }
        // Sets loading.
        dispatch(setIsLoading(false))
    }
}

export function createUserWithEmailAndPassword(
    email: string,
    password: string,
    user: string
) {
    return async (dispatch: Dispatch) => {
        // Sets loading.
        dispatch(setIsLoading(true))
        try {
            // Creates the user. (This function creates and authenticate the user, without the needing to call sign-in function).
            const userCredential = await createUser(AuthObj, email, password)
            // Update user name (creates if it not exists).
            setUserBasicValues(
                ref(dataObj, 'user/' + userCredential.user.uid),
                user
            )
            // Calls snackbar.
            dispatch(callSnackbar({ message: 'Signed in', variant: 'success' }))
        } catch (err: any) {
            // Calls snackbar error.
            dispatch(
                callSnackbar({
                    message:
                        firebaseErrors[err.code as keyof typeof firebaseErrors],
                    variant: 'error',
                })
            )
        }
        // Sets loading.
        dispatch(setIsLoading(false))
    }
}

export function signInWithGithub() {
    return async (dispatch: Dispatch) => {
        // Sets loading.
        dispatch(setIsLoading(true))
        try {
            // Sign-in with popup.
            const userCredential = await signInWithPopup(
                AuthObj,
                GithubProvider
            )
            // Update user name (creates if it not exists).
            const userRef = ref(dataObj, 'user/' + userCredential.user.uid)
            // Check if user already exists.
            const value = await get(userRef)
            if (!value.exists())
                setUserBasicValues(
                    userRef,
                    userCredential.user.displayName as string
                )
            // Calls snackbar.
            dispatch(callSnackbar({ message: 'Signed in', variant: 'success' }))
        } catch (err: any) {
            // Calls snackbar error.
            dispatch(
                callSnackbar({
                    message:
                        firebaseErrors[err.code as keyof typeof firebaseErrors],
                    variant: 'error',
                })
            )
        }
        // Sets loading.
        dispatch(setIsLoading(false))
    }
}

export function signOut() {
    return async (dispatch: Dispatch) => {
        // Sets loading.
        dispatch(setIsLoading(true))
        // Signs out, and then call clear() function.
        await sOut(AuthObj)
        // Clear state.
        dispatch(setAuthUser(null))
        // Sets loading.
        dispatch(setIsLoading(false))
        // Calls snackbar.
        dispatch(callSnackbar({ message: 'Signed out', variant: 'warning' }))
    }
}

////// User actions.
export function setUserInfo(payload: FilterUser) {
    return {
        type: SET_USERINFO,
        payload: {
            userName: payload.userName,
            tasks: payload.tasks == undefined ? null : payload.tasks,
            tasksList:
                payload.tasksList == undefined ? null : payload.tasksList,
        },
    }
}

export function addTasksList(payload: FilterTasksList) {
    return async (dispatch: Dispatch, getState: () => InitialStateType) => {
        // Check if user is authenticated.
        if (
            getState().auth.authUser == null ||
            getState().auth.authUser == 'waiting'
        )
            return

        // 🐸: Get UID of user in state, and then create a new key / id for the new list type.
        // The "push" is to create a new key and the "child" is to reference all the children of
        // "tasksList" property from dynamic database.

        const userUid = getState().auth.authUser['uid']
        const newId = push(
            child(ref(dataObj), 'user/' + userUid + '/tasksList')
        ).key

        // Sets the new task list using update (more reliable).
        await update(ref(dataObj, 'user/' + userUid + '/tasksList/' + newId), {
            ...payload,
            created: moment().toISOString(),
        })
    }
}
