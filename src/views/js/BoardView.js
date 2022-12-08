import { Coordinate } from '../../types/Coordinate.js'

export class BoardView {
  #board
  #tableElement
  constructor(board) {
    this.#board = board
    this.build()
  }

  build() {
    this.#tableElement = document.createElement('table')
    this.#tableElement.id = 'connect4Board'
    let tableHeadElement = document.createElement('tr')
    tableHeadElement.id = 'controls'
    this.#tableElement.append(tableHeadElement)
    for (let i = 0; i < Coordinate.NUMBER_COLUMNS; i++) {
      let newHeadCol = document.createElement('th')
      newHeadCol.id = `Column-${i}-Control`
      tableHeadElement.append(newHeadCol)
    }
    for (let row = Coordinate.NUMBER_ROWS; row > 0; row--) {
      let rowElement = document.createElement('tr')
      rowElement.id = `${row - 1}`
      this.#tableElement.append(rowElement)
      for (let column = 0; column < Coordinate.NUMBER_COLUMNS; column++) {
        let newCol = document.createElement('td')
        newCol.id = `${row - 1}-${column}`
        rowElement.append(newCol)
      }
    }
    document.getElementById('board').append(this.#tableElement)
  }

  setControlsCallback(callback) {
    document.querySelectorAll('th').forEach((headElement, key) => {
      headElement.addEventListener('click', () => {
        callback(key)
      })
    })
  }

  removeControls() {
    let tableHeadElement = document.createElement('tr')
    tableHeadElement.id = 'controls'
    for (let i = 0; i < Coordinate.NUMBER_COLUMNS; i++) {
      let newHeadCol = document.createElement('th')
      newHeadCol.id = `Column-${i}-Control`
      tableHeadElement.append(newHeadCol)
    }
    document.getElementById('controls').replaceWith(tableHeadElement)
  }

  dropToken() {
    let lastToken = this.#board.getLastDrop()
    document.getElementById(
      `${lastToken.getRow()}-${lastToken.getColumn()}`
    ).style.background = this.#board
      .getColor(new Coordinate(lastToken.getRow(), lastToken.getColumn()))
      .toString()
  }

  resultActions() {
    let lastToken = this.#board.getLastDrop()
    let color = this.#board.getColor(
      new Coordinate(lastToken.getRow(), lastToken.getColumn())
    )
    if (this.#board.isWinner()) {
      document.getElementById(
        'boardMessages'
      ).innerHTML = `<b style='color: ${color}'>${color}</b> Has won the game!`
    } else {
      document.getElementById('boardMessages').innerHTML = 'Tied!'
    }
    this.removeControls()
  }
}
