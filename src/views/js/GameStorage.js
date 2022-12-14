import { assert } from '../../utils/assert.js'

export class GameStorage {
    getAllGamesIds() {
        let gameIds = []
        for (let localStorageKey in window.localStorage) {
            if (window.localStorage.getItem(localStorageKey)) {
                gameIds.push(localStorageKey)
            }
        }
        return gameIds.sort().reverse()
    }

    saveGame(game) {
        assert(game !== undefined)
        let gameId = Date.now().toString()
        window.localStorage.setItem(gameId, JSON.stringify(game.toPrimitives()))
    }

    getGameById(gameId) {
        assert(window.localStorage.getItem(gameId) !== undefined)
        return JSON.parse(window.localStorage.getItem(gameId))
    }

    deleteGame(gameId) {
        assert(window.localStorage.getItem(gameId) !== undefined)
        window.localStorage.removeItem(gameId)
    }
}
