import { Board } from './Board.js';
import { Turn } from './Turn.js';

export class Game {

    #board;
    #turn;

    constructor(numOfPlayers) {
        this.#board = new Board();
        this.#turn = new Turn(this.#board, numOfPlayers);
    }

    getTurn(){
        return this.#turn
    }

    getBoard(){
        return this.#board
    }

    getColor(coordinate){
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

    getActivePlayer(){
        return this.#turn.getActivePlayer();
    }

    next(){
        this.#turn.next();
    }

}