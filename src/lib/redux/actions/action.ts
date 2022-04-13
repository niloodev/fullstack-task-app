// Import action-types constants. (🐸: Avoid using strings!)
import {
    SET_AUTHUSER,
    SET_ISLOADING,
    SET_USERINFO,
} from '../constants/action-types'

// Get types from initial state and Redux.
import {
    FilterAuth,
    FilterTasksList,
    FilterUser,
    InitialStateType,
} from '../store-initial-state'
import { Dispatch } from 'redux'

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

// Basically sets the user initial values. (🐸: Used in createUserWithEmailAndPassword and signInWithGithub!)
const setUserBasicValues = (ref: DatabaseReference, userName: string) => {
    set(ref, {
        userName,
    })
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
        } catch (err) {
            // Put error here.
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
        } catch (err) {
            // Sets error here.
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
        } catch (err) {
            // Sets error here
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

export function addTasksList(payload: FilterTasksList & { created?: string }) {
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
