import { UserPlayerController } from './UserPlayerController.js'
import { MachinePlayerController } from './MachinePlayerController.js'
import { UserIOController } from './UserIOController.js'
import { EventController } from './EventController.js'

export class TurnController {
    #game
    #col

    constructor(game) {
        this.#game = game
        EventController.getInstance().setEventListenerFunction(
            'changeTurn',
            () => {
                this.#changeTurn()
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

    #changeTurn() {
        this.#game.next();
        const color = this.#game.getActivePlayer().getColor();
        UserIOController.getInstance().setControlColor(color);
        UserIOController.getInstance().writeMessage(
            'boardMessages',
            `Hey <b style="color: ${color}">#color</b> Drop your Token in a Column`.replace(
                `#color`,
                color
            )
        )
    }

    dropToken(col) {
        this.#col = col
        this.#game.getActivePlayer().accept(this)
    }

    visitUserPlayer(userPlayer) {
        new UserPlayerController(userPlayer).dropToken(this.#col)
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
}
