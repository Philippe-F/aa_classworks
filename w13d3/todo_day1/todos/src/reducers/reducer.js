import { combineReducers } from 'redux'
import { todoReducer } from './todosReducer'

// const rootReducer = (state = {}, action) => {
//     return {
//       todos: todoReducer(state.todos, action),
//     };
// };
const rootReducer = combineReducers({todos: todoReducer})

export default rootReducer