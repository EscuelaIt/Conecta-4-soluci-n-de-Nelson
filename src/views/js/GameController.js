import { Game } from '../../models/Game.js'
import { UserIOController } from './UserIOController.js'
import { TurnController } from './TurnController.js'
import { BoardController } from './BoardController.js'
import { EventController } from './EventController.js'

export class GameController {
    #game = new Game()
    #boardView = new BoardController(this.#game.getGrid())
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
        let color = this.#game.getActivePlayer().getColor();
        UserIOController.getInstance().writeMessage(
            'turn',
            color
        )

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
    }

    dropToken(column) {
        this.#turnController.dropToken(column)
        if (this.isFinished()) {
            this.#turnController.writeResult()
            this.#boardView.removeControls()
            UserIOController.getInstance().dragPlayAgainDialog()
            this.paintColors()
        } else {
            UserIOController.getInstance().writeMessage(
                'turn',
                this.#game.getActivePlayer().getColor().toString()
            )
            this.paintColors()
        }
    }

    getNumberOfPlayers() {
        UserIOController.getInstance().dragGetNumberOfPlayers()
    }

    setNumberOfPlayers(players) {
        this.#boardView.build()
        this.#player = players
        this.#playGame()
        UserIOController.getInstance().removeModal()
    }
}
let connect4Controller = new GameController()
connect4Controller.getNumberOfPlayers()
