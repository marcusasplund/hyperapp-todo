/* eslint-disable no-unused-vars */
import {h} from 'hyperapp'
import {TodoItem} from './todo-item'
import {hasTouchSupport} from '../utils/has-touch-support'

export const TodoList = ({state, actions}) =>
  <div id='todo-list'>
    {hasTouchSupport
       ? <p><small>swipe left to toggle, right to remove, tap to edit</small></p>
       : null}
    {
        state.todos
        .filter(todo => !todo.done)
        .map(todo => <TodoItem todo={todo} actions={actions} />)
      }
  </div>
