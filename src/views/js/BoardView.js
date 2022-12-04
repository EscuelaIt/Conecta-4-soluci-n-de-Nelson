import { Coordinate } from '../../types/Coordinate.js'

export class BoardView {
  #tableElement

  #board

  build(board) {
    this.#board = board
    this.#tableElement = document.createElement('table')
    let tableHeadElement = document.createElement('tr')
    tableHeadElement.id = `6`
    this.#tableElement.append(tableHeadElement)
    for (let i = 0; i < 7; i++) {
      let newHeadCol = document.createElement('th')
      newHeadCol.id = `Column-${i}-Control`
      newHeadCol.addEventListener('click', () => {
        dispatchEvent(
          new CustomEvent('dropToken', {
            detail: { column: i },
          })
        )
      })
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

  drawTokenOnBoard() {
    let lastToken = this.#board.getLastDrop()
    let tokenCell = document.getElementById(
      `${lastToken.getRow()}-${lastToken.getColumn()}`
    )
    tokenCell.style.background = this.#board.getColor(
      new Coordinate(lastToken.getRow(), lastToken.getColumn())
    )
  }

  removeControls() {
    let newRow = document.createElement('tr')
    newRow.id = `6`
    for (let i = 0; i < 7; i++) {
      let newCol = document.createElement('th')
      newCol.id = `Column-${i}-Control`
      newRow.append(newCol)
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
