import './app.css'
import {app} from 'hyperapp'
import {actions} from './actions'
import {model} from './model'
import {root} from './root'
import {view} from './view'
import {hooks} from './hooks'
import {subscriptions} from './subscriptions'

app({
  actions,
  model,
  root,
  view,
  hooks,
  subscriptions
})