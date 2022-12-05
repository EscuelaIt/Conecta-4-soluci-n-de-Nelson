import { BoardView } from './BoardView.js'
import { Dom } from './utils/Dom.js'
import { Event } from './utils/Event.js'

export class UserUiView {
  #boardView = new BoardView()

  static instance

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserUiView()
    }
    return this.instance
  }

  buildBoard(board) {
    this.#boardView.build(board)
  }

  drawTokenOnBoard() {
    this.#boardView.drawTokenOnBoard()
  }

  removeBoardControls() {
    this.#boardView.removeControls()
  }

  drawGetNumberOfPlayers() {
    let playerVsPlayer = Dom.createButton(`Player\nVS\nPlayer`)
    Event.setCustomClickEventHandler(playerVsPlayer, 'startNewGame', {
      numOfPlayers: 2,
    })

    let playerVsMachine = Dom.createButton(`Player\nVS\nMachine`)
    Event.setCustomClickEventHandler(playerVsMachine, 'startNewGame', {
      numOfPlayers: 1,
    })

    let MachineVsMachine = Dom.createButton(`Machine\nVS\nMachine`)
    Event.setCustomClickEventHandler(MachineVsMachine, 'startNewGame', {
      numOfPlayers: 0,
    })

    let modal = Dom.createElementWithId('div', 'dialogModal')
    Dom.appendElementsTo(
      [playerVsPlayer, playerVsMachine, MachineVsMachine],
      modal
    )

    let modalContainer = Dom.createElementWithId('div', 'modalContainer')
    Dom.appendElementTo(modal, modalContainer)

    let container = Dom.getElementById('boardMessages')
    Dom.appendElementTo(modalContainer, container)
  }

  setTurnMessages(color) {
    Dom.setHtmlTextToElementId(
      'boardMessages',
      `Hey <b style='color: #color'>#color</b> Drop your Token in a Column`.replaceAll(
        `#color`,
        `${color}`
      )
    )

    Dom.getElementsByQuery('th').forEach((thElement) => {
      thElement.style.setProperty('--th-background-color', color)
    })
  }

  resultActions(color) {
    if (this.#boardView.isWinner()) {
      Dom.setHtmlTextToElementId(
        'boardMessages',
        `<b style='color: ${color}'>${color}</b> Has won the game!`
      )
    } else {
      Dom.setHtmlTextToElementId('boardMessages', 'Tied!')
    }
    this.removeBoardControls()
    this.drawPlayAgainDialog()
  }

  isFinished() {
    return this.#boardView.isFinished()
  }

  drawPlayAgainDialog() {
    let container = Dom.getElementById('boardMessages')
    let modalContainer = Dom.createElementWithId('div', 'modalContainer')

    let modal = Dom.createElementWithId('div', 'dialogModal')

    let yesButton = Dom.createButton(`Pay again!`)
    Event.setEventHandler(yesButton, 'click', () => {
      this.#boardView.reset()
      Dom.setHtmlTextToElementId('boardMessages', '')
      this.drawGetNumberOfPlayers()
    })

    Dom.appendElementTo(yesButton, modal)
    Dom.appendElementTo(modal, modalContainer)
    Dom.appendElementTo(modalContainer, container)
  }

  drawMessage(message) {
    Dom.setHtmlTextToElementId('boardMessages', message)
  }
}
