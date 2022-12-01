import { UserIOController } from './UserIOController.js'
import { EventController } from './EventController.js'

export class BoardController {
    #boardContainer = document.getElementById('board')
    #tableElement = document.createElement('table')

    #styleClasses = {
        connect4: 'connect4',
    }

    #grid

    constructor(grid) {
        this.#grid = grid
    }

    build() {
        this.#tableElement.remove()
        this.#tableElement = document.createElement('table')

        UserIOController.getInstance().writeMessage(
            'BoardTitle',
            UserIOController.TITLE
        )

        let connect4TableRows = []
        this.#tableElement.classList.add(this.#styleClasses.connect4)

        for (let i = 0; i < 7; i++) {
            connect4TableRows.push(this.#addNewTableRow(this.#tableElement, i))
        }

        connect4TableRows.reverse().forEach((row, key) => {
            if (key < 6) {
                for (let i = 0; i < 7; i++) {
                    this.#addNewTableCell(row, i, key)
                }
            }
        })

        for (let i = 0; i < 7; i++) {
            this.#addNewTableHead(connect4TableRows[6], i)
        }

        this.#boardContainer.append(this.#tableElement)
        this.buildControls()
    }

    #addNewTableHead(trElement, itemNum) {
        let newCol = document.createElement('th')
        newCol.id = `head${itemNum}`
        trElement.append(newCol)
        return newCol
    }

    removeControls() {
        let newRow = document.createElement('tr')
        newRow.id = `0`

        for (let i = 0; i < 7; i++) {
            let newCol = document.createElement('th')
            newCol.id = `head${i}`
            newRow.append(newCol)
        }

        this.#tableElement.childNodes[0].replaceWith(newRow)
    }
    buildControls() {
        this.#tableElement.childNodes[0].childNodes.forEach(
            (controller, itemNum) => {
                EventController.getInstance().setCustomEventListener(
                    controller,
                    'click',
                    'dropToken',
                    { column: itemNum }
                )
            }
        )
    }
    #addNewTableRow(table, itemNum) {
        let newRow = document.createElement('tr')
        newRow.id = itemNum
        table.append(newRow)
        return newRow
    }

    #addNewTableCell(trElement, celNum, rowNum) {
        let newCell = document.createElement('td')
        newCell.id = `${rowNum}-${celNum}`
        trElement.append(newCell)
        return newCell
    }
}
