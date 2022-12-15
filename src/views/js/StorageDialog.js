import { ButtonsDialog } from './ButtonsDialog.js'

export class StorageDialog extends ButtonsDialog {
    constructor(callback) {
        super()
        this.createButtons()
        this.addButton('Save Game', callback)
    }
}
