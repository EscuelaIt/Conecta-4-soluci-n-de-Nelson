import { Color } from '../types/Color.js'
import { UserPlayer } from './UserPlayer.js'
import { RandomMachinePlayer } from './RandomMachinePlayer.js'

export class Turn {
    static #NUMBER_PLAYERS = 2
    #players
    #activePlayer
    #board

    constructor(board, numOfPlayers, activePlayer = 0) {
        this.#board = board
        this.#players = []

        for (let i = 0; i < Turn.#NUMBER_PLAYERS; i++) {
            this.#players[i] =
                i < numOfPlayers
                    ? new UserPlayer(Color.get(i), this.#board)
                    : new RandomMachinePlayer(Color.get(i), this.#board)
        }
        this.#activePlayer = activePlayer
    }

    next() {
        if (!this.#board.isFinished()) {
            this.#activePlayer = (this.#activePlayer + 1) % Turn.#NUMBER_PLAYERS
        }
    }

    getActivePlayer() {
        return this.#players[this.#activePlayer]
    }

    toPrimitives() {
        return {
            numOfHumanPlayers: this.#getNumOfHumanPlayers(),
            activePlayer: this.#activePlayer,
        }
    }

    #getNumOfHumanPlayers() {
        this.NumOfHumanPlayers = 0
        this.#players.forEach((player) => player.accept(this))
        return this.NumOfHumanPlayers
    }

    visitUserPlayer() {
        this.NumOfHumanPlayers++
    }

    visitMachinePlayer() {}

    fromPrimitives(board, turn) {
        return new Turn(board, turn.numOfHumanPlayers, turn.activePlayer)
    }
}
