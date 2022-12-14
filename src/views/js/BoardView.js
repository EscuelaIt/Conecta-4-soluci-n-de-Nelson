import { Coordinate } from '../../types/Coordinate.js'
import { MessageDialog } from './MessageDialog.js'
import { Color } from '../../types/Color.js'

export class BoardView {
    #board
    #messageDialog

    constructor(board) {
        this.#board = board
        this.#messageDialog = new MessageDialog(board)
        const section = document.getElementById('boardId')
        section.innerHTML = ''
        section.append(this.#createTable())
    }

    #createTable() {
        let table = document.createElement('table')
        table.append(this.#createBoardControls(0))
        for (let row = Coordinate.NUMBER_ROWS; row > 0; row--) {
            table.append(this.#createRow(row))
        }
        return table
    }

    #createBoardControls(row) {
        let tr = document.createElement('tr')
        tr.id = 'controls'
        for (let column = 0; column < Coordinate.NUMBER_COLUMNS; column++) {
            let th = document.createElement('th')
            th.id = `${column}-Control`
            tr.append(th)
        }
        return tr
    }

    #createRow(row) {
        let tr = document.createElement('tr')
        tr.id = `${row - 1}`
        for (let column = 0; column < Coordinate.NUMBER_COLUMNS; column++) {
            let td = document.createElement('td')
            td.id = `${row - 1}-${column}`
            tr.append(td)
            const color = this.#board.getColor(new Coordinate(row - 1, column)).toString()
            color !== ' '
                ? (td.style.backgroundImage = `url("../views/images/${color.toLowerCase()}-token.png")`)
                : ''
        }
        return tr
    }

    addUpdateListener(onUpdate) {
        document.querySelectorAll('th').forEach((headElement, column) => {
            headElement.addEventListener('click', () => {
                onUpdate(column)
            })
        })
    }

    update() {
        document.getElementById('controls').replaceWith(this.#createBoardControls())
        let lastToken = this.#board.getLastDrop()
        let color = this.#board.getColor(lastToken).toString()
        document.getElementById(
            `${lastToken.getRow()}-${lastToken.getColumn()}`
        ).style.backgroundImage = `url("../views/images/${color.toLowerCase()}-token.png")`
        document.documentElement.style.setProperty(
            '--th-background-image',
            `url("../images/${(color === Color.RED.toString()
                ? Color.YELLOW.toString()
                : Color.RED.toString()
            ).toLowerCase()}-token.png")`
        )
    }

    updateResults() {
        this.#messageDialog.update()
    }

    validateColumn(column) {
        document.getElementById('validationId').innerHTML = ''
        if (this.#board.isComplete(column)) {
            document.getElementById('validationId').innerHTML =
                'This column is full please select other.'
        }
    }
}
