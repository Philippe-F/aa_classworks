import { createStore } from 'redux'
import rootReducer from '../reducers/reducer'  

const configureStore = () => createStore(rootReducer)

const store = configureStore()

export default store 