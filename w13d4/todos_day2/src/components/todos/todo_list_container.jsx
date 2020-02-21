import { connect } from 'react-redux'
import TodoList from './todo_list'
import { allTodos } from '../../reducers/selectors'
import { receiveTodo } from '../../actions/todoAction'

const mapStateToProps = state => {
  return { todos: allTodos(state) }
}

const mapDispatchToProps = dispatch => ({
  receiveTodo: todo => dispatch(receiveTodo(todo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
