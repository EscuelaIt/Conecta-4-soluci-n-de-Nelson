import { GameStorage } from './GameStorage.js'
import { StorageDialog } from './StorageDialog.js'

export class StorageView {
    #gameStorage = new GameStorage()
    #loadGameCallback

    constructor(loadGameCallBack) {
        this.#loadGameCallback = loadGameCallBack
        this.render()
    }

    render(game) {
        if (game) {
            new StorageDialog(() => this.saveGame(game))
        }
        document.getElementById('leftPanel').append(this.#getSavedGames())
    }

    #getSavedGames() {
        document.getElementById('savedGamesId')?.remove()
        const savedGamesDiv = document.createElement('div')
        savedGamesDiv.id = 'savedGamesId'
        this.#gameStorage.getAllGamesIds().forEach((gameId) => {
            const gameElement = document.createElement('div')
            const date = new Date(parseInt(gameId))
            gameElement.innerHTML = `Game saved: ${date.getDate()}/${
                date.getMonth() + 1
            }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            this.#createDeleteLabel(gameElement, gameId)
            gameElement.onclick = () => this.#loadGameCallback(gameId)
            savedGamesDiv.append(gameElement)
        })
        return savedGamesDiv
    }

    #createDeleteLabel(gameElement, gameId) {
        const deleteLabel = document.createElement('b')
        deleteLabel.id = 'delete'
        deleteLabel.innerHTML = 'X'
        deleteLabel.onclick = (event) => {
            event.stopPropagation()
            this.deleteGameById(gameId)
        }
        gameElement.append(deleteLabel)
    }

    saveGame(game) {
        this.#gameStorage.saveGame(game)
        this.render()
    }

    getGameById(gameId) {
        return this.#gameStorage.getGameById(gameId)
    }

    deleteGameById(gameId) {
        this.#gameStorage.deleteGame(gameId)
        this.render()
    }
}
