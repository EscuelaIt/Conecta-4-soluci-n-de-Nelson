import { Color } from '../types/Color.js';
import { UserPlayer } from './UserPlayer.js';
import { RandomMachinePlayer } from './RandomMachinePlayer.js';

export class Turn {
  static #NUMBER_PLAYERS = 2;
  #players;
  #activePlayer;
  #board;
  #numOfHumanPlayers;

  constructor(board, numOfHumanPlayers, activePlayer = 0) {
    this.#numOfHumanPlayers = numOfHumanPlayers;
    this.#board = board;
    this.#players = [];

    for (let i = 0; i < Turn.#NUMBER_PLAYERS; i++) {
      this.#players[i] =
        i < numOfHumanPlayers
          ? new UserPlayer(Color.get(i), this.#board)
          : new RandomMachinePlayer(Color.get(i), this.#board);
    }
    this.#activePlayer = activePlayer;
  }

  next() {
    if (!this.#board.isFinished()) {
      this.#activePlayer = (this.#activePlayer + 1) % Turn.#NUMBER_PLAYERS;
    }
  }

  getActivePlayer() {
    return this.#players[this.#activePlayer];
  }

  toPrimitives() {
    return {
      numOfHumanPlayers: this.#numOfHumanPlayers,
      activePlayer: this.#activePlayer,
    };
  }

  static fromPrimitives(board, turn) {
    return new Turn(board, turn.numOfHumanPlayers, turn.activePlayer);
  }
}
