import { GameStorage } from './GameStorage.js'

export class StorageView {
    #game
    #gameStorage = new GameStorage()
    #loadGameCallback

    constructor(loadGameCallBack) {
        this.#loadGameCallback = loadGameCallBack
        this.render()
    }

    setGame(game) {
        this.#game = game
        this.render()
    }

    render() {
        document.getElementById('saveGameId')?.remove()
        const saveGameView = document.createElement('div')
        saveGameView.id = 'saveGameId'

        if (this.#game) {
            saveGameView.append(this.#getSaveButton())
        }
        this.#getSavedGameElements().forEach((gameElement) => saveGameView.append(gameElement))
        document.getElementById('leftPanel').append(saveGameView)
    }

    #getSaveButton() {
        const saveButton = document.createElement('button')
        saveButton.innerText = 'Save Game!'
        saveButton.onclick = () => this.saveGame(this.#game)
        return saveButton
    }

    #getSavedGameElements() {
        return this.#gameStorage.getAllGamesIds().map((gameId) => {
            const gameElement = document.createElement('div')
            const date = new Date(parseInt(gameId))
            gameElement.innerHTML = `${date.getDate()}/${
                date.getMonth() + 1
            }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            this.#createDeleteLabel(gameElement, gameId)
            gameElement.onclick = () => this.#loadGameCallback(gameId)
            return gameElement
        })
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
