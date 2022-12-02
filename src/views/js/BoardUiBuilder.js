import { UserIOController } from './UserIOController.js'
import { EventController } from './EventController.js'

export class BoardUiBuilder {
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

        this.#addTableHead()

        let rowNum = 5
        let celNum = 0

        this.#grid.forEach((row) => {
            let rowElement = this.#addNewTableRow(this.#tableElement, rowNum)
            row.forEach((cell) => {
                if (celNum > 6) {
                    celNum = 0
                }
                this.#addNewTableCell(rowElement, rowNum, celNum)
                celNum++
            })
            rowNum--
        })

        this.#tableElement.classList.add(this.#styleClasses.connect4)
        this.#boardContainer.append(this.#tableElement)
        this.buildControls()
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

    removeControls() {
        let newRow = document.createElement('tr')
        newRow.id = `6`

        for (let i = 0; i < 7; i++) {
            let newCol = document.createElement('th')
            newCol.id = `Column-${i}-Controll`
            newRow.append(newCol)
        }

        this.#tableElement.childNodes[0].replaceWith(newRow)
    }
    #addTableHead() {
        let tableHeadElement = this.#addNewTableRow(this.#tableElement, 6)
        for (let i = 0; i < 7; i++) {
            let newCol = document.createElement('th')
            newCol.id = `Column-${i}-Controll`
            tableHeadElement.append(newCol)
        }
    }
    #addNewTableRow(table, itemNum) {
        let newRow = document.createElement('tr')
        newRow.id = itemNum
        table.append(newRow)
        return newRow
    }

    #addNewTableCell(trElement, rowNum, celNum) {
        let newCell = document.createElement('td')
        newCell.id = `${rowNum}-${celNum}`
        trElement.append(newCell)
        return newCell
    }
}
