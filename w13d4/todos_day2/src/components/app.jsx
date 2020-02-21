import React from 'react'
import TodoList from './todos/todo_list_container'

const App = props => {
  console.log('app component called with props:', props)
  return (
    <div className="app">
      <h1>Todo App</h1>
      <TodoList />
    </div>
  )
}

export default App
