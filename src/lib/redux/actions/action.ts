// import action-types constants (avoid using strings)
import { SET_TODO } from '../constants/action-types'

// export first action creator, it sets the toDoListName of the current list.
export function setToDo(payload: string) {
    return { type: SET_TODO, payload }
}
