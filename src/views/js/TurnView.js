import { Color } from '../../types/Color.js'

export class TurnView {
    #turn

    constructor(turn) {
        this.#turn = turn
        this.#update()
    }

    #update() {
        let activeColor = this.#turn.getActivePlayer().getColor()
        for (let color of Color.values()) {
            document.getElementById(color.toString() + `Id`).style.opacity =
              activeColor.equals(color)
              ? 1
              : 0.2
        }
    }

    dropToken(column) {
        this.column = column
        this.#turn.getActivePlayer().accept(this)
        this.#turn.next()
        this.#update()
    }

    visitUserPlayer(userPlayer) {
        userPlayer.dropToken(this.column)
        delete this.column
    }

    visitMachinePlayer(machinePlayer) {
        machinePlayer.dropToken(machinePlayer.getColumn())
    }
}
