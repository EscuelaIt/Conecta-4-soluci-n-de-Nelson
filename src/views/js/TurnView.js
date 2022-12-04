import { UserPlayerView } from './UserPlayerView.js'
import { MachinePlayerView } from './MachinePlayerView.js'
import { UserUiView } from './UserUiView.js'

export class TurnView {
  #turn

  #column

  constructor(turn) {
    this.#turn = turn

    UserUiView.getInstance().setTurnMessages(
      this.#turn.getActivePlayer().getColor().toString()
    )

    if (this.#turn.getNumOfPlayers() === 0) {
      UserUiView.getInstance().removeBoardControls()
      setTimeout(() => this.dropToken(), 300)
    }
  }

  dropToken(column) {
    this.#column = column
    this.#turn.getActivePlayer().accept(this)
    UserUiView.getInstance().drawTokenOnBoard()
    this.#isFinished()
  }

  visitUserPlayer(userPlayer) {
    new UserPlayerView(userPlayer).dropToken(this.#column)
  }

  visitMachinePlayer(machinePlayer) {
    new MachinePlayerView(machinePlayer).dropToken()
  }

  #isFinished() {
    if (UserUiView.getInstance().isFinished()) {
      UserUiView.getInstance().removeBoardControls()
      UserUiView.getInstance().drawResult(
          this.#turn.getActivePlayer().getColor().toString()
      )
      UserUiView.getInstance().drawPlayAgainDialog()
    } else {
      this.machinePlayHandler()
    }
  }

  machinePlayHandler() {
    if (
      this.#turn.getNumOfPlayers() === 0 ||
      this.#turn.getNumOfPlayers() === 1 &&
        this.#turn.getActivePlayer().getColor().toString() === 'Yellow'
    ) {
      setTimeout(() => this.dropToken(), 300)
    }
  }

  changeTurn() {
    this.#turn.next()
    UserUiView.getInstance().setTurnMessages(
      this.#turn.getActivePlayer().getColor().toString()
    )
  }
}
