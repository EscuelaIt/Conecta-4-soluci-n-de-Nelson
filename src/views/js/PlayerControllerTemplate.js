export class PlayerControllerTemplate {
    #player

    constructor(player) {
        this.#player = player
    }

    dropToken(col) {
        if (this.getColumn(col) > -1 && this.getColumn(col) < 7) {
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
