export class EventController {
    static instance

    static getInstance() {
        if (!this.instance) {
            this.instance = new EventController()
        }
        return this.instance
    }

    setEventListenerFunction(eventType = '', callback = () => {}) {
        window.addEventListener(eventType, callback, false)
    }

    setCustomEventListenerFunction(
        element = undefined,
        eventType = '',
        callback = () => {}
    ) {
        element.addEventListener(eventType, callback, false)
    }

    setCustomEventListener(
        element = undefined,
        eventType = 'click',
        eventName = '',
        eventObject = {}
    ) {
        element.addEventListener(
            eventType,
            () => {
                globalThis.dispatchEvent(
                    new CustomEvent(eventName, {
                        detail: eventObject,
                    })
                )
            },
            false
        )
    }
}
