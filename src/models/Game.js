import { Board } from './Board.js';
import { Turn } from './Turn.js';

export class Game {
  #board;
  #turn;

  constructor(board, turn) {
    this.#board = board;
    this.#turn = turn;
  }

  getTurn() {
    return this.#turn;
  }

  getBoard() {
    return this.#board;
  }

  getColor(coordinate) {
    return this.#board.getColor(coordinate);
  }

  isComplete() {
    return this.#board.isComplete();
  }

  isWinner() {
    return this.#board.isWinner();
  }

  isFinished() {
    return this.#board.isFinished();
  }

  getActivePlayer() {
    return this.#turn.getActivePlayer();
  }

  next() {
    this.#turn.next();
  }

  toPrimitives() {
    return {
      turn: this.#turn.toPrimitives(),
      board: this.#board.toPrimitives(),
    };
  }

  static fromPrimitives(game) {
    const board = new Board();
    return new Game(
      board.fromPrimitives(game.board),
      Turn.fromPrimitives(board, game.turn)
    );
  }
}
