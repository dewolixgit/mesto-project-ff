export const addEventListenerElements = (elements, event, handler) =>
    elements.forEach(element => element.addEventListener(event, handler))

export const removeEventListenerElements = (elements, event, handler) =>
    elements.forEach(element => element.removeEventListener(event, handler))
