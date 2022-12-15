export class Color {
    static RED = new Color(`Red`)
    static YELLOW = new Color(`Yellow`)
    static NULL = new Color(` `)
    #string

    constructor(string) {
        this.#string = string
    }

    static values() {
        return [Color.RED, Color.YELLOW]
    }

    static get(ordinal) {
        return Color.values()[ordinal]
    }

    equals(color) {
        return this.toString() === color.toString()
    }

    toString() {
        return this.#string
    }
}
