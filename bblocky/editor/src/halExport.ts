namespace ha.blockly {
    export class HalExport {
        static init() {
            let simpan = window.localStorage.getItem("blocklyExport");
            let textArea = document.querySelector('textarea') as HTMLTextAreaElement;
            textArea.value = simpan;
        }

        static modal() {
            let simpan = window.localStorage.getItem("blocklyExport");
            let textArea = document.querySelector('textarea') as HTMLTextAreaElement;
            textArea.value = simpan;
        }
    }
}