import { PlayerView } from './PlayerView.js'
import { Coordinate } from '../../types/Coordinate.js'
import { UserUiView } from './UserUiView.js'

export class UserPlayerView extends PlayerView {
  constructor(player) {
    super(player)
  }

  getColumn(column) {
    let valid
    valid = Coordinate.isColumnValid(column)
    if (!valid) {
      UserUiView.getInstance().drawMessage('boardMessages', 'Invalid column')
      return null
    } else {
      valid = !this.getActivePlayer().isComplete(column)
      if (!valid) {
        UserUiView.getInstance().drawMessage(
          'boardMessages',
          'This column is full please select other.'
        )
        return null
      }
    }
    return column
  }
}
