namespace ha.blockly {
    export class Op {
        static op() {
            let w = window as any;
            w.simpan = () => {
                let simpan = Blockly.serialization.workspaces.save(Index.workspace);
                let code = javascript.javascriptGenerator.workspaceToCode(Index.workspace);

                window.localStorage.setItem("blocklytest", JSON.stringify(simpan));
                window.localStorage.setItem("blocklycode", code);

                console.log(simpan);
            }

            w.load = () => {
                let simpan = window.localStorage.getItem("blocklytest");
                let code = JSON.parse(simpan);
                console.log(code);
                Blockly.serialization.workspaces.load(code, Index.workspace);
            }

            w.code = () => {
                let code = javascript.javascriptGenerator.workspaceToCode(Index.workspace);
                console.log(code);
            }

            w.tambahVar = () => {
                let var1 = prompt('variable baru');
                let simpan: TWorkSpace = Blockly.serialization.workspaces.save(Index.workspace);
                if (!simpan.variables) {
                    simpan.variables = [];
                }
                simpan.variables.push({
                    id: 'random_id' + Math.floor(Math.random() * 1000),
                    name: var1
                });
                Blockly.serialization.workspaces.load(simpan, Index.workspace);
            }

            w.run = () => {
                let codeHtml = ha.blockly.Export.export(javascript.javascriptGenerator.workspaceToCode(Index.workspace));
                w.simpan();
                window.localStorage.setItem("blocklycode", codeHtml);
                window.open('./play.html', "_blank");
                // window.location.href = "./play.html";
            }

            w.publish = () => {
                Op.publish();
            }

            w.exportJSON = () => {
                Op.export();
            }

            w.importJSON = () => {
                Op.import();
            }
        }

        static publish() {
            let codeHtml = ha.blockly.Export.export(javascript.javascriptGenerator.workspaceToCode(Index.workspace));
            window.localStorage.setItem("blocklycode", codeHtml);
            window.open('./publish.html', "_blank");
        }

        static export() {
            let simpan = Blockly.serialization.workspaces.save(Index.workspace);
            Dialog.open(`
                    <h1>Export to JSON</h1>
                    <p>
                        Copy content of textarea below. You can save to file or import later.
                    </p>
            `, JSON.stringify(simpan));
            // window.localStorage.setItem("blocklyExport", JSON.stringify(simpan));
            // window.open('./export.html', "_blank");
        }

        static import() {
            Dialog.onClick = () => {
                try {
                    let value = document.querySelector('textarea').value;
                    let code = JSON.parse(value);
                    Blockly.serialization.workspaces.load(code, Index.workspace);
                }
                catch (e) {
                    console.error(e);
                }
            }

            Dialog.open(`
                    <h1>Import from JSON</h1>
                    <p>
                        Fill the text area below with content you have exported before.
                    </p>
            `, "");
        }

        static resize() {
            const onresize = function () {
                // Compute the absolute coordinates and dimensions of blocklyArea.
                let element: HTMLDivElement = Index.blocklyArea as HTMLDivElement;
                let x = 0;
                let y = 0;
                do {
                    x += element.offsetLeft;
                    y += element.offsetTop;
                    element = element.offsetParent as HTMLDivElement;
                } while (element);
                // Position blocklyDiv over blocklyArea.

                Index.blocklyDiv.style.left = x + 'px';
                Index.blocklyDiv.style.top = y + 'px';
                Index.blocklyDiv.style.width = Index.blocklyArea.offsetWidth + 'px';
                Index.blocklyDiv.style.height = Index.blocklyArea.offsetHeight + 'px';

                Blockly.svgResize(Index.workspace);
            };

            window.onresize = () => {
                setTimeout(() => {
                    onresize();
                }, 100);
            }
            setTimeout(() => {
                onresize();
            }, 100);

        }
    }
}

function openFile(id: string): void {
    id;
}

function deleteFile(id: string): void {
    console.group('delete by id: ' + id);
    ha.blockly.Data.hapus(id);
    window.location.reload();
}
