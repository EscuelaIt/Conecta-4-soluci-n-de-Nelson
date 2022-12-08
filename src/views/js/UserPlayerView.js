import { PlayerView } from './PlayerView.js'
import { Coordinate } from '../../types/Coordinate.js'


export class UserPlayerView extends PlayerView {
  constructor(player) {
    super(player)
  }

  getColumn(column) {
    let valid
      valid = Coordinate.isColumnValid(column)
    if (!valid) {
      document.getElementById('boardMessages').innerHTML = 'Invalid column';
    } else {
      valid = !this.getActivePlayer().isComplete(column)
      if (!valid) {
        document.getElementById('boardMessages').innerHTML = 'This column is full please select other.';
      }
    }
    return column
  }
}
