"use strict";
/**
 * Dialog
 */
class Dialog {
    static open(p) {
        this.dlg.querySelector('p').innerHTML = p;
        this.dlg.showModal();
    }
    static klik() {
        this.dlg.close();
    }
}
Dialog.dlg = document.querySelector('dialog');
