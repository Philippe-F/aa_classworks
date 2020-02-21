import React from 'react'

const TodoListItem = ({ todo }) => {
  console.log('todo list item component called with props:', todo)
  return <li>{todo.title}</li>
}

const TodoList = props => {
  console.log('todo list component called with props:', props)
  return (
    <ul>
      {props.todos.map(todo, idx => (
        <TodoListItem key={idx} todo={todo} />
      ))}
    </ul>
  )
}

export default TodoList
