import { assert } from '../../utils/assert.js';

export class GameStorageView {

  getAllGames() {
    let gameKeys = [];
    for (let localStorageKey in window.localStorage) {
      if (window.localStorage.getItem(localStorageKey)) {
        gameKeys.push(localStorageKey);
      }
    }
    return gameKeys.sort().reverse();
  }

  saveGame(game) {
    assert(game !== undefined);
    let gameKey = Date.now().toString();
    window.localStorage.setItem(gameKey, JSON.stringify(game.toPrimitives()));
  }

  getGameByKey(gameKey) {
    assert(window.localStorage.getItem(gameKey) !== undefined);
    return JSON.parse(window.localStorage.getItem(gameKey));
  }

  deleteGame(gameKey) {
    assert(window.localStorage.getItem(gameKey) !== undefined);
    window.localStorage.removeItem(gameKey);
  }
}
