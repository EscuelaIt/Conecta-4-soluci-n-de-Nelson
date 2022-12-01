import { PlayerControllerTemplate } from './PlayerControllerTemplate.js'

export class MachinePlayerController extends PlayerControllerTemplate {
    constructor(player) {
        super(player)
    }

    getColumn() {
        return this.getActivePlayer().getColumn()
    }
}
