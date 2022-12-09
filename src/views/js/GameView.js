import { Game } from '../../models/Game.js';
import { TurnView } from './TurnView.js';
import { BoardView } from './BoardView.js';

export class GameView {
  #game;
  #boardView;
  #turnView;

  askPlayers() {
    const buttons = [
      [`Player VS Player`, 2],
      [`Player VS Machine`, 1],
      [`Machine VS Machine`, 0],
    ];

    const buttonsContainer = document.createElement('div');
    buttonsContainer.id = 'buttonsContainer';

    buttons.forEach((button) => {
      const numOfPlayerButton = document.createElement('button');
      numOfPlayerButton.innerText = button[0];
      numOfPlayerButton.addEventListener('click', () => {
        document.getElementById('buttonsContainer').remove();
        this.#startNewGame(button[1]);
      });
      buttonsContainer.append(numOfPlayerButton);
    });

    document.getElementById('leftPanel').append(buttonsContainer);
  }

  #startNewGame(numOfUsersPlayer) {
    this.#game = new Game(numOfUsersPlayer);
    this.#turnView = new TurnView(this.#game.getTurn());
    this.#boardView = new BoardView(this.#game.getBoard());
    if (numOfUsersPlayer === 0) {
      this.#game.getActivePlayer().accept(this);
    } else {
      this.#boardView.setControlsCallback(this.#play.bind(this));
    }
  }

  #play(column) {
    this.#turnView.dropToken(column);
    this.#boardView.renderToken();
    if (this.#game.isFinished()) {
      this.#boardView.resultActions();
      this.#drawPlayAgainDialog();
    } else {
      this.#game.getActivePlayer().accept(this);
    }
  }

  visitUserPlayer(userPlayer) {}

  visitMachinePlayer(machinePlayer) {
    setTimeout(() => {
      this.#play();
    }, 300);
  }

  #drawPlayAgainDialog() {
    let playAgainButton = document.createElement('button');
    playAgainButton.innerText = 'Play again!';
    let buttonsContainer = document.createElement('div');
    buttonsContainer.id = 'buttonsContainer';
    buttonsContainer.append(playAgainButton);
    document.getElementById('leftPanel').append(buttonsContainer);
    playAgainButton.addEventListener('click', () => {
      document.getElementById('buttonsContainer').remove();
      new GameView().askPlayers();
    });
  }
}

window.onload = () => {
  new GameView().askPlayers();
};
