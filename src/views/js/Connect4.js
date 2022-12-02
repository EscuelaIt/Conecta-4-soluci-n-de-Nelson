import { Game } from '../../models/Game.js'
import { UserIOController } from './UserIOController.js'
import { TurnController } from './TurnController.js'
import { EventController } from './EventController.js'

export class Connect4 {
    #game = new Game()

    #turnController = new TurnController(this.#game)

    #numOfPlayers = 0

    constructor() {
        EventController.getInstance().setEventListenerFunction(
            'dropToken',
            (evt) => {
                this.#turnController.dropToken(evt.detail.column)
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
        UserIOController.getInstance().buildBoard()
        this.#numOfPlayers = players
        this.#playGame()
        UserIOController.getInstance().removeModal()
    }

    #playGame() {
        this.#turnController.resetPlayers(this.#numOfPlayers)
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
        if (this.#numOfPlayers === 0) {
            UserIOController.getInstance().removeBoardControls()
            setTimeout(() => this.#turnController.dropToken(), 300)
        }
    }
}
let connect4Controller = new Connect4()
connect4Controller.getNumberOfPlayers()
