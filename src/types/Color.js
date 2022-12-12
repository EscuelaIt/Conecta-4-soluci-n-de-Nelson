export class Color {

    static RED = new Color(`Red`);
    static YELLOW = new Color(`Yellow`);
    static NULL = new Color(` `);
    #string;

    constructor(string = ` `) {
        this.#string = string;
    }

    static values() {
        return [Color.RED, Color.YELLOW];
    }

    static get(ordinal) {
        return Color.values()[ordinal];
    }

    toString() {
        return this.#string;
    }

    static fromString(color){
        switch (color) {
            case 'Red':
              return Color.RED;
            case 'Yellow':
                return Color.YELLOW;
            default:
                return Color.NULL;
          }
    }

}