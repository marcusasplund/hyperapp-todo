import {addTodo} from '../actions/add-todo'
import {removeTodo} from '../actions/remove-todo'
import {toggleTodo} from '../actions/toggle-todo'

export const actions = {
  add: model => ({
    input: '',
    todos: addTodo(model)
  }),
  input: (model, {value}) => ({
    input: value
  }),
  remove: (model, id) => ({
    todos: removeTodo(model, id)
  }),
  toggle: (model, id) => ({
    todos: toggleTodo(model, id)
  })
}
