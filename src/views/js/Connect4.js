import { Game } from '../../models/Game.js'
import { UserUiView } from './UserUiView.js'
import { TurnView } from './TurnView.js'
import { Event } from './utils/Event.js'

export class Connect4 {
  #game

  #turnView

  constructor() {
    Event.setEventHandler(window, 'dropToken', (event) => {
      this.#turnView.dropToken(event.detail.column)
    })

    Event.setEventHandler(window, 'startNewGame', (event) => {
      this.#startNewGame(event.detail.players)
    })

    Event.setEventHandler(window, 'changeTurn', (event) => {
      this.#turnView.changeTurn()
    })
  }

  initUserInterface() {
    UserUiView.getInstance().drawGetNumberOfPlayers()
  }

  #startNewGame(numOfPlayers) {
    this.#game = new Game(numOfPlayers)
    UserUiView.getInstance().buildBoard(this.#game.getBoard())
    this.#turnView = new TurnView(this.#game.getTurn())
  }
}

window.onload = () => {
  let connect4 = new Connect4()
  connect4.initUserInterface()
}
