/* eslint-disable no-unused-vars */
import {h} from 'hyperapp'
import {TodoItem} from './todo-item'

export const TodoListDone = ({state, actions}) =>
  <div id='todo-list-done'>
    {
        state.todos
        .filter(t => t.done)
        .map(t => <TodoItem todo={t} actions={actions} />)
    }
  </div>
