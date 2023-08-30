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
            if (!Data.data.share) {
                w.simpan();
            }
            window.localStorage.setItem("blocklycode", code);
            window.top.location.href = ('./play.html');
        }

        w.share = () => {
            let saveobj = Blockly.serialization.workspaces.save(Index.workspace);
            let saveStr = JSON.stringify(saveobj);
            let saveEncoded = encodeURIComponent(saveStr);
            let url = window.top.location.pathname;

            console.group('share');
            console.log(saveEncoded);
            console.log(window.location.href);

            console.log(url + '?share=' + saveEncoded, '_blank');
            console.groupEnd();
        }

        w.home = () => {
            if (!Data.data.share) {
                w.simpan();
            }
            window.top.location.href = "./projek.html";
        }
    }

    static handleResize() {
        try {
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
        }
        catch (e) {
            console.warn(e);
        }


    }

    static setResize() {
        window.onresize = () => {
            this.handleResize();
            setTimeout(() => {
                this.handleResize();
            }, 100);
        }
        this.handleResize();
        setTimeout(() => {
            this.handleResize();
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
