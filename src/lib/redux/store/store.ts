// redux store configuration (configureStore its the same as createStore, but more abstract)
import { createStore } from 'redux'
// import toDoReducers (one, because its a simple app)
import rootReducer from '../reducers/reducer'
// get wrapper
import { createWrapper } from 'next-redux-wrapper'

// createWrapper is a implementation of redux + nextjs, that basically makes the redux be only initialized
// after server-side building
export default createWrapper(() => {
    return createStore(rootReducer)
})
