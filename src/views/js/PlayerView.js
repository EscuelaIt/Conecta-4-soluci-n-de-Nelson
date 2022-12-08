export class PlayerView {
  #player

  constructor(player) {
    this.#player = player
  }

  dropToken(column) {
    this.#player.dropToken(this.getColumn(column))
  }

  getColumn() {}

  getActivePlayer() {
    return this.#player
  }
}
