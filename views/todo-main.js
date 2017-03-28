import {h} from 'hyperapp'
import {todoInput} from '../views/todo-input'
import {todoList} from '../views/todo-list'
import {todoListDone} from '../views/todo-list-done'
import {modelDisplay} from '../views/model-display'

export const todoMain = (model, actions) =>
  <div class='container'>
    <h2>todo <a href='https://github.com/marcusasplund/hyperapp-todo/'><small>source</small></a></h2>
    {todoList(model, actions)}
    {todoInput(model, actions)}
    {todoListDone(model, actions)}
    {modelDisplay(model)}
  </div>
