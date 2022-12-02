import { EventController } from './EventController.js'
import { BoardUiBuilder } from './BoardUiBuilder.js'

export class UserIOController {
    static TITLE = `--HTML, CSS and Javascript Connect4--`
    static INVALID_COLUMN = `Invalid column`
    static COMPLETED_COLUMN = `This column is full please select other.`
    static PLAYER_WIN = `#color has won this game!`
    static PLAYERS_TIED = `Draw!`

    #grid = [
        [0, 1, 2, 3, 4, 5, 6],
        [0, 1, 2, 3, 4, 5, 6],
        [0, 1, 2, 3, 4, 5, 6],
        [0, 1, 2, 3, 4, 5, 6],
        [0, 1, 2, 3, 4, 5, 6],
        [0, 1, 2, 3, 4, 5, 6],
    ]

    #boardUiBuilder = new BoardUiBuilder(this.#grid)

    static instance

    static getInstance() {
        if (!this.instance) {
            this.instance = new UserIOController()
        }
        return this.instance
    }

    buildBoardControls() {
        this.#boardUiBuilder.buildControls()
    }

    removeBoardControls() {
        this.#boardUiBuilder.removeControls()
    }

    buildBoard() {
        this.#boardUiBuilder.build()
    }

    paintBoardColors(grid) {
        grid.forEach((row, rowNum) => {
            row.forEach((cell, celNum) => {
                document.getElementById(
                    `${rowNum}-${celNum}`
                ).style.background = cell.toString()
            })
        })
    }

    writeMessage(elementId = '', message = '') {
        if (document.getElementById(elementId)) {
            document.getElementById(elementId).innerHTML = message
        } else {
            console.log('Error: Dom Element not Found')
        }
    }

    dragGetNumberOfPlayers() {
        this.#dragModalDialog()
        let modalTitle = document.getElementById('modalTitle')
        modalTitle.innerHTML = `Select an option`
        let modalBody = document.getElementById('modalBody')

        let playerVsPlayerButton = document.createElement('button')
        playerVsPlayerButton.innerText = `Player\nVS\nPlayer`
        EventController.getInstance().setCustomEventListener(
            playerVsPlayerButton,
            'click',
            'setNumOfPlayer',
            { players: 2 }
        )

        let playerVsMachineButton = document.createElement('button')
        playerVsMachineButton.innerText = `Player\nVS\nMachine`
        EventController.getInstance().setCustomEventListener(
            playerVsMachineButton,
            'click',
            'setNumOfPlayer',
            { players: 1 }
        )

        let MachineVsMachineButton = document.createElement('button')
        MachineVsMachineButton.innerText = `Machine\nVS\nMachine`
        EventController.getInstance().setCustomEventListener(
            MachineVsMachineButton,
            'click',
            'setNumOfPlayer',
            { players: 0 }
        )

        modalBody.append(playerVsPlayerButton)
        modalBody.append(playerVsMachineButton)
        modalBody.append(MachineVsMachineButton)
    }

    dragPlayAgainDialog() {
        let body = document.getElementById('boardMessages')
        let modalContainer = document.createElement('div')
        modalContainer.id = 'modalContainer'
        let { modal, modalTitle, modalBody } = this.#getModalContent()
        modalTitle.innerHTML = ``
        modal.style.marginTop = '0px'
        let yesButton = document.createElement('button')
        yesButton.innerText = `Pay again!`
        EventController.getInstance().setCustomEventListenerFunction(
            yesButton,
            'click',
            () => {
                this.removeModal()
                this.dragGetNumberOfPlayers()
            }
        )
        modalBody.append(yesButton)
        modalContainer.append(modal)
        body.append(modalContainer)
    }

    setControlColor(color) {
        const thElements = document.querySelectorAll('th')
        thElements.forEach((th) => {
            th.style.setProperty('--th-background-color', color)
        })
    }

    removeModal() {
        document.getElementById('modalContainer').remove()
    }

    #dragModalDialog() {
        let body = document.getElementById('body')
        let modalContainer = document.createElement('div')
        modalContainer.id = 'modalContainer'
        modalContainer.classList.add('modalContainer')
        let { modal } = this.#getModalContent()
        modalContainer.append(modal)
        body.append(modalContainer)
    }

    #getModalContent() {
        let modal = document.createElement('div')
        modal.id = 'dialogModal'
        let modalTitle = document.createElement('div')
        modalTitle.id = `modalTitle`
        let modalBody = document.createElement('div')
        modalBody.id = `modalBody`
        modal.append(modalTitle)
        modal.append(modalBody)
        modal.classList.add('dialogModal')
        return { modal, modalTitle, modalBody }
    }
}
