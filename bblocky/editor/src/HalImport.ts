namespace ha.blockly {
    export class HalImport {
        static import() {
            try {
                let value = document.querySelector('textarea').value;
                let code = JSON.parse(value);
                console.log(code);
                Blockly.serialization.workspaces.load(code, Index.workspace);
            }
            catch (e) {
                console.error(e);
            }
        }
    }
}