import {h} from 'hyperapp'
import {removeButton} from './view.remove-button'
import {toggleButton} from './view.toggle-button'
import {hasTouchSupport} from './util.has-touch-support'

export const todoItem = (t, actions) => 
<div>
  {!hasTouchSupport ? 
    <div class="item row">
      <div class="column column-15">
        {removeButton(actions, t.id)}
        {toggleButton(actions, t.id)}
      </div>   
      <div class={t.done ? "done column column-85" : "column column-85"}>
        {t.value}
      </div>
    </div> :
    <div id={t.id} class={t.done ? "done row item" : "row item"}>
      {t.value}
    </div> }
</div> 