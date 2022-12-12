import { Game } from '../../models/Game.js';
import { TurnView } from './TurnView.js';
import { BoardView } from './BoardView.js';
import { SavedGamesView } from './SavedGamesView.js';
import { Board } from '../../models/Board.js';
import { Turn } from '../../models/Turn.js';

export class GameView {
  #game;
  #boardView;
  #turnView;
  #gameStorageView;
  #machineTimeOut;

  constructor() {
    this.#gameStorageView = new SavedGamesView();
    this.#gameStorageView.render(this);
  }

  askPlayers() {
    const buttons = [
      [`Player VS Player`, 2],
      [`Player VS Machine`, 1],
      [`Machine VS Machine`, 0],
    ];
    buttons.forEach((button) => {
      const numOfPlayerButton = document.createElement('button');
      numOfPlayerButton.innerText = button[0];
      numOfPlayerButton.addEventListener('click', () => {
        document.getElementById('buttonsContainer').innerHTML = '';
        this.#startNewGame(button[1]);
      });
      document.getElementById('buttonsContainer').append(numOfPlayerButton);
    });
  }

  #startNewGame(numOfHumanPlayers) {
    const board = new Board();
    this.#game = new Game(board, new Turn(board, numOfHumanPlayers));
    this.#turnView = new TurnView(this.#game.getTurn());
    this.#boardView = new BoardView(this.#game.getBoard());
    this.#game.getActivePlayer().accept(this);
    this.#gameStorageView.render(this);
  }

  visitUserPlayer(userPlayer) {
    this.#boardView.setControlsCallback(this.#play.bind(this));
  }

  visitMachinePlayer(machinePlayer) {
    this.#machineTimeOut = setTimeout(() => {
      this.#play();
    }, 300);
  }

  #play(column) {
    this.#turnView.dropToken(column);
    this.#boardView.renderToken();
    this.#boardView.removeControls();
    if (this.#game.isFinished()) {
      this.#boardView.resultActions();
      this.#drawPlayAgainDialog();
    } else {
      this.#game.getActivePlayer().accept(this);
    }
  }

  #drawPlayAgainDialog() {
    let playAgainButton = document.createElement('button');
    playAgainButton.innerText = 'Play again!';
    document.getElementById('buttonsContainer').append(playAgainButton);
    playAgainButton.addEventListener('click', () => {
      document.getElementById('buttonsContainer').innerHTML = '';
      new GameView().askPlayers();
    });
  }

  loadGame(gameKey) {
    clearTimeout(this.#machineTimeOut);
    document.getElementById('buttonsContainer').innerHTML = '';
    const game = this.#gameStorageView.getGameByKey(gameKey);
    this.#game = Game.fromPrimitives(game);
    this.#turnView = new TurnView(this.#game.getTurn());
    this.#boardView = new BoardView(this.#game.getBoard());
    this.#game.getActivePlayer().accept(this);
    this.#gameStorageView.render(this);
  }

  saveGame() {
    this.#gameStorageView.saveGame(this.#game);
    this.#gameStorageView.render(this);
  }

  deleteGame(key) {
    this.#gameStorageView.deleteGame(key);
    this.#gameStorageView.render(this);
  }
}

window.onload = () => {
  new GameView().askPlayers();
};
