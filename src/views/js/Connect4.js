import { Game } from '../../models/Game.js'
import { UserUiView } from './UserUiView.js'
import { TurnView } from './TurnView.js'

export class Connect4 {
  #game

  #turnView

  constructor() {
    this.#setUpEventListeners()
  }

  initUserInterface() {
    UserUiView.getInstance().drawGetNumberOfPlayers()
  }

  #startNewGame(numOfPlayers) {
    this.#game = new Game(numOfPlayers)
    UserUiView.getInstance().buildBoard(this.#game.getBoard())
    this.#turnView = new TurnView(this.#game.getTurn())
  }

  #setUpEventListeners() {
    window.addEventListener(
      'dropToken',
      (event) => {
        this.#turnView.dropToken(event.detail.column)
      },
      false
    )

    window.addEventListener(
      'startNewGame',
      (event) => {
        this.#startNewGame(event.detail.players)
      },
      false
    )

    window.addEventListener(
      'changeTurn',
      () => {
        this.#turnView.changeTurn()
      },
      false
    )
  }
}

window.onload = () => {
  let connect4 = new Connect4()
  connect4.initUserInterface()
}
