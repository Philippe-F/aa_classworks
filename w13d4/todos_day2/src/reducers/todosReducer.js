import { RECEIVE_TODO, RECEIVE_TODOS } from '../actions/todoAction'

const initialState = {
  1: {
    id: 1,
    title: 'wash car',
    body: 'with soap',
    done: false,
  },
  2: {
    id: 2,
    title: 'wash dog',
    body: 'with shampoo',
    done: true,
  },
}

export const todoReducer = (state = initialState, action) => {
  console.log('todo reducer has been called')
  switch (action.type) {
    case RECEIVE_TODO:
      return { ...state, [action.todo.id]: action.todo }
    case RECEIVE_TODOS:
      return Object.assign({}, state, action.todos)
    default:
      console.log('default state being returned')
      return state
  }
}
