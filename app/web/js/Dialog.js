export class Dialog {
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
    show(msg) {
        this.dlg.querySelector('P').innerHTML = msg;
        this.dlg.showModal();
    }
    klik() {
        this.dlg.close();
    }
}
export const dlg = new Dialog();
let w = window;
w.dialogKlik = () => {
    dlg.klik();
};
