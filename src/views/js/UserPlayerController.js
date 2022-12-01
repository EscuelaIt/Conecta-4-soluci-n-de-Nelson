import { PlayerControllerTemplate } from './PlayerControllerTemplate.js'
import { Coordinate } from '../../types/Coordinate.js'
import { UserIOController } from './UserIOController.js'

export class UserPlayerController extends PlayerControllerTemplate {
    constructor(player) {
        super(player)
    }

    getColumn(column) {
        let valid
        valid = Coordinate.isColumnValid(column)
        if (!valid) {
            UserIOController.getInstance().writeMessage(
                'boardMessages',
                UserIOController.INVALID_COLUMN
            )
        } else {
            valid = !this.getActivePlayer().isComplete(column)
            if (!valid) {
                UserIOController.getInstance().writeMessage(
                    'boardMessages',
                    UserIOController.COMPLETED_COLUMN
                )
            }
        }
        return valid === true ? column : -1
    }
}
