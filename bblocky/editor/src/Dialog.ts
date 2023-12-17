namespace ha.blockly {
    export class Dialog {
        private static dlg: HTMLDialogElement;

        static show(msg: string) {
            this.dlg = document.body.querySelector("dialog.alert") as HTMLDialogElement;
            this.dlg.querySelector('P').innerHTML = msg;
            (this.dlg as any).showModal();
        }

        static klik() {
            (this.dlg as any).close();
        }
    }

}