/* eslint-disable no-unused-vars */
import {h} from 'hyperapp'
import {TodoItem} from './todo-item'
import {hasTouchSupport} from '../utils/has-touch-support'

export const TodoList = ({model, actions}) =>
  <div id='todo-list'>
    {hasTouchSupport
       ? <p><small>swipe left to toggle, right to remove, tap to edit</small></p>
       : null}
    {
        model.todos
        .filter(t => !t.done)
        .map(t => <TodoItem todo={t} actions={actions} />)
      }
  </div>
