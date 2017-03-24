import {h} from 'hyperapp'
import {todoInput} from './view.todo-input'
import {todoList} from './view.todo-list'
import {todoListDone} from './view.todo-list-done'
import {modelDisplay} from './view.model-display'

export const todoMain = (model, actions) => 
  <div class="container">
    <h2>todo <a href="https://github.com/marcusasplund/hyperapp-todo/tree/glitch"><small>source</small></a></h2>
      {todoList(model, actions)}
      {todoInput(model, actions)}
      {todoListDone(model, actions)}
      {modelDisplay(model)}
  </div>
