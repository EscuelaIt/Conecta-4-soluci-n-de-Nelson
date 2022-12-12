import { GameStorageView } from './GameStorageView.js';

export class SavedGamesView {
  #gameStorageView;

  constructor() {
    this.#gameStorageView = new GameStorageView();
  }

  render(that) {
    document.getElementById('savedGamesMessage').innerHTML = '';
    document.getElementById('savedGames').innerHTML = '';
    const saveGameButton = document.createElement('button');
    saveGameButton.innerText = 'Save game';
    saveGameButton.addEventListener('click', () => {
      that.saveGame();
    });
    document.getElementById('savedGames').append(saveGameButton);
    this.#renderSavedGames(that);
  }

  #renderSavedGames(that) {
    this.#gameStorageView.getAllGames().forEach((gameKey) => {
      const gameElement = document.createElement('div');
      const date = new Date(parseInt(gameKey));
      gameElement.innerHTML = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      this.#createDeleteLabel(that, gameElement, gameKey);
      gameElement.addEventListener('click', () => that.loadGame(gameKey));
      document.getElementById('savedGames').append(gameElement);
    });
  }

  #createDeleteLabel(that, gameElement, gameKey) {
    const deleteLabel = document.createElement('b');
    deleteLabel.id = gameKey;
    deleteLabel.innerHTML = 'x';
    deleteLabel.addEventListener('click', (event) => {
      event.stopPropagation();
      that.deleteGame(gameKey);
    });
    gameElement.append(deleteLabel);
  }

  saveGame(game) {
    if (!game) {
      document.getElementById('savedGamesMessage').innerHTML = 'Theres no game to save!';
    } else {
      this.#gameStorageView.saveGame(game);
    }
  }

  getGameByKey(gameKey) {
    return this.#gameStorageView.getGameByKey(gameKey);
  }

  deleteGame(gameKey) {
    this.#gameStorageView.deleteGame(gameKey);
  }
}
