import { combineReducers } from 'redux'
import { todoReducer } from './todosReducer'

const rootReducer = () => {
  console.log('root reducer is being initialized')
  return combineReducers({ todos: todoReducer })
}

export default rootReducer
