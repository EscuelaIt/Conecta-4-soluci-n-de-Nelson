import { Game } from '../../models/Game.js'
import { TurnView } from './TurnView.js'
import { BoardView } from './BoardView.js'
import { UserPlayer } from '../../models/UserPlayer.js'

export class GameView {
  #game
  #boardView
  #turnView

  askPlayers() {
    let playerVsPlayer = this.#createNumOfPlayerButton(`Player VS Player`, 2)
    let playerVsMachine = this.#createNumOfPlayerButton(`Player VS Machine`, 1)
    let MachineVsMachine = this.#createNumOfPlayerButton(
      `Machine VS Machine`,
      0
    )

    let modalContainer = document.createElement('div')
    modalContainer.id = 'modalContainer'
    modalContainer.append(playerVsPlayer, playerVsMachine, MachineVsMachine)
    document.getElementById('leftPanel').append(modalContainer)
  }

  #createNumOfPlayerButton(buttonText, numOfPlayers) {
    let numOfPlayerButton = document.createElement('button')
    numOfPlayerButton.innerText = buttonText
    numOfPlayerButton.addEventListener('click', () => {
      document.getElementById('modalContainer').remove()
      this.#startNewGame(numOfPlayers)
    })
    return numOfPlayerButton
  }

  #startNewGame(numOfPlayers) {
    document.getElementById('board').innerHTML = ''
    document.getElementById('boardMessages').innerHTML = ''
    this.#game = new Game(numOfPlayers)
    this.#turnView = new TurnView(this.#game.getTurn())
    this.#boardView = new BoardView(this.#game.getBoard())
    this.#boardView.setControlsCallback(this.dropToken.bind(this))
    if (numOfPlayers === 0) {
      setTimeout(() => {
        this.dropToken()
      }, 300)
    }
  }

  dropToken(column) {
    this.#turnView.dropToken(column)
    this.#boardView.dropToken()
    if (this.#game.isFinished()) {
      this.#boardView.resultActions()
      this.#drawPlayAgainDialog()
    } else {
      if (this.#game.getActivePlayer().constructor.name !== UserPlayer.name) {
        setTimeout(() => {
          this.dropToken()
        }, 300)
      }
    }
  }

  #drawPlayAgainDialog() {
    let playAgainButton = document.createElement('button')
    playAgainButton.innerText = 'Play again!'
    playAgainButton.addEventListener('click', () => {
      document.getElementById('modalContainer').remove()
      this.askPlayers()
    })
    let modalContainer = document.createElement('div')
    modalContainer.id = 'modalContainer'
    modalContainer.append(playAgainButton)
    document.getElementById('leftPanel').append(modalContainer)
  }
}

window.onload = () => {
  new GameView().askPlayers()
}
