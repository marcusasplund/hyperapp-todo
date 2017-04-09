/* eslint-disable no-unused-vars */
import {h} from 'hyperapp'
import {TodoItem} from './todo-item'

export const TodoListDone = (props) =>
  <div id='todo-list-done'>
    {
        props.model.todos
        .filter(t => t.done)
        .map(t => <TodoItem todo={t} actions={props.actions} />)
    }
  </div>
