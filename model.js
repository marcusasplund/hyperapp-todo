import {getTodos} from './util.local-storage'

const model = {
  input: '',
  placeholder: 'Add new todo',
  todos: getTodos() || []
}

export {model}