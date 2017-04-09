/* eslint-disable no-unused-vars */
import {h} from 'hyperapp'
import {RemoveButton} from './remove-button'
import {ToggleButton} from './toggle-button'
import {hasTouchSupport} from '../utils/has-touch-support'

export const TodoItem = (props) =>
  <div> {
  !hasTouchSupport
  ? <div class='row'>
    <div class='column column-15'>
      <RemoveButton actions={props.actions} id={props.todo.id} />
      <ToggleButton actions={props.actions} id={props.todo.id} />
    </div>
    <div
      class={props.todo.done ? 'done column column-85' : 'column column-85'}
      contenteditable
      data-uuid={props.todo.id}
      onkeyup={e => e.keyCode === 13 ? props.actions.editEnter(e) : null}
      oninput={e => (props.todo.value = e.target.textContent)}
      onblur={e => props.actions.edit(e)}>
      {props.todo.value}
    </div>
  </div>
  : <div
    class={props.todo.done ? 'done item row' : 'item row'}
    contenteditable
    data-uuid={props.todo.id}
    onkeyup={e => e.keyCode === 13 ? props.actions.editEnter(e) : null}
    oninput={e => (props.todo.value = e.target.textContent)}
    onblur={e => props.actions.edit(e)}>
    {props.todo.value}
  </div>
} </div>
