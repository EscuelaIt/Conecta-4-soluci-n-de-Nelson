import { Game } from '../../models/Game.js'
import { UserIOController } from './UserIOController.js'
import { TurnController } from './TurnController.js'
import { BoardUiBuilder } from './BoardUiBuilder.js'
import { EventController } from './EventController.js'

export class Connect4 {
    #game = new Game()
    #boardUiBuilder = new BoardUiBuilder(this.#game.getGrid())
    #turnController = new TurnController(this.#game)

    #player = 0

    constructor() {
        EventController.getInstance().setEventListenerFunction(
            'dropToken',
            (evt) => {
                this.dropToken(evt.detail.column)
            }
        )

        EventController.getInstance().setEventListenerFunction(
            'setNumOfPlayer',
            (evt) => {
                this.setNumberOfPlayers(evt.detail.players)
            }
        )
    }
    getNumberOfPlayers() {
        UserIOController.getInstance().dragGetNumberOfPlayers()
    }

    setNumberOfPlayers(players) {
        this.#boardUiBuilder.build()
        this.#player = players
        this.#playGame()
        UserIOController.getInstance().removeModal()
    }

    paintColors() {
        this.#game.getGrid().forEach((row, rowNum) => {
            row.forEach((cell, celNum) => {
                document.getElementById(
                    `${rowNum}-${celNum}`
                ).style.background = cell.toString()
            })
        })
    }

    isFinished() {
        return this.#game.isFinished()
    }

    #playGame() {
        this.#turnController.resetPlayers(this.#player)
        let color = this.#game.getActivePlayer().getColor()
        UserIOController.getInstance().writeMessage('turn', color)

        UserIOController.getInstance().writeMessage(
            'boardMessages',
            `Hey <b style="color: ${color}">#color</b> Drop your Token in a Column`.replace(
                `#color`,
                color
            )
        )
        UserIOController.getInstance().writeMessage(
            'turnLabel',
            `Current Turn:&nbsp;`
        )
        if (this.#player === 0) {
            this.#boardUiBuilder.removeControls()
            setTimeout(() => this.dropToken(), 300)
        }
    }

    dropToken(column) {
        this.#turnController.dropToken(column)
        if (this.isFinished()) {
            this.#turnController.writeResult()
            this.#boardUiBuilder.removeControls()
            UserIOController.getInstance().dragPlayAgainDialog()
            this.paintColors()
        } else {
            UserIOController.getInstance().writeMessage(
                'turn',
                this.#game.getActivePlayer().getColor().toString()
            )
            this.paintColors()
            this.machineActions()
        }
    }

    machineActions() {
        if (this.#player === 0) {
            setTimeout(() => this.dropToken(), 300)
        }

        if (
            this.#player === 1 &&
            this.#game.getActivePlayer().getColor().toString() === 'Yellow'
        ) {
            this.#boardUiBuilder.removeControls()
            setTimeout(() => {
                this.dropToken()
                this.#boardUiBuilder.buildControls()
            }, 300)
        }
    }
}
let connect4Controller = new Connect4()
connect4Controller.getNumberOfPlayers()
