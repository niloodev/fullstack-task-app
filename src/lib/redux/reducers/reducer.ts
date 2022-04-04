// import AnyAction type from redux, and some action-types
import { AnyAction } from 'redux'
import { SET_TODO } from '../constants/action-types'

import InitialState from '../store-initial-state'

// basic reducer
function rootReducer(state = InitialState, action: AnyAction) {
    switch (action.payload) {
        case SET_TODO:
            // action.payload is toDo name
            return { ...state, toDo: action.payload }
            break
    }

    return state
}

export default rootReducer
