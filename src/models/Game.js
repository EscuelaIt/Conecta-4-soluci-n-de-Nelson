import { Board } from './Board.js'
import { Turn } from './Turn.js'

export class Game {
  #board = new Board()
  #turn

  constructor(numOfPlayers) {
    this.#turn = new Turn(this.#board, numOfPlayers)
  }

  getTurn() {
    return this.#turn
  }

  getBoard() {
    return this.#board
  }
}
