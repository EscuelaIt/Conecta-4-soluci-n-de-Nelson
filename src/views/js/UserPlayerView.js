import { PlayerView } from './PlayerView.js'

export class UserPlayerView extends PlayerView {
  constructor(player) {
    super(player)
  }

  getColumn(column) {
    this.validateColumn(column)
    return column
  }

  validateColumn(column) {
    if (this.getActivePlayer().isComplete(column)) {
      document.getElementById('boardMessages').innerHTML =
        'This column is full please select other.'
    }
  }
}
