/* eslint-disable no-unused-vars */
import {h} from 'hyperapp'
import {todoInput} from './todo-input'
import {todoList} from './todo-list'
import {todoListDone} from './todo-list-done'
import {modelDisplay} from './model-display'

export const todoMain = (model, actions) =>
  <div class='container'>
    <header>
      <h2>todo crud&nbsp;
        <a href='https://github.com/marcusasplund/hyperapp-todo/'>
          <small>
          source
          </small>
        </a>
      </h2>
    </header>
    {todoList(model, actions)}
    {todoInput(model, actions)}
    {todoListDone(model, actions)}
    {modelDisplay(model)}
  </div>
