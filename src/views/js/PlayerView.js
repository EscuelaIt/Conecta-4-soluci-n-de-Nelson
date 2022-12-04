export class PlayerView {
  #player

  constructor(player) {
    this.#player = player
  }

  dropToken(col) {
    if (null !== this.getColumn(col)) {
      this.#player.dropToken(this.getColumn(col))
      window.dispatchEvent(new CustomEvent('changeTurn'))
    }
  }

  getColumn() {
    /*TEMPLATE*/
  }

  getActivePlayer() {
    return this.#player
  }
}
