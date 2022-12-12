export class TurnView {
  #turn;
  #column;

  constructor(turn) {
    this.#turn = turn;
    this.drawTurnMessage();
  }

  drawTurnMessage() {
    let color = this.#turn.getActivePlayer().getColor().toString();
    document.getElementById('redTurn').style.opacity = color === 'Red' ? 1 : 0.2;
    document.getElementById('yellowTurn').style.opacity = color === 'Yellow' ? 1 : 0.2;
    document.documentElement.style.setProperty(
      '--th-background-image',
      `url("../images/${color.toLowerCase()}-token.png")`
    );
  }

  dropToken(column) {
    this.#column = column
    this.#turn.getActivePlayer().accept(this);
    this.#turn.next();
    this.drawTurnMessage();
  }

  visitUserPlayer(userPlayer) {
    userPlayer.dropToken(this.#column)
  }

  visitMachinePlayer(machinePlayer) {
    machinePlayer.dropToken(machinePlayer.getColumn())
  }

}
