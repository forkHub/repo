namespace ha.blockly {
    export class Op {
        static op() {

            //TODO: depecrated
            let w = window as any;
            w.simpan = () => {
                Op.simpan();
                // if (Store.namaProject == "") {

                // }
                // else {
                //     let simpan = Blockly.serialization.workspaces.save(Index.workspace);
                // }

                // let simpan = Blockly.serialization.workspaces.save(Index.workspace);
                // let code = javascript.javascriptGenerator.workspaceToCode(Index.workspace);

                // window.localStorage.setItem("blocklytest", JSON.stringify(simpan));
                // window.localStorage.setItem("blocklycode", code);

                // console.log(simpan);
            }

            w.load = () => {
                Op.load();
                // let simpan = window.localStorage.getItem("blocklytest");
                // let code = JSON.parse(simpan);
                // console.log(code);
                // Blockly.serialization.workspaces.load(code, Index.workspace);
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
                // w.simpan();
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

        static load() {
            let list: IEntity[] = Entity.getByType(EEntity.PROJECT);
            // let p: IProject = list[0] as IProject;
            // let f: IFile = Entity.getByParentId(p.id) as IFile;

            //develop ui
            HalListProject.show(list as IProject[])

            // let code = JSON.parse(f.wspace);
            // console.log(code);
            // Blockly.serialization.workspaces.load(code, Index.workspace);

            // Store.idFile = f.id;
            // Store.namaProject = p.nama;

            // console.log(list);
        }

        static publish() {
            let codeHtml = ha.blockly.Export.export(javascript.javascriptGenerator.workspaceToCode(Index.workspace));
            DialogPublish.open(`
                    <h1>Publish</h1>
                    <p>
                        Copy content of textarea below, and save it to a file with .html extension.
                        You can run the file directly without setting up a web-server
                    </p>
            `, (codeHtml));
            // window.localStorage.setItem("blocklycode", codeHtml);
            // window.open('./publish.html', "_blank");
        }

        static export() {
            let simpan = Blockly.serialization.workspaces.save(Index.workspace);
            DialogPublish.open(`
                    <h1>Export to JSON</h1>
                    <p>
                        Copy content of textarea below. You can save to file or import later.
                    </p>
            `, JSON.stringify(simpan));
            // window.localStorage.setItem("blocklyExport", JSON.stringify(simpan));
            // window.open('./export.html', "_blank");
        }

        static import() {
            DialogPublish.onClick = () => {
                try {
                    let value = document.querySelector('textarea').value;
                    let code = JSON.parse(value);
                    Blockly.serialization.workspaces.load(code, Index.workspace);
                }
                catch (e) {
                    console.error(e);
                }
            }

            DialogPublish.open(`
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

        static simpanBaru() {
            let id: string = Id.id;
            let nama = window.prompt("project name", "def1");

            //TOOD: validasi nama

            //save new project
            let p: IProject = {
                id: id,
                type: EEntity.PROJECT,
                nama: nama,
                parentId: "-1"
            }
            Entity.tambah(p);

            let f: IFile = {
                id: Id.id,
                type: EEntity.FILE,
                nama: Store.idFile,
                parentId: p.id,
                wspace: JSON.stringify(Blockly.serialization.workspaces.save(Index.workspace))
            }

            //TODO: save file yang lain

            Store.idFile = f.id;
            Store.projectId = p.id;

            Entity.tambah(f);
            Entity.commit();
            Index.updateName();
        }

        static simpan() {
            // let id: string = Id.id;

            if (Store.projectId == "") {
                this.simpanBaru();
            }
            else {
                let file = Entity.getById(Store.idFile) as IFile;
                file.wspace = JSON.stringify(Blockly.serialization.workspaces.save(Index.workspace));
                Entity.commit();
            }

            Index.updateName();
        }
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
