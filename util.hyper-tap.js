var eventCache = []
window.eventCache = eventCache

export function defineEvents(options) {
  if (Array.isArray(options)) {
    options.forEach(function(event) {
      eventCache.push(event)
    })
  } else {
    eventCache.push({
      event: options.event,
      element: options.element,
      targetEl: options.targetEl,
      callback: options.callback
    })
  }
}

export function bindEvents(model, actions) {

  // Event delegator:
  function delegate(element, event, targetEl, callback, position) {
    var delegateEl
    if (!element) element = 'body'
    if (typeof element === 'string') {
      delegateEl = document.querySelector(element)
    } else if (element.nodeName) {
      delegateEl = element
    }
    var eventListener = function(e) {
      var target = e.target
      var elements = Array.prototype.slice.apply(delegateEl.querySelectorAll(targetEl))
      do {
        var len = elements.length
        for (var i = 0; i < len; i++) {
          if (target === elements[i]) {
            callback.call(elements[i], e, model, actions)
            break
          }
        }
      } while (target = target.parentNode)
    }
    eventCache[position].delegatedCallback = callback
    /**
     * Since eventListener wraps the provided callback for event delegation, make it the callback in eventCache to enable unbinding.
     */
    eventCache[position].callback = eventListener
    // And then bind eventListener as the callback:
    delegateEl.addEventListener(event, eventListener)
  }

  eventCache.forEach(function(evt, idx) {
    var el
    if (typeof evt.element === 'string') {
      el = document.querySelector(evt.element)
    } else {
      el = document.querySelector('body')
    }
    if (evt.targetEl) {
      delegate(evt.element, evt.event, evt.targetEl, evt.callback, idx)
    } else {
      var callback = function(e) {
        evt.callback.call(el, e, model, actions)
      }
      el.addEventListener(evt.event, evt.callback)
    }
  })
}

export function unbindEvent(element, event, callback) {
  var el
  if (typeof element === 'string') {
    el = document.querySelector(element)
  } else if (element && element.nodeName) {
    el = element
  } else {
    return
  }
  if (!event) {
    var clen = eventCache.length
    if (clen < 1) return
    for (var ci = clen; ci > 0; ci--) {
      if (eventCache[ci] && eventCache[ci].element === element) {
        el.removeEventListener(eventCache[ci].event, eventCache[ci].callback)
        eventCache.splice(ci, 1)
      }
    }
  } else if (event && !callback) {
    var position = -1
    var clen = eventCache.length
    for (var ci = 0; ci < clen; ci++) {
      if (eventCache[ci] && eventCache[ci].element === element && eventCache[ci].event === event) {
        try {
          el.removeEventListener(eventCache[ci].event, eventCache[ci].callback)
          eventCache.splice(parseInt(ci, 10),1)
        } catch(err) {}
      }
    }
  } else if (element && event && callback) {
    var position = -1
    var clen = eventCache.length
    for (var ci = 0; ci < clen; ci++) {
      if (eventCache[ci].element === element && eventCache[ci].event === event && eventCache[ci].delegatedCallback && eventCache[ci].delegatedCallback === callback) {
        position = ci
      } else if (eventCache[ci].element === element && eventCache[ci].event === event && eventCache[ci].callback === callback) {
        position = ci
        break
      }
    }
    if (position === -1) return
    el.removeEventListener(eventCache[position].event, eventCache[position].callback)
    eventCache.splice(position, 1)
  } else {
    return
  }
}

//////////////////////////////
// GESTURES:
//////////////////////////////
/**
 * Event aliases for desktop and mobile:
 */
let eventStart, eventEnd, eventMove, eventCancel

// Pointer events for IE11 and MSEdge:
if (window.navigator.pointerEnabled) {
  eventStart = 'pointerdown';
  eventEnd = 'pointerup';
  eventMove = 'pointermove';
  eventCancel = 'pointercancel';
// Pointer events for IE10 and WP8:
} else if (window.navigator.msPointerEnabled) {
  eventStart = 'MSPointerDown';
  eventEnd = 'MSPointerUp';
  eventMove = 'MSPointerMove';
  eventCancel = 'MSPointerCancel';
// Touch events for iOS & Android:
} else if ('ontouchstart' in window) {
  eventStart = 'touchstart';
  eventEnd = 'touchend';
  eventMove = 'touchmove';
  eventCancel = 'touchcancel';
// Mouse events for desktop:
} else {
  eventStart = 'mousedown';
  eventEnd = 'click';
  eventMove = 'mousemove';
  eventCancel = 'mouseout';
}
export {eventStart, eventEnd, eventMove, eventCancel}

// Delegate Events:
function delegateTheEvent(options) {
  var element = options.element
  var root = options.root || document.body
  var type = options.type
  var callback = options.callback
  if (typeof root === 'string') root = document.querySelector(root)
  var eventListener = function(e) {
    var target = e.target
    var elements
    if (element.nodeType) elements = [element]
    else elements = Array.prototype.slice.apply(root.querySelectorAll(element))
    do {
      var len = elements.length
      for (var i = 0; i < len; i++) {
        if (target === elements[i]) {
          callback.call(elements[i], e)
          break
        }
      }
    } while (target = target.parentNode)
  }
  root.addEventListener(type, eventListener)
}

// Fire gesture on element:
export function trigger(el, event, data) {
  if (!event) {
    console.error('No event was provided. You do need to provide one.')
    return
  }
  if (typeof el === 'string') el = document.querySelector(el)
  if (document.createEvent) {
    var evtObj = document.createEvent('Events')
    evtObj.initEvent(event, true, false)
    evtObj.data = data
    el.dispatchEvent(evtObj)
  }
}

var enableGestures = function() {
  var touch = {}
  var touchTimeout
  var swipeTimeout
  var tapTimeout
  var longTapDelay = 750
  var singleTapDelay = 150
  var gestureLength = 20
  if (/android/img.test(navigator.userAgent)) singleTapDelay = 200
  var longTapTimeout

  function parentIfText(node) {
    return 'tagName' in node ? node : node.parentNode
  }

  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >=
      Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down')
  }

  function longTap() {
    longTapTimeout = null
    if (touch.last) {
      try {
        if (touch && touch.el) {
          trigger(touch.el, 'longtap')
          touch = {}
        }
      } catch (err) {}
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout)
    longTapTimeout = null
  }

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout)
    if (tapTimeout) clearTimeout(tapTimeout)
    if (swipeTimeout) clearTimeout(swipeTimeout)
    if (longTapTimeout) clearTimeout(longTapTimeout)
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
    touch = {}
  }

  /**
   * Execute this after DOM loads:
   */
  (function() {
    var now
    var delta
    var body = document.body
    var twoTouches = false

    /**
     * Capture start of event:
     */
    body.addEventListener(eventStart, function(e) {
      now = Date.now()
      delta = now - (touch.last || now)
      if (e.originalEvent) e = e.originalEvent

      if (eventStart === 'mousedown') {
        touch.el = parentIfText(e.target)
        if (e.target.nodeName === 'ripple') {
          touch.el = e.target.parentNode
        }
        touchTimeout && clearTimeout(touchTimeout)
        touch.x1 = e.pageX
        touch.y1 = e.pageY
        twoTouches = false

      /**
       * Detect two or more finger gestures:
       */
      } else {
        if (e.touches.length === 1) {
          if (!!e.target.disabled) return
          touch.el = parentIfText(e.touches[0].target)
          touchTimeout && clearTimeout(touchTimeout)
          touch.x1 = e.touches[0].pageX
          touch.y1 = e.touches[0].pageY
          if (e.targetTouches.length === 2) {
            twoTouches = true
          } else {
            twoTouches = false
          }
        }
      }

      if (delta > 0 && delta <= 450) {
        touch.isDoubleTap = true
      }
      touch.last = now
      longTapTimeout = setTimeout(longTap, longTapDelay)
    })

    /**
     * Capture event move:
     */
    body.addEventListener(eventMove, function(e) {
      if (e.originalEvent) e = e.originalEvent
      cancelLongTap()
      if (eventMove === 'mousemove') {
        touch.x2 = e.pageX
        touch.y2 = e.pageY
      } else {
        /**
         * One finger gesture:
         */
        if (e.touches.length === 1) {
          touch.x2 = e.touches[0].pageX
          touch.y2 = e.touches[0].pageY
          touch.move = true
        }
      }
    })

    /**
     * Capture event end:
     */
    body.addEventListener(eventEnd, function(e) {

      cancelLongTap()
      if (!!touch.el) {
        /**
         * Swipe detection:
         */
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > gestureLength) ||
          (touch.y2 && Math.abs(touch.y1 - touch.y2) > gestureLength)) {
          swipeTimeout = setTimeout(function() {
            if (touch && touch.el) {
              trigger(touch.el, 'swipe')
              trigger(touch.el, 'swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
              touch = {}
            }
          }, 0)

        /**
         * Normal tap:
         */
        } else if ('last' in touch) {
          /**
           * Delay by one tick so we can cancel the 'tap' event if 'scroll' fires:
           */
          tapTimeout = setTimeout(function() {
            /**
             * Trigger double tap immediately:
             */
            if (touch && touch.isDoubleTap) {
              if (touch && touch.el) {
                trigger(touch.el, 'doubletap')
                e.preventDefault()
                touch = {}
              }

            } else {
              /**
               * Trigger tap after singleTapDelay:
               */
              touchTimeout = setTimeout(function() {
                touchTimeout = null
                if (touch && touch.el && !touch.move) {
                  trigger(touch.el, 'tap')
                  touch = {}

                } else {
                  /**
                   * Touch moved so cancel tap:
                   */
                  cancelAll()
                }
              }, singleTapDelay)
            }
          }, 0)
        }

      } else {
        return
      }
    })
    body.addEventListener('touchcancel', cancelAll)
  })()
}
enableGestures()