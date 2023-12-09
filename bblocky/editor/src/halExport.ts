namespace ha.blockly {
    export class HalExport {
        static init() {
            let simpan = window.localStorage.getItem("blocklycode");
            let textArea = document.querySelector('textarea') as HTMLTextAreaElement;
            textArea.value = simpan;
        }
    }
}