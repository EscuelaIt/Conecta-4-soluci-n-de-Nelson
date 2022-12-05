export class Event {
  static setEventHandler(listener, eventType, callback) {
    listener.addEventListener(eventType, callback, false)
  }

  static setCustomClickEventHandler(listener, customEvent, details) {
    this.setEventHandler(listener, 'click', () => {
      dispatchEvent(new CustomEvent(customEvent, { detail: details }))
    })
  }
}
