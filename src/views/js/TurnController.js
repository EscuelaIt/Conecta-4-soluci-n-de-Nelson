import { UserPlayerController } from './UserPlayerController.js'
import { MachinePlayerController } from './MachinePlayerController.js'
import { UserIOController } from './UserIOController.js'
import { EventController } from './EventController.js'

export class TurnController {
    #game

    #column

    constructor(game) {
        this.#game = game
        EventController.getInstance().setEventListenerFunction(
            'changeTurn',
            () => {
                this.#changeTurnActions()
            }
        )
    }

    resetPlayers(userPlayers) {
        if (isNaN(userPlayers) || userPlayers < 0 || userPlayers > 2) {
            UserIOController.getInstance().writeMessage(
                'boardMessages',
                `Please select a valid option!`
            )
        }
        this.#game.reset(userPlayers)
    }

    dropToken(column) {
        this.#column = column
        this.#game.getActivePlayer().accept(this)
        if (this.isFinished()) {
            this.writeResult()
            UserIOController.getInstance().removeBoardControls()
            UserIOController.getInstance().dragPlayAgainDialog()
            UserIOController.getInstance().paintBoardColors(
                this.#game.getGrid()
            )
        } else {
            UserIOController.getInstance().writeMessage(
                'turn',
                this.#game.getActivePlayer().getColor().toString()
            )
            UserIOController.getInstance().paintBoardColors(
                this.#game.getGrid()
            )
            this.machineTurnHandler()
        }
    }

    isFinished() {
        return this.#game.isFinished()
    }

    machineTurnHandler() {
        if (this.#game.getNumOfPlayers() === 0) {
            setTimeout(() => this.dropToken(), 300)
        }
        if (
            this.#game.getNumOfPlayers() === 1 &&
            this.#game.getActivePlayer().getColor().toString() === 'Yellow'
        ) {
            UserIOController.getInstance().removeBoardControls()
            setTimeout(() => {
                this.dropToken()
                UserIOController.getInstance().buildBoardControls()
            }, 300)
        }
    }

    visitUserPlayer(userPlayer) {
        new UserPlayerController(userPlayer).dropToken(this.#column)
    }

    visitMachinePlayer(machinePlayer) {
        new MachinePlayerController(machinePlayer).dropToken()
    }

    writeResult() {
        if (this.#game.isWinner()) {
            UserIOController.getInstance().writeMessage(
                'boardMessages',
                UserIOController.PLAYER_WIN.replace(
                    `#color`,
                    this.#game.getActiveColor().toString()
                )
            )
        } else {
            UserIOController.getInstance().writeMessage(
                'boardMessages',
                UserIOController.PLAYERS_TIED
            )
        }
    }

    #changeTurnActions() {
        this.#game.next()
        const color = this.#game.getActivePlayer().getColor()
        UserIOController.getInstance().setControlColor(color)
        UserIOController.getInstance().writeMessage(
            'boardMessages',
            `Hey <b style="color: ${color}">#color</b> Drop your Token in a Column`.replace(
                `#color`,
                color
            )
        )
    }
}
