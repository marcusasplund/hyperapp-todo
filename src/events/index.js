import {storeStateInStorage} from '../utils/local-storage'
import {defineEvents, bindEvents} from '../utils/hyper-tap'

export const events = {
  render: (state) =>
    storeStateInStorage(state),
  loaded: (state, actions) => {
    defineEvents([
      {
        element: '#todo-list',
        targetEl: '.item',
        event: 'swipeleft',
        callback: actions.toggle.bind(state)
      },
      {
        element: '#todo-list',
        targetEl: '.item',
        event: 'swiperight',
        callback: actions.remove.bind(state)
      },
      {
        element: '#todo-list-done',
        targetEl: '.item',
        event: 'swipeleft',
        callback: actions.toggle.bind(state)
      },
      {
        element: '#todo-list-done',
        targetEl: '.item',
        event: 'swiperight',
        callback: actions.remove.bind(state)
      }
    ])
    bindEvents(state, actions)
  }
}
