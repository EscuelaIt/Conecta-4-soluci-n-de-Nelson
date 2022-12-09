import { Game } from '../../models/Game.js'
import { TurnView } from './TurnView.js'
import { BoardView } from './BoardView.js'
import { UserPlayer } from '../../models/UserPlayer.js'
import { assert } from '../../utils/assert.js'

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

    let buttonsContainer = document.createElement('div')
    buttonsContainer.id = 'buttonsContainer'
    buttonsContainer.append(playerVsPlayer, playerVsMachine, MachineVsMachine)
    document.getElementById('leftPanel').append(buttonsContainer)
  }

  #createNumOfPlayerButton(buttonText, numOfUsersPlayer) {
    let numOfPlayerButton = document.createElement('button')
    numOfPlayerButton.innerText = buttonText
    numOfPlayerButton.addEventListener('click', () => {
      document.getElementById('buttonsContainer').remove()
      this.#startNewGame(numOfUsersPlayer)
    })
    return numOfPlayerButton
  }

  #startNewGame(numOfUsersPlayer) {
    this.#game = new Game(numOfUsersPlayer)
    this.#turnView = new TurnView(this.#game.getTurn())
    this.#boardView = new BoardView(this.#game.getBoard())
    if (numOfUsersPlayer === 0) {
      this.#dropToken()
    } else {
      this.#boardView.setControlsCallback(this.#dropToken.bind(this))
    }
  }

  #dropToken(column) {
    assert(!this.#game.isWinner())
    this.#turnView.dropToken(column)
    this.#boardView.dropToken()

    if (this.#game.isFinished()) {
      this.#boardView.resultActions()
      this.#drawPlayAgainDialog()
    } else {
      if (!(this.#game.getActivePlayer() instanceof UserPlayer)) {
        setTimeout(() => {
          this.#dropToken()
        }, 300)
      }
    }
  }

  #drawPlayAgainDialog() {
    let playAgainButton = document.createElement('button')
    playAgainButton.innerText = 'Play again!'
    let buttonsContainer = document.createElement('div')
    buttonsContainer.id = 'buttonsContainer'
    buttonsContainer.append(playAgainButton)
    document.getElementById('leftPanel').append(buttonsContainer)
    playAgainButton.addEventListener('click', () => {
      document.getElementById('buttonsContainer').remove()
      new GameView().askPlayers()
    })
  }
}

window.onload = () => {
  new GameView().askPlayers()
}
