// Redux store configuration. (🐸: "configureStore" its the same as createStore, but more complete)
import { configureStore } from '@reduxjs/toolkit'
// Import toDoReducers (🐸: Just one, because its a simple app)
import rootReducer from '../reducers/reducer'
// Get Next + Redux wrapper.
import { createWrapper } from 'next-redux-wrapper'

// 🐸: "createWrapper" is a implementation of Redux + Next, that basically makes the Redux be only initialized
// after server-side building.
export default createWrapper(() => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredPaths: ['auth'],
                },
            }),
    })
})
