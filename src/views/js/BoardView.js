import { Coordinate } from '../../types/Coordinate.js'
import { Dom } from './utils/Dom.js'
import { Event } from './utils/Event.js'

export class BoardView {
  #tableElement

  #board

  build(board) {
    this.#board = board
    this.#tableElement = Dom.createElementWithId('table', 'connect4Board')
    let tableHeadElement = Dom.createElementWithId('tr', '6')
    Dom.appendElementTo(tableHeadElement, this.#tableElement)

    for (let i = 0; i < 7; i++) {
      let newHeadCol = Dom.createElementWithId('th', `Column-${i}-Control`)
      Event.setCustomClickEventHandler(newHeadCol, 'dropToken', { column: i })
      Dom.appendElementTo(newHeadCol, tableHeadElement)
    }

    for (let row = Coordinate.NUMBER_ROWS; row > 0; row--) {
      let rowElement = Dom.createElementWithId('tr', `${row - 1}`)
      Dom.appendElementTo(rowElement, this.#tableElement)

      for (let column = 0; column < Coordinate.NUMBER_COLUMNS; column++) {
        let newCol = Dom.createElementWithId('td', `${row - 1}-${column}`)
        Dom.appendElementTo(newCol, rowElement)
      }
    }
    Dom.appendElementTo(this.#tableElement, Dom.getElementById('board'))
  }

  drawTokenOnBoard() {
    let lastToken = this.#board.getLastDrop()
    let tokenCell = Dom.getElementById(
      `${lastToken.getRow()}-${lastToken.getColumn()}`
    )
    Dom.setBackgroundColor(
      tokenCell,
      this.#board.getColor(
        new Coordinate(lastToken.getRow(), lastToken.getColumn())
      )
    )
  }

  removeControls() {
    let newRow = Dom.createElementWithId('tr', '6')
    for (let i = 0; i < 7; i++) {
      let newCol = Dom.createElementWithId('th', `Column-${i}-Control`)
      Dom.appendElementTo(newCol, newRow)
    }
    this.#tableElement.childNodes[0].replaceWith(newRow)
  }

  isFinished() {
    return this.#board.isFinished()
  }

  isWinner() {
    return this.#board.isWinner()
  }

  reset() {
    this.#tableElement.remove()
  }
}
