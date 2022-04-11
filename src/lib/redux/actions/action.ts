// Import action-types constants. (🐸: Avoid using strings!)
import {
    SET_AUTHUSER,
    SET_ISLOADING,
    SET_AUTHFUNCTIONS,
    SET_USERINFO,
} from '../constants/action-types'
import { FilterAuth, FilterUser } from '../store-initial-state'

// Auth actions.
export function setAuthUser(payload: FilterAuth | null | string) {
    return { type: SET_AUTHUSER, payload }
}

export function setIsLoading(payload: boolean) {
    return { type: SET_ISLOADING, payload }
}

export function setAuthFunctions(payload: unknown) {
    return { type: SET_AUTHFUNCTIONS, payload }
}

// User actions.
export function setUserInfo(payload: FilterUser) {
    return { type: SET_USERINFO, payload }
}
