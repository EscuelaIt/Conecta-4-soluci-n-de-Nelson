import { Coordinate } from '../../types/Coordinate.js';

export class BoardView {
  #board;

  constructor(board) {
    this.#board = board;
    document.getElementById('boardMessages').innerHTML = '';
    document.getElementById('board').innerHTML = '';
    const table = document.createElement('table');
    table.id = 'connect4Board';
    this.#createTableHead(table);
    this.#createTableRows(table);
    document.getElementById('board').append(table);
  }

  #createTableHead(table) {
    const tableHeadElement = document.createElement('tr');
    tableHeadElement.id = 'controls';
    for (let i = 0; i < Coordinate.NUMBER_COLUMNS; i++) {
      const newHeadCol = document.createElement('th');
      newHeadCol.id = `Column-${i}`;
      tableHeadElement.append(newHeadCol);
    }
    table.append(tableHeadElement);
  }

  #createTableRows(table) {
    for (let row = Coordinate.NUMBER_ROWS; row > 0; row--) {
      const rowElement = document.createElement('tr');
      rowElement.id = `Row-${row - 1}`;
      table.append(rowElement);
      for (let column = 0; column < Coordinate.NUMBER_COLUMNS; column++) {
        const newCol = document.createElement('td');
        newCol.id = `${column}-${row - 1}`;
        rowElement.append(newCol);
      }
    }
  }

  setControlsCallback(callback) {
    document.querySelectorAll('th').forEach((headElement, columnId) => {
      headElement.addEventListener('click', () => {
        callback(columnId);
      });
    });
  }

  renderToken() {
    const lastToken = this.#board.getLastDrop();
    const color = this.#board.getColor(lastToken).toString();
    document.getElementById(
      `${lastToken.getColumn()}-${lastToken.getRow()}`
    ).style.backgroundImage = `url("../views/images/${color.toLowerCase()}-token.png")`;
  }

  resultActions() {
    const boardMessage = document.getElementById('boardMessages');
    if (this.#board.isWinner()) {
      const color = this.#board.getColor(
        new Coordinate(
          this.#board.getLastDrop().getRow(),
          this.#board.getLastDrop().getColumn()
        )
      );
      boardMessage.innerHTML = `<b style='color: ${color}'>${color}</b> Has won the game!`;
    } else {
      boardMessage.innerHTML = 'Tied!';
    }
  }
}
