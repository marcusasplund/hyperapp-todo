import {generateUUID} from './util.generate-uuid'

export const addTodo = (model) => model.todos.concat({
    done: false,
    editing: false,
    id: generateUUID(),
    value: model.input
  })