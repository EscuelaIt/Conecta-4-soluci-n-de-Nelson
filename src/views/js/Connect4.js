import { Game } from '../../models/Game.js'
import { UserUiView } from './UserUiView.js'
import { TurnView } from './TurnView.js'
import { Event } from './utils/Event.js'

export class Connect4 {
  #turnView

  initUserInterface() {
    UserUiView.getInstance().drawGetNumberOfPlayers()
    Event.setEventHandler(window, 'startNewGame', (event) => {
      this.#startNewGame(event.detail.numOfPlayers)
    })

    Event.setEventHandler(window, 'dropToken', (event) => {
      this.#turnView.dropToken(event.detail.column)
    })

    Event.setEventHandler(window, 'changeTurn', (event) => {
      this.#turnView.changeTurn()
    })
  }

  #startNewGame(numOfPlayers) {
    let game = new Game(numOfPlayers)
    UserUiView.getInstance().buildBoard(game.getBoard())
    this.#turnView = new TurnView(game.getTurn())
  }
}

window.onload = () => {
  let connect4 = new Connect4()
  connect4.initUserInterface()
}
