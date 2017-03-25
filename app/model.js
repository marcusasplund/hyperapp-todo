import {getTodos} from '../utils/local-storage'

const model = {
  input: '',
  placeholder: 'Add new todo',
  todos: getTodos() || []
}

export {model}
