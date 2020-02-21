import { createStore } from 'redux'
import rootReducer from '../reducers/reducer'

const configureStore = () => {
  console.log('store is being initialized')
  return createStore(rootReducer())
}

const store = configureStore()

export default store
