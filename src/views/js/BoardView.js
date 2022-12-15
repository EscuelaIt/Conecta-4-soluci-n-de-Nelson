import { Coordinate } from '../../types/Coordinate.js'
import { MessageDialog } from './MessageDialog.js'
import { Color } from '../../types/Color.js'

export class BoardView {
    #board
    #messageDialog

    constructor(board) {
        this.#board = board
        this.#messageDialog = new MessageDialog(board)
        this.render()
    }

    render() {
        const section = document.getElementById('boardId')
        section.innerHTML = ''
        let table = document.createElement('table')
        for (let row = Coordinate.NUMBER_ROWS; row > 0; row--) {
            table.append(this.#getRow(row))
        }
        section.append(table)
    }

    #getRow(row) {
        let tr = document.createElement('tr')
        tr.id = row === Coordinate.NUMBER_ROWS ? 'controls' : `${row - 1}`
        for (let column = 0; column < Coordinate.NUMBER_COLUMNS; column++) {
            let td = document.createElement('td')
            td.id = `${row - 1}-${column}`
            tr.append(td)
            const color = this.#board
                .getColor(new Coordinate(row - 1, column))
                .toString()
            color !== Color.NULL.toString()
                ? (td.style.backgroundImage = `url("../views/images/${color.toLowerCase()}-token.png")`)
                : ''
        }
        return tr
    }

    addUpdateListener(onUpdate) {
        document
            .querySelector('#controls')
            .childNodes.forEach(
                (control, column) => (control.onclick = () => onUpdate(column))
            )
    }

    updateResults() {
        this.#messageDialog.updateResults()
    }

    validateColumn(column) {
        this.#messageDialog.updateValidation(column)
    }
}
