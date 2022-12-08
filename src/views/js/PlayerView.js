export class PlayerView {
  #player

  constructor(player) {
    this.#player = player
  }

  dropToken(col) {
      this.#player.dropToken(this.getColumn(col))
  }

  getColumn() {
  }

  getActivePlayer() {
    return this.#player
  }
}
