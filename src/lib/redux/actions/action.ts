// import action-types constants (avoid using strings)

import {
    SET_TODO,
    SET_AUTHUSER,
    SET_ISLOADING,
    SET_AUTHFUNCTIONS,
} from '../constants/action-types'
import { FilterUser } from '../store-initial-state'

export function setAuthUser(payload: FilterUser | null | string) {
    return { type: SET_AUTHUSER, payload }
}

export function setIsLoading(payload: boolean) {
    return { type: SET_ISLOADING, payload }
}

export function setAuthFunctions(payload: unknown) {
    return { type: SET_AUTHFUNCTIONS, payload }
}

// export first action creator, it sets the toDoListName of the current list.
export function setToDo(payload: string) {
    return { type: SET_TODO, payload }
}
