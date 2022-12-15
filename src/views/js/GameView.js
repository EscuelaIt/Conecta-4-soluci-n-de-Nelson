import { Game } from '../../models/Game.js'
import { TurnView } from './TurnView.js'
import { BoardView } from './BoardView.js'
import { assert } from '../../utils/assert.js'
import { NumPlayersDialog } from './NumPlayersDialog.js'
import { ResumeDialog } from './ResumeDialog.js'
import { StorageView } from './StorageView.js'

export class GameView {
    #game
    #boardView
    #turnView
    #storageView

    constructor() {
        this.#storageView = new StorageView(this.#loadGame.bind(this))
        this.#init()
    }

    #init() {
        new NumPlayersDialog((numOfUsersPlayer) => {
            this.#game = new Game(numOfUsersPlayer)
            this.#turnView = new TurnView(this.#game.getTurn())
            this.#boardView = new BoardView(this.#game.getBoard())
            this.#game.getActivePlayer().accept(this)
        })
        this.#storageView.render()
    }

    #onUpdate(column) {
        assert(!this.#game.isWinner())
        this.#boardView.validateColumn(column)
        this.#turnView.dropToken(column)
        this.#boardView.render()
        this.#storageView.render(this.#game)
        if (!this.#game.isFinished()) {
            this.#game.getActivePlayer().accept(this)
        } else {
            this.#boardView.updateResults()
            new ResumeDialog(() => {
                this.#init()
            })
            this.#storageView.render()
        }
    }

    visitUserPlayer() {
        this.#boardView.addUpdateListener(this.#onUpdate.bind(this))
    }

    visitMachinePlayer() {
        this.machineTimeOut = setTimeout(() => {
            delete this.machineTimeOut
            this.#onUpdate()
        }, 300)
    }

    #loadGame(gameKey) {
        clearTimeout(this.machineTimeOut)
        delete this.machineTimeOut
        document.getElementById('buttonsId')?.remove()
        this.#game = new Game()
        this.#game.fromPrimitives(this.#storageView.getGameById(gameKey))
        this.#turnView = new TurnView(this.#game.getTurn())
        this.#boardView = new BoardView(this.#game.getBoard())
        this.#game.getActivePlayer().accept(this)
    }
}

window.onload = () => {
    new GameView()
}
