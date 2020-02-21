export const allTodos = ({ todos }) => {
  return Object.keys(todos).map(key => todos[key].id)
}
