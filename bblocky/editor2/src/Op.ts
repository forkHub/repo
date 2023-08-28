import { Index } from ".";
import { Export } from "./export";
import Blockly from 'blockly'
import { TWorkSpace } from "./type";
import { javascriptGenerator } from "blockly/javascript";
import { Data } from "./Data";

export class Op {
    static op() {
        let w = window as any;

        w.simpan = () => {
            try {
                console.group("save data:");

                if (window.confirm('save changes?')) {
                    let simpan = Blockly.serialization.workspaces.save(Index.workspace);
                    let simpanStr = JSON.stringify(simpan);
                    let b64 = btoa(simpanStr);

                    console.log(b64);
                    console.log(simpan);
                    console.log(simpanStr);

                    let file = Data.getFileById(Data.data.activeFileId);
                    file.data = simpanStr;
                    file.data64 = b64;

                    Data.simpan();
                }

            }
            catch (e) {
                console.error(e);
            }
            finally {
                console.groupEnd();
            }
        }

        w.b64 = () => {
            let simpan = Blockly.serialization.workspaces.save(Index.workspace);
            let simpanStr = JSON.stringify(simpan);
            let b64 = btoa(simpanStr);
            console.log(b64);
        }

        // w.load = () => {
        //     let simpan = window.localStorage.getItem("blocklytest");
        //     let code = JSON.parse(simpan);
        //     console.log("code", code);
        //     Blockly.serialization.workspaces.load(code, Index.workspace);
        // }

        w.code = () => {
            let code = javascriptGenerator.workspaceToCode(Index.workspace);
            console.log(code);
        }

        w.tambahVar = () => {
            let var1 = prompt('variable baru');
            let simpan: TWorkSpace = Blockly.serialization.workspaces.save(Index.workspace) as TWorkSpace;
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
            let code = Export.export(javascriptGenerator.workspaceToCode(Index.workspace));
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

        w.home = () => {
            w.simpan();
            window.top.location.href = "./projek.html";
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

// function openFile(id: string): void {
//     id;
// }

// function deleteFile(id: string): void {
//     console.group('delete by id: ' + id);
//     ha.blockly.Data.hapus(id);
//     window.location.reload();
// }
