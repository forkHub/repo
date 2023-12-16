namespace ha.blockly {
    export class DialogPublish {
        private static readonly dlg = document.querySelector('dialog') as HTMLDialogElement;
        static onClick: () => void = () => { };

        static open(p: string, cont: string) {
            this.dlg.querySelector('p').innerHTML = p;
            this.dlg.querySelector('textarea').value = cont;
            (this.dlg as any).showModal();
        }

        static batal() {
            (this.dlg as any).close();
        }

        static klik() {
            (this.dlg as any).close();
            this.onClick();
        }
    }
}
