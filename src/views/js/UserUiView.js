import { BoardView } from './BoardView.js'

export class UserUiView {
  #boardView = new BoardView()

  static instance

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserUiView()
    }
    return this.instance
  }

  drawGetNumberOfPlayers() {
    let container = document.getElementById('boardMessages')

    let modalContainer = document.createElement('div')
    modalContainer.id = 'modalContainer'
    let { modal, modalBody } = this.#getModalContent()

    let playerVsPlayerButton = document.createElement('button')
    playerVsPlayerButton.innerText = `Player\nVS\nPlayer`
    playerVsPlayerButton.addEventListener('click', () => {
      dispatchEvent(
        new CustomEvent('startNewGame', {
          detail: { players: 2 },
        })
      )
    })

    let playerVsMachineButton = document.createElement('button')
    playerVsMachineButton.innerText = `Player\nVS\nMachine`
    playerVsMachineButton.addEventListener('click', () => {
      dispatchEvent(
        new CustomEvent('startNewGame', {
          detail: { players: 1 },
        })
      )
    })

    let MachineVsMachineButton = document.createElement('button')
    MachineVsMachineButton.innerText = `Machine\nVS\nMachine`
    MachineVsMachineButton.addEventListener('click', () => {
      dispatchEvent(
        new CustomEvent('startNewGame', {
          detail: { players: 0 },
        })
      )
    })

    modalBody.append(playerVsPlayerButton)
    modalBody.append(playerVsMachineButton)
    modalBody.append(MachineVsMachineButton)
    modalContainer.append(modal)
    container.append(modalContainer)
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

  setTurnMessages(color) {
    document.getElementById('boardMessages').innerHTML =
      `Hey <b style='color: #color'>#color</b> Drop your Token in a Column`.replaceAll(
        `#color`,
        `${color}`
      )
    const thElements = document.querySelectorAll('th')
    thElements.forEach((thElement) => {
      thElement.style.setProperty('--th-background-color', color)
    })
  }

  drawWinnerMessage(color) {
    document.getElementById(
      'boardMessages'
    ).innerHTML = `<b style='color: ${color}'>${color}</b> Has won the game!`
  }

  drawResult(color) {
    if (this.#boardView.isWinner()) {
      this.drawWinnerMessage(color)
    } else {
      this.drawMessage('boardMessages', 'Draw!')
    }
  }
  isFinished() {
    return this.#boardView.isFinished()
  }

  drawMessage(elementId, message) {
    document.getElementById(elementId).innerHTML = message
  }

  drawPlayAgainDialog() {
    let container = document.getElementById('boardMessages')
    let modalContainer = document.createElement('div')
    modalContainer.id = 'modalContainer'
    let { modal, modalBody } = this.#getModalContent()
    let yesButton = document.createElement('button')
    yesButton.innerText = `Pay again!`
    yesButton.addEventListener(
      'click',
      () => {
        this.#boardView.reset()
        document.getElementById('boardMessages').innerHTML = ``
        this.drawGetNumberOfPlayers()
      },
      false
    )
    modalBody.append(yesButton)
    modalContainer.append(modal)
    container.append(modalContainer)
  }

  #getModalContent() {
    let modal = document.createElement('div')
    modal.id = 'dialogModal'
    let modalBody = document.createElement('div')
    modalBody.id = `modalBody`
    modal.append(modalBody)
    modal.classList.add('dialogModal')
    return { modal, modalBody }
  }
}
