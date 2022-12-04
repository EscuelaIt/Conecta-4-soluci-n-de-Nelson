import { PlayerView } from './PlayerView.js'

export class MachinePlayerView extends PlayerView {
  constructor(player) {
    super(player)
  }

  getColumn() {
    return this.getActivePlayer().getColumn()
  }
}
