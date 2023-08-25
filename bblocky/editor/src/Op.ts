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
                let code = ha.blockly.Export.export(javascript.javascriptGenerator.workspaceToCode(Index.workspace));
                w.simpan();
                window.localStorage.setItem("blocklycode", code);
                window.top.location.href = ('./play.html');
            }

            w.share = () => {
                let simpan = Blockly.serialization.workspaces.save(Index.workspace);
                let simpans = JSON.stringify(simpan);
                let b64 = btoa(simpans);
                console.log(b64);
            }
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
