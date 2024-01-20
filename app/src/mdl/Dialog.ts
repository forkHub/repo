import { wOp } from "../Window.js";

export class Dialog {
    private dlg: HTMLDialogElement;

    constructor() {
        this.dlg = document.createElement("dialog");
        this.dlg.innerHTML = `
            <div>
                <p></p>
            </div>
            <div>
                <button onclick="dialogKlik()">OK</button>
            </div>
        `;

        document.body.appendChild(this.dlg);
    }

    show(msg: string) {
        this.dlg.querySelector('P').innerHTML = msg;
        (this.dlg as any).showModal();
    }

    klik() {
        (this.dlg as any).close();
    }
}
export const dlg = new Dialog();

wOp();
