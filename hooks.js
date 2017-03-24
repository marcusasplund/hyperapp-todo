import {setTodos} from './util.local-storage'

export const hooks = {
    onUpdate: (oldModel, newModel, data) => 
      setTodos(newModel.todos)
  }