import {h} from 'hyperapp'
import {todoItem} from '../views/todo-item'
import {hasTouchSupport} from '../utils/has-touch-support'

export const todoList = (model, actions) =>
  <div id='todo-list'>
    {hasTouchSupport
       ? <p><small>swipe left to toggle, right to remove, tap to edit</small></p>
       : null}
    {
        model.todos
        .filter(t => !t.done)
        .map(t => todoItem(t, actions))
      }
  </div>
