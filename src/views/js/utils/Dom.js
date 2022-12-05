export class Dom {
  static createElementWithId(elementTag, elementId) {
    let tagElement = document.createElement(elementTag)
    tagElement.id = elementId
    return tagElement
  }

  static createButton(buttonText) {
    let button = document.createElement('button')
    button.innerText = buttonText
    return button
  }

  static getElementById(elementId) {
    return document.getElementById(elementId)
  }

  static setHtmlTextToElementId(elementId, htmlText) {
    this.getElementById(elementId).innerHTML = htmlText
  }

  static getElementsByQuery(queryElementTag) {
    return document.querySelectorAll(queryElementTag)
  }

  static appendElementsTo(elements, appendTo) {
    elements.forEach((element) => {
      appendTo.append(element)
    })
  }

  static appendElementTo(element, appendTo) {
    appendTo.append(element)
  }

  static setBackgroundColor(element, color) {
    element.style.background = color
  }
}
