import {defineEvents, bindEvents} from './util.hyper-tap'

export const subscriptions = [
    (model, actions) => {
      defineEvents([
        {
          element: '#todo-list',
          targetEl: '.item',
          event: 'swipeleft',
          callback: actions.toggle.bind(model)
        },
        {
          element: '#todo-list',
          targetEl: '.item',
          event: 'swiperight',
          callback: actions.remove.bind(model)
        },
        {
          element: '#todo-list-done',
          targetEl: '.item',
          event: 'swipeleft',
          callback: actions.toggle.bind(model)
        },
        {
          element: '#todo-list-done',
          targetEl: '.item',
          event: 'swiperight',
          callback: actions.remove.bind(model)
        }
      ])
      bindEvents(model, actions)
    }
  ]
