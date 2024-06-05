"use strict";
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Dialog {
            static show(msg) {
                this.dlg = document.body.querySelector("dialog.alert");
                this.dlg.querySelector('P').innerHTML = msg;
                this.dlg.showModal();
            }
            static klik() {
                this.dlg.close();
            }
        }
        blockly.Dialog = Dialog;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class DialogPublish {
            static open(p, cont) {
                this.dlg.querySelector('p').innerHTML = p;
                this.dlg.querySelector('textarea').value = cont;
                this.dlg.showModal();
            }
            static batal() {
                this.dlg.close();
            }
            static klik() {
                this.dlg.close();
                this.onClick();
            }
        }
        DialogPublish.dlg = document.querySelector('dialog.publish');
        DialogPublish.onClick = () => { };
        blockly.DialogPublish = DialogPublish;
        class DialogExport {
            static open(p, cont) {
                this.dlg.querySelector('p').innerHTML = p;
                this.dlg.querySelector('textarea').value = cont;
                this.dlg.showModal();
                console.log(cont);
            }
            static batal() {
                this.dlg.close();
            }
            static klik() {
                this.dlg.close();
                this.onClick();
            }
        }
        DialogExport.dlg = document.querySelector('dialog.export');
        DialogExport.onClick = () => { };
        blockly.DialogExport = DialogExport;
        class DialogImport {
            static open(p, cont) {
                this.dlg.querySelector('p').innerHTML = p;
                this.dlg.querySelector('textarea').value = cont;
                this.dlg.showModal();
            }
            static batal() {
                this.dlg.close();
            }
            static klik() {
                this.dlg.close();
                this.onClick();
            }
        }
        DialogImport.dlg = document.querySelector('dialog.import');
        DialogImport.onClick = () => { };
        blockly.DialogImport = DialogImport;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        let EEntity;
        (function (EEntity) {
            EEntity["PROJECT"] = "project";
            EEntity["FILE"] = "file";
        })(EEntity = blockly.EEntity || (blockly.EEntity = {}));
        class Entity {
            static loadDemoData() {
                this.dbAktif = this.dbDemoName;
                demoData.forEach((item) => {
                    this.list.push(item);
                });
                this.commit();
            }
            static loadSavedData() {
                this.dbAktif = this.dbName;
                let str;
                let obj;
                while (this.list.length > 0) {
                    this.list.pop();
                }
                str = window.localStorage.getItem(this.dbAktif);
                obj = JSON.parse(str);
                obj.forEach((item) => {
                    this.list.push(item);
                });
            }
            static init() {
                try {
                    if (blockly.Store.tutMode) {
                        this.loadDataFromUrl("./tut/list.json");
                        return;
                    }
                    if (blockly.Store.devMode) {
                        this.loadDemoData();
                        //TODO:
                        // this.loadDataFromUrl("./tut/demo.json");
                        return;
                    }
                    this.loadSavedData();
                }
                catch (e) {
                    console.log('load error');
                    console.warn(e);
                }
            }
            static loadDataFromUrl(url) {
                try {
                    fetch(url, //"./tut/list.json",
                    {
                        // headers: { 'Content-Type': 'application/json' }, // Added in response to comment
                        method: 'GET',
                    }).then(function (response) {
                        console.log(response);
                        console.log(response.text().then((e) => {
                            console.log("load projek list response text");
                            console.log(e);
                            while (Entity.list.length > 0) {
                                Entity.list.pop();
                            }
                            let obj = JSON.parse(e);
                            obj.forEach((item) => {
                                Entity.list.push(item);
                            });
                        }));
                    }).catch((e) => {
                        console.error(e);
                    });
                }
                catch (e) {
                    console.error(e);
                }
            }
            //session data
            static loadDataFromStorage() {
                try {
                    let str = window.localStorage.getItem(this.dbAktif);
                    return str;
                }
                catch (e) {
                    console.log('load error');
                    console.warn(e);
                    return "";
                }
            }
            static getByType(ty) {
                let hasil = [];
                this.list.forEach((item) => {
                    if (item.type == ty) {
                        hasil.push(item);
                    }
                });
                return hasil;
            }
            static getById(id) {
                let hasil;
                this.list.forEach((item) => {
                    if (item.id == id) {
                        hasil = item;
                    }
                });
                return hasil;
            }
            static getByParentId(pId) {
                let hasil;
                this.list.forEach((item) => {
                    if (item.parentId == pId) {
                        hasil = item;
                    }
                });
                return hasil;
            }
            static update(id, data) {
                this.delete(id);
                this.tambah(data);
            }
            static delete(id) {
                console.group('delete by id ' + id);
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].id == id) {
                        console.log('deleted ' + id);
                        this.list.splice(i, 1);
                        break;
                    }
                }
                console.groupEnd();
            }
            static tambah(data) {
                this.list.push(data);
            }
            static commit() {
                try {
                    window.localStorage.setItem(this.dbAktif, JSON.stringify(this.list));
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
        Entity.dbName = 'ha.blockly.data2';
        Entity.dbDemoName = 'ha.blockly.dataDemo';
        Entity.dbAktif = '';
        Entity.list = [];
        blockly.Entity = Entity;
        class Project {
            getById(id) {
                return Entity.getById(id);
            }
            delete(id) {
                Entity.delete(id);
            }
            update(data) {
                Entity.update(data.id, data);
            }
            tambah(data) {
                Entity.tambah(data);
            }
        }
        blockly.Project = Project;
        class File {
            getById(id) {
                id;
                return null;
            }
            delete(id) {
                id;
            }
            update(data) {
                data;
            }
            tambah(data) {
                data;
            }
        }
        blockly.File = File;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class HalImport {
            static import() {
                try {
                    let value = document.querySelector('textarea').value;
                    let code = JSON.parse(value);
                    console.log(code);
                    Blockly.serialization.workspaces.load(code, blockly.Index.workspace);
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
        blockly.HalImport = HalImport;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class HalListProject {
            static openKlik() {
                if (blockly.Store.selectedId == '') {
                    //no selected
                    console.log('no selected');
                    blockly.Dialog.show("no item selected");
                    return;
                }
                if (blockly.Store.projectId == blockly.Store.selectedId) {
                    //already opened
                    console.log('already open');
                    blockly.Dialog.show("You are currently editing this project");
                    return;
                }
                let f;
                let project;
                let code;
                if (blockly.Store.tutMode) {
                    try {
                        fetch(`./tut/p${blockly.Store.selectedId}.json`, {
                            // headers: { 'Content-Type': 'application/json' }, // Added in response to comment
                            method: 'GET',
                        }).then(function (response) {
                            console.log(response);
                            console.log(response.text().then((e) => {
                                console.log("load projek response text");
                                console.log(e);
                                // while (Entity.list.length > 0) {
                                //     Entity.list.pop();
                                // }
                                // let obj = JSON.parse(e);
                                // console.log(obj);
                                // obj.forEach((item: any) => {
                                //     Entity.list.push(item);
                                // })
                                // e; //TODO:
                                let obj = JSON.parse(e);
                                console.log(obj);
                                blockly.Store.idFile = "";
                                blockly.Store.projectId = blockly.Store.selectedId;
                                Blockly.serialization.workspaces.load(obj, blockly.Index.workspace);
                                HalListProject.closeKlik();
                                blockly.Index.updateName();
                            }));
                        }).catch((e) => {
                            console.error(e);
                        });
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
                else {
                    f = blockly.Entity.getByParentId(blockly.Store.selectedId);
                    code = JSON.parse(f.wspace);
                    project = blockly.Entity.getById(blockly.Store.selectedId);
                    // }
                    blockly.Store.idFile = f.id;
                    blockly.Store.projectId = project.id;
                    Blockly.serialization.workspaces.load(code, blockly.Index.workspace);
                    this.closeKlik();
                    blockly.Index.updateName();
                }
            }
            static deleteKlik() {
                console.group('delete klik');
                if (blockly.Store.selectedId == '') {
                    //TODO: dialog
                    console.log('no item selected');
                    console.groupEnd();
                    blockly.Dialog.show("no item selected");
                    return;
                }
                if (blockly.Store.selectedId == blockly.Store.projectId) {
                    //already opened
                    console.log("already opened");
                    console.groupEnd();
                    blockly.Dialog.show("You are currently editing this project");
                    return;
                }
                let confirm = window.confirm("are you sure you ?");
                if (confirm) {
                    console.log('delete by id ' + blockly.Store.selectedId);
                    blockly.Entity.delete(blockly.Store.selectedId);
                    blockly.Entity.commit();
                    //delete file
                    console.log("delete file");
                    blockly.Entity.delete(blockly.Entity.getByParentId(blockly.Store.selectedId).id);
                    console.log("get view to delete");
                    this.listCont.querySelectorAll('.project').forEach((item) => {
                        if (item.getAttribute('data-id') == blockly.Store.selectedId) {
                            item.parentElement.removeChild(item);
                            console.log("ok");
                        }
                    });
                    blockly.Store.selectedId = '';
                }
                else {
                    console.log('cancel');
                }
                console.groupEnd();
            }
            static closeKlik() {
                this.cont.close();
                blockly.Store.selectedId = '';
                // this.project = null;
            }
            static renameKlik() {
                if (blockly.Store.selectedId == '') {
                    blockly.Dialog.show("no item selected");
                    return;
                }
                // if (this.isDemo) {
                //     Dialog.show("the project is read only")
                //     return;
                // }
                let w = window.prompt("renae", blockly.Entity.getById(blockly.Store.selectedId).nama);
                //todo: validate 
                if (w) {
                    blockly.Entity.getById(blockly.Store.selectedId).nama = w;
                    blockly.Entity.commit();
                    this.updateItemView(this.listCont.querySelector(`div[data-id='${blockly.Store.selectedId}']`), blockly.Entity.getById(blockly.Store.selectedId));
                }
                else {
                    blockly.Dialog.show("invalid name");
                }
            }
            static show() {
                // this.isDemo = false;
                this.cont.showModal();
                this.render();
            }
            // private static updateTombol() {
            //     let cont = this.cont.querySelector('.button-cont');
            //     cont.querySelectorAll('button').forEach((item) => {
            //         item.classList.remove('outline');
            //     })
            //     if (this.isDemo) {
            //         cont.querySelector('button.demo').classList.add('outline');
            //     }
            //     else {
            //         cont.querySelector('button.project').classList.add('outline');
            //     }
            // }
            static init() {
                this.cont = document.createElement('dialog');
                this.cont.classList.add('project-list');
                this.cont.innerHTML = `
                <div style="display:flex; flex-direction:column; height:100%">
                    <h4>Project List:</h4>
                    <div class='list-cont' style="flex-grow:1; overflow-y:auto">
                    </div>
                    <div>
                        <button onclick="ha.blockly.HalListProject.openKlik()">open</button>
                        <button onclick="ha.blockly.HalListProject.renameKlik()">rename</button>
                        <button onclick="ha.blockly.HalListProject.deleteKlik()">delete</button>
                        <button onclick="ha.blockly.HalListProject.closeKlik()">close</button>
                    </div>
                </div>
            `;
                this.listCont = this.cont.querySelector("div.list-cont");
                document.body.append(this.cont);
                // this.demoList = new ListDemoView();
                this.projekList = new ProjectList();
            }
            static updateItemView(el, item) {
                el.innerHTML = '';
                this.projekList.buatItemViewIsi(item, el);
            }
            static render() {
                blockly.Store.selectedId = '';
                this.listCont.innerHTML = '';
                this.projekList.render(this.listCont);
            }
        }
        blockly.HalListProject = HalListProject;
        class ProjectList {
            buatItemViewIsi(item, cont) {
                cont.innerHTML = `
                <span>${item.nama}</span>
            `;
            }
            //TODO: buat shared method
            buatItemView(item, cont) {
                let hasil;
                hasil = document.createElement('div');
                hasil.classList.add('project');
                hasil.setAttribute('data-id', item.id);
                hasil.onclick = () => {
                    blockly.Store.selectedId = item.id;
                    cont.querySelectorAll(".project").forEach((item2) => {
                        item2.classList.remove('selected');
                    });
                    hasil.classList.add('selected');
                };
                this.buatItemViewIsi(item, hasil);
                return hasil;
            }
            render(cont) {
                let list = blockly.Entity.getByType(blockly.EEntity.PROJECT);
                list = list.sort((item, item2) => {
                    if (item.nama < item2.nama)
                        return -1;
                    if (item.nama > item2.nama)
                        return 1;
                    return 0;
                });
                list.forEach((item) => {
                    cont.appendChild(this.buatItemView(item, cont));
                });
            }
        }
        class ListDemoEl {
            buatItemViewIsi(item, cont) {
                cont.innerHTML = `
                <span>${item.nama}</span>
            `;
            }
            buatItemView(item, cont) {
                let hasil;
                hasil = document.createElement('div');
                hasil.classList.add('project');
                hasil.setAttribute('data-id', item.id);
                hasil.onclick = () => {
                    blockly.Store.selectedId = item.id;
                    cont.querySelectorAll(".project").forEach((item2) => {
                        item2.classList.remove('selected');
                    });
                    hasil.classList.add('selected');
                };
                this.buatItemViewIsi(item, hasil);
                return hasil;
            }
            render(cont) {
                let list = demoData.filter((item) => {
                    return item.type == "project";
                });
                list = list.sort((item, item2) => {
                    if (item.nama < item2.nama)
                        return -1;
                    if (item.nama > item2.nama)
                        return 1;
                    return 0;
                });
                list.forEach((item) => {
                    // console.group('buat item view: ' + item.id);
                    // console.log(item);
                    // console.groupEnd();
                    cont.appendChild(this.buatItemView(item, cont));
                });
            }
        }
        class HalListDemo {
            static DemoButtonKlik() {
                this.render();
            }
            static openKlik() {
                if (blockly.Store.selectedId == '') {
                    //no selected
                    console.log('no selected');
                    blockly.Dialog.show("no item selected");
                    return;
                }
                if (blockly.Store.projectId == blockly.Store.selectedId) {
                    //already opened
                    console.log('already open');
                    blockly.Dialog.show("You are currently editing this project");
                    return;
                }
                let f;
                // let project
                let code;
                console.group("open project");
                console.log("selectedId:", blockly.Store.selectedId);
                f = demoData.find((item) => {
                    console.log(item);
                    return item.parentId == blockly.Store.selectedId;
                });
                console.log(f);
                console.groupEnd();
                code = JSON.parse(f.wspace);
                blockly.Store.idFile = f.id;
                blockly.Store.projectId = '';
                Blockly.serialization.workspaces.load(code, blockly.Index.workspace);
                this.closeKlik();
                blockly.Index.updateName();
            }
            static closeKlik() {
                this.cont.close();
                blockly.Store.selectedId = '';
                // this.project = null;
            }
            static show() {
                this.cont.showModal();
                this.render();
            }
            static init() {
                this.cont = document.createElement('dialog');
                this.cont.classList.add('project-list');
                this.cont.innerHTML = `
                <div style="display:flex; flex-direction:column; height:100%">
                    <h4>Demo::</h4>
                    <div class='list-cont' style="flex-grow:1; overflow-y:auto">
                    </div>
                    <div>
                        <button onclick="ha.blockly.HalListDemo.openKlik();">open</button>
                        <button onclick="ha.blockly.HalListDemo.closeKlik();">close</button>
                    </div>
                </div>
            `;
                this.listCont = this.cont.querySelector("div.list-cont");
                document.body.append(this.cont);
                this.listDemoEl = new ListDemoEl();
            }
            static render() {
                blockly.Store.selectedId = '';
                this.listCont.innerHTML = '';
                this.listDemoEl.render(this.listCont);
            }
        }
        blockly.HalListDemo = HalListDemo;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Id {
            static get id() {
                this._id++;
                return this.prefix + this._id + '';
            }
        }
        Id._id = Date.now();
        Id.prefix = (Math.floor(Math.random() * 8000) + 1000) + '';
        blockly.Id = Id;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Logo {
            static init() {
                this.dlg = document.createElement('dialog');
                let dlg = this.dlg;
                if (!(this.dlg).parentElement) {
                    document.body.appendChild(dlg);
                }
                dlg.innerHTML = `
            <div>
                <h1>BASIK BLOK</h1>
                <div class='block-cont'>
                    
                </div>
            </div>
        `;
                tombol(dlg.querySelector('div.block-cont'));
                function tombol(cont) {
                    let tbl;
                    tbl = document.createElement('button');
                    tbl.innerText = 'Start coding';
                    tbl.style.margin = '4px';
                    tbl.onclick = () => {
                        dlg.close();
                    };
                    cont.appendChild(tbl);
                    tbl = document.createElement('button');
                    tbl.innerText = 'Tutorial (Indonesia)';
                    tbl.classList.add('button');
                    tbl.style.margin = '4px';
                    tbl.onclick = () => {
                        dlg.close();
                        window.open("https://drive.google.com/drive/folders/101YzoTecPx7M3slR4zpxT_WiIJYqTZXz?usp=sharing", "_blank");
                    };
                    cont.appendChild(tbl);
                    tbl = document.createElement('button');
                    tbl.innerText = 'Download';
                    tbl.classList.add('button');
                    tbl.style.margin = '4px';
                    tbl.onclick = () => {
                        dlg.close();
                        window.open("https://drive.google.com/file/d/1iev3amQ2m7pp6u8l-gmGZ4mGL97dGzgO/view?usp=sharing", "_blank");
                    };
                    cont.appendChild(tbl);
                }
            }
        }
        blockly.Logo = Logo;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class ObjectParser {
            static parse(obj, depth = 0) {
                depth++;
                console.log('parse obj, d ' + depth);
                if (depth > 2)
                    return;
                for (let i in obj) {
                    console.log(i + '/' + typeof (i));
                    let j = i;
                    if (obj[j] instanceof Object) {
                        ObjectParser.parse(obj[j], depth);
                    }
                }
            }
        }
        blockly.ObjectParser = ObjectParser;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Op {
            static op() {
                //TODO: depecrated
                let w = window;
                w.simpan = () => {
                    Op.simpan();
                };
                w.load = () => {
                    Op.loadKlik();
                    // let simpan = window.localStorage.getItem("blocklytest");
                    // let code = JSON.parse(simpan);
                    // console.log(code);
                    // Blockly.serialization.workspaces.load(code, Index.workspace);
                };
                w.tambahVar = () => {
                    let var1 = prompt('variable baru');
                    let simpan = Blockly.serialization.workspaces.save(blockly.Index.workspace);
                    if (!simpan.variables) {
                        simpan.variables = [];
                    }
                    simpan.variables.push({
                        id: 'random_id' + Math.floor(Math.random() * 1000),
                        name: var1
                    });
                    Blockly.serialization.workspaces.load(simpan, blockly.Index.workspace);
                };
                w.run = () => {
                    let codeHtml = ha.blockly.Export.export(javascript.javascriptGenerator.workspaceToCode(blockly.Index.workspace));
                    window.localStorage.setItem("blocklycode", codeHtml);
                    window.open('./play.html', "_blank");
                    if (blockly.Store.devMode) {
                        Op.simpan();
                    }
                };
                w.publish = () => {
                    Op.publish();
                };
                w.exportJSON = () => {
                    Op.export();
                };
                w.importJSON = () => {
                    Op.import();
                };
            }
            static loadKlik() {
                // let list: IEntity[] = Entity.getByType(EEntity.PROJECT);
                // let p: IProject = list[0] as IProject;
                // let f: IFile = Entity.getByParentId(p.id) as IFile;
                //develop ui
                blockly.HalListProject.show();
                // let code = JSON.parse(f.wspace);
                // console.log(code);
                // Blockly.serialization.workspaces.load(code, Index.workspace);
                // Store.idFile = f.id;
                // Store.namaProject = p.nama;
                // console.log(list);
            }
            static publish() {
                let codeHtml = ha.blockly.Export.export(javascript.javascriptGenerator.workspaceToCode(blockly.Index.workspace), true);
                blockly.DialogPublish.open(`
                    <h1>Html Code</h1>
                    <p>
                        Copy content of textarea below, and save it to an .html file.<br/>
                        You can run the file directly without setting up a web-server.
                        Please build the folder structure according to your project.
                    </p>
            `, (codeHtml));
            }
            static export() {
                let simpan = Blockly.serialization.workspaces.save(blockly.Index.workspace);
                blockly.DialogExport.open(`
                    <h1>Export to JSON</h1>
                    <p>
                        Copy content of textarea below. You can save to afile, share to friend, or import them later.
                    </p>
            `, JSON.stringify(simpan).toString());
            }
            static import() {
                blockly.DialogImport.onClick = () => {
                    try {
                        let value = blockly.DialogImport.dlg.querySelector('textarea').value;
                        console.log(blockly.DialogImport.dlg);
                        console.log(value);
                        let code = JSON.parse(value);
                        Blockly.serialization.workspaces.load(code, blockly.Index.workspace);
                    }
                    catch (e) {
                        console.error(e);
                    }
                };
                blockly.DialogImport.open(`
                    <h1>Import from JSON</h1>
                    <p>
                        Fill the text area below with content you have exported before.
                    </p>
            `, "");
            }
            static resize() {
                const onresize = function () {
                    // Compute the absolute coordinates and dimensions of blocklyArea.
                    let element = blockly.Index.blocklyArea;
                    let x = 0;
                    let y = 0;
                    do {
                        x += element.offsetLeft;
                        y += element.offsetTop;
                        element = element.offsetParent;
                    } while (element);
                    // Position blocklyDiv over blocklyArea.
                    blockly.Index.blocklyDiv.style.left = x + 'px';
                    blockly.Index.blocklyDiv.style.top = y + 'px';
                    blockly.Index.blocklyDiv.style.width = blockly.Index.blocklyArea.offsetWidth + 'px';
                    blockly.Index.blocklyDiv.style.height = blockly.Index.blocklyArea.offsetHeight + 'px';
                    Blockly.svgResize(blockly.Index.workspace);
                };
                window.onresize = () => {
                    setTimeout(() => {
                        onresize();
                    }, 100);
                };
                setTimeout(() => {
                    onresize();
                }, 100);
            }
            static simpanBaru() {
                let id = blockly.Id.id;
                let nama = window.prompt("project name", "def1");
                //TOOD: validasi nama
                //save new project
                let p = {
                    id: id,
                    type: blockly.EEntity.PROJECT,
                    nama: nama,
                    parentId: "-1"
                };
                blockly.Entity.tambah(p);
                let f = {
                    id: blockly.Id.id,
                    type: blockly.EEntity.FILE,
                    nama: blockly.Store.idFile,
                    parentId: p.id,
                    wspace: JSON.stringify(Blockly.serialization.workspaces.save(blockly.Index.workspace))
                };
                //TODO: save file yang lain
                blockly.Store.idFile = f.id;
                blockly.Store.projectId = p.id;
                blockly.Entity.tambah(f);
                blockly.Entity.commit();
                blockly.Index.updateName();
                if (blockly.Store.tutMode) {
                    this.saveTutData();
                    this.saveTutList();
                    return;
                }
            }
            static simpan() {
                if (blockly.Store.projectId == "") {
                    this.simpanBaru();
                }
                else {
                    if (blockly.Store.tutMode) {
                        this.saveTutData();
                        this.saveTutList();
                    }
                    else {
                        let file = blockly.Entity.getById(blockly.Store.idFile);
                        file.wspace = JSON.stringify(Blockly.serialization.workspaces.save(blockly.Index.workspace));
                        blockly.Entity.commit();
                    }
                }
                blockly.Index.updateName();
                if (blockly.Store.devMode) {
                    Op.demo();
                }
            }
            static code() {
                // let code = javascript.javascriptGenerator.workspaceToCode(Index.workspace);
                console.log(Blockly.serialization.workspaces.save(blockly.Index.workspace));
                console.log(JSON.stringify(Blockly.serialization.workspaces.save(blockly.Index.workspace)));
            }
            static doc() {
                window.open('./about.html', "_blank");
            }
            static demo() {
                if (blockly.Store.tutMode) {
                    Op.saveTutData();
                    Op.saveTutList();
                    return;
                }
                try {
                    const body = blockly.Entity.loadDataFromStorage();
                    let fd = new FormData();
                    fd.append("body", body);
                    fd.append("dev", 'true');
                    fd.append("tut", 'false');
                    fd.append("list", "false");
                    fetch("http://localhost/repo/bblocky/demo.php", {
                        // headers: { 'Content-Type': 'application/json' }, // Added in response to comment
                        method: 'POST',
                        body: fd
                    })
                        .then(function (response) {
                        console.log(response);
                        console.log(response.text().then((e) => {
                            console.log("response text");
                            console.log(e);
                        }));
                        // response.json().then((e) => {
                        //     console.log(e)
                        // }).catch((e) => {
                        //     console.error(e)
                        // })
                    })
                        .catch((e) => {
                        console.error(e);
                    });
                }
                catch (e) {
                    console.error(e);
                }
            }
            static saveTutData() {
                try {
                    const body = JSON.stringify(Blockly.serialization.workspaces.save(blockly.Index.workspace));
                    console.log("body");
                    console.log(Blockly.serialization.workspaces.save(blockly.Index.workspace));
                    let fd = new FormData();
                    fd.append("body", body);
                    fd.append("dev", 'false');
                    fd.append("tut", 'true');
                    fd.append("list", "false");
                    fd.append("id", blockly.Store.projectId);
                    fetch("http://localhost/repo/bblocky/demo.php", {
                        method: 'POST',
                        body: fd
                    }).then(function (response) {
                        console.group("save tut data finish");
                        console.log(response);
                        console.groupEnd();
                        response.text().then((e) => {
                            console.group("save tut response text:");
                            console.log("response text");
                            console.log(e);
                            console.groupEnd();
                        }).catch((e) => {
                            console.error(e);
                        });
                    }).catch((e) => {
                        console.error(e);
                    });
                }
                catch (e) {
                    console.error(e);
                }
            }
            static saveTutList() {
                try {
                    const body = JSON.stringify(blockly.Entity.getByType(blockly.EEntity.PROJECT));
                    let fd = new FormData();
                    fd.append("body", body);
                    fd.append("dev", 'false');
                    fd.append("tut", 'false');
                    fd.append("list", "true");
                    fetch("http://localhost/repo/bblocky/demo.php", {
                        method: 'POST',
                        body: fd
                    }).then(function (response) {
                        console.group("save tut list finish");
                        console.log(response);
                        console.groupEnd();
                        response.text().then((e) => {
                            console.group("save tut list response text:");
                            console.log("response text");
                            console.log(e);
                            console.groupEnd();
                        }).catch((e) => {
                            console.error(e);
                        });
                    }).catch((e) => {
                        console.error(e);
                    });
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
        blockly.Op = Op;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Store {
            static get tutMode() {
                return Store._tutMode;
            }
            static set tutMode(value) {
                Store._tutMode = value;
            }
            static get devMode() {
                return Store._devMode;
            }
            static set devMode(value) {
                Store._devMode = value;
            }
            static get selectedId() {
                return Store._selectedId;
            }
            static set selectedId(value) {
                Store._selectedId = value;
            }
            static get demo() {
                return Store._demo;
            }
            static set demo(value) {
                Store._demo = value;
            }
            static get defWSpace() {
                return Store._defWSpace;
            }
            static set defWSpace(value) {
                Store._defWSpace = value;
            }
            static get projectId() {
                return Store._projectId;
            }
            static set projectId(value) {
                Store._projectId = value;
            }
            static get idFile() {
                return Store._idFile;
            }
            static set idFile(value) {
                Store._idFile = value;
            }
        }
        Store._idFile = '';
        Store._projectId = '';
        Store._defWSpace = '';
        Store._demo = [];
        Store._selectedId = '';
        Store._devMode = false;
        Store._tutMode = false;
        blockly.Store = Store;
        Store.defWSpace = "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"ha.be.Be.Start\",\"id\":\"ttDi6Y1piNqKi!GKH=;f\",\"x\":249,\"y\":198,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"!n`U},x?W~b8S2S9fc;-\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"(i=R@FswM^]Ps$?-8bzQ\",\"fields\":{\"NUM\":240}}},\"statementst\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}}}}}},{\"type\":\"ha.be.Be.Update\",\"id\":\"D!_p@;(TK|!Jb;q9U}?k\",\"x\":389,\"y\":333,\"inputs\":{\"statementst\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar\",\"id\":\"TKi]Pbe|YLS%b}yYe+1L\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"Oxp^k?rAe(XG%z7DGmrI\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"iR^9X(~I02#.l.kt.[;:\",\"fields\":{\"NUM\":120}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Sn*[t/Kt[]3J~cg5t9-K\",\"fields\":{\"NUM\":100}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}";
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class WorkSpace {
        }
        blockly.WorkSpace = WorkSpace;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var EOutput;
(function (EOutput) {
    EOutput["Boolean"] = "Boolean";
    EOutput["Number"] = "Number";
    EOutput["String"] = "String";
    EOutput["Array"] = "Array";
    EOutput["Dummy"] = "dummy";
    EOutput["Any"] = "";
    // Statement = "statement",
})(EOutput || (EOutput = {}));
var EArgType;
(function (EArgType) {
    EArgType["inputValue"] = "input_value";
    EArgType["inputDummy"] = "input_dummy";
    EArgType["statementValue"] = "input_statement";
    EArgType["input_end_row"] = "input_end_row";
})(EArgType || (EArgType = {}));
var ToolBoxKind;
(function (ToolBoxKind) {
    ToolBoxKind["categoryToolbox"] = "categoryToolbox";
    ToolBoxKind["category"] = "category";
    ToolBoxKind["block"] = "block";
})(ToolBoxKind || (ToolBoxKind = {}));
///<reference path="./toolboxType.ts"/>
/**
 * blitz toolbox definition
 */
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var BDef;
        (function (BDef) {
            /**
             * normalize all block
             */
            function normalizeAllBlock(list) {
                // hiddenData.list.forEach((item) => { normal(item); });
                // BlitzData.list.forEach((item) => { normal(item); });
                // ImageBlockData.list.forEach((item) => { normal(item) });
                // ImageBlockData2.list.forEach((item) => { normal(item) });
                // debugData.list.forEach((item) => { normal(item) });
                // InputBlockData.list.forEach((item) => { normal(item) })
                // TextData.list.forEach((item) => { normal(item) })
                // MathBlockData.list.forEach((item) => { normal(item) })
                normalizeAllBlock2(list);
            }
            BDef.normalizeAllBlock = normalizeAllBlock;
            function normalizeAllBlock2(list) {
                list.forEach((item) => {
                    item.list.forEach((item) => { normal(item); });
                });
                // hiddenData.list.forEach((item) => { normal(item); });
                // BlitzData.list.forEach((item) => { normal(item); });
                // ImageBlockData.list.forEach((item) => { normal(item) });
                // ImageBlockData2.list.forEach((item) => { normal(item) });
                // debugData.list.forEach((item) => { normal(item) });
                // InputBlockData.list.forEach((item) => { normal(item) })
                // TextData.list.forEach((item) => { normal(item) })
                // MathBlockData.list.forEach((item) => { normal(item) })
            }
            BDef.normalizeAllBlock2 = normalizeAllBlock2;
            /**
             * add default value
             * @param t
             */
            function defValue(t) {
                // console.group("defValue");
                // console.log(t);
                if (t.output != undefined) {
                }
                else {
                    t.previousStatement = null;
                    t.nextStatement = null;
                }
                if (!Object.hasOwn(t, "inputsInline")) {
                    t.inputsInline = false;
                }
                if (t.kurung == undefined) {
                    t.kurung = true;
                }
                t.colour = 230;
                t.tooltip = t.tooltip || "";
                t.helpUrl = t.helpUrl || "";
                // if (t.hidden != undefined) {
                //     t.hidden
                // }
                // console.log(t)
                // console.groupEnd();
            }
            /**
             * create shadow based on input
             * @param t
             * @returns
             */
            function createShadow(t) {
                // console.group('create shadow');
                // console.log(t.check);
                // console.groupEnd();
                if (EOutput.String == t.check) {
                    return {
                        shadow: {
                            "type": "text",
                            "fields": {
                                "TEXT": t.default
                            }
                        }
                    };
                }
                else if (EOutput.Number == t.check) {
                    return {
                        shadow: {
                            "type": "math_number",
                            "fields": {
                                "NUM": t.default
                            }
                        }
                    };
                }
                else if (EOutput.Boolean == t.check) {
                    return {
                        shadow: {
                            "type": "logic_boolean",
                            "fields": {
                                "BOOL": t.default
                            }
                        }
                    };
                }
                else if (EOutput.Dummy == t.check) {
                    return null;
                }
                else if (t.check == undefined) {
                    return null;
                }
                throw Error('not supported: ' + t.check);
            }
            function addArg(t) {
                // console.group('add arg ');
                // console.log(t);
                function getCheck(n) {
                    if (typeof n == "number")
                        return EOutput.Number;
                    if (typeof n == "string")
                        return EOutput.String;
                    if (typeof n == "boolean")
                        return EOutput.Boolean;
                    if (typeof n == "object")
                        return EOutput.Any;
                    //TODO: null
                    throw Error(n);
                }
                t.args0 = [];
                for (let i in t.args) {
                    if ("dummy" == i.toLocaleLowerCase()) {
                        t.args0.push({
                            type: EArgType.inputDummy
                        });
                    }
                    else if ("any" == i.toLocaleLowerCase()) {
                        //TODO:
                    }
                    else if ("statement" == i.toLocaleLowerCase()) {
                        t.args0.push({
                            type: EArgType.statementValue,
                            name: i + 'st'
                        });
                    }
                    else if (EArgType.input_end_row == i.toLowerCase()) {
                        t.args0.push({
                            type: EArgType.input_end_row,
                        });
                        console.log("END ROW");
                    }
                    else {
                        let check = getCheck(t.args[i]);
                        // console.log("check:", check);
                        if (EOutput.Any == check) {
                            // console.log("any");
                            t.args0.push({
                                type: EArgType.inputValue,
                                name: i + ''
                            });
                        }
                        else {
                            // console.log("skalar");
                            t.args0.push({
                                check: check,
                                type: EArgType.inputValue,
                                default: t.args[i] + '',
                                name: i + ''
                            });
                        }
                    }
                }
                // console.groupEnd();
            }
            /**
             * add default input
             * @param t
             * @returns
             */
            function addInput(t) {
                if (t.inputs)
                    return;
                let inputs = {};
                t.args0.forEach((item) => {
                    if (item.type == EArgType.inputDummy) {
                    }
                    else if (item.type == EArgType.statementValue) {
                    }
                    else if (item.type == EArgType.input_end_row) {
                    }
                    else {
                        let shadow = createShadow(item);
                        if (shadow != null) {
                            inputs[item.name] = shadow;
                        }
                    }
                });
                t.inputs = inputs;
            }
            function normal(t) {
                defValue(t);
                addArg(t);
                addInput(t);
                if (t.type == "ha.be.Be.Update") {
                    console.log(t);
                }
            }
        })(BDef = blockly.BDef || (blockly.BDef = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Export {
            static export(code, prod = false) {
                console.group("export:");
                console.log(code);
                console.groupEnd();
                let data2 = this.dataHtml.replace('<!--be-js-here-->', prod ? this.beUrlProd : this.beUrl);
                data2 = data2.replace('/** template **/', this.dataTemplate);
                data2 = data2.replace('/** script here **/', code);
                // debugger;
                return data2;
            }
        }
        Export.beUrl = `./js/be.js`;
        Export.beUrlProd = `https://forkhub.github.io/bblok/js/be.js`;
        Export.dataTemplate = `
"use strict";
window.onload = () => {
    console.log('start');
    /** script here **/
    let __update; // = update || Update || UPDATE as any;
    if (typeof _update === "function")
        __update = _update;
    console.log(__update);
    let __updater = () => {
        if (__update) {
            __update();
        }
        requestAnimationFrame(__updater);
    };
    requestAnimationFrame(__updater);
};
        `;
        Export.dataHtml = `
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0,
        target-densityDpi=device-dpi">
    <title>Basik Blok</title>
    <style>
        canvas {
            image-rendering: pixelated;
        }
    </style>
</head>

<body>
    <canvas></canvas>

    <!-- copy be.js script to your local to help save bandwith, thanks -->
    <script src="<!--be-js-here-->"></script>

    <!-- main  -->
    <script>
        /** template **/
    </script>
</body>

</html>
        `;
        blockly.Export = Export;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Iframe {
            static init() {
                console.log("init");
                let simpan = window.localStorage.getItem("blocklycode");
                let iframe = document.querySelector('iframe');
                let doc = iframe.contentWindow.document;
                doc.open();
                doc.write(simpan);
                doc.close();
            }
        }
        blockly.Iframe = Iframe;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
///<reference path="./toolboxType.ts"/>
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var toolbox;
        (function (toolbox_1) {
            function init() {
                const blockRawData = [
                    blockly.hiddenData,
                    blockly.BlitzData,
                    blockly.ImageBlockData,
                    blockly.ImageBlockData2,
                    blockly.debugData,
                    blockly.InputBlockData,
                    blockly.TextData,
                    blockly.MathBlockData,
                ];
                blockly.BDef.normalizeAllBlock(blockRawData);
                let allToolBoxDef = populateToolBox(blockRawData);
                Blockly.common.defineBlocksWithJsonArray(allToolBoxDef);
                //TODO: list
                blockRawData.forEach((item) => {
                    toolbox_1.toolbox.contents.push(getCategory(item.group, item.list, item.hidden)); //registerBlitz());
                });
                // toolbox.contents.push(getCategory(hiddenData.group, hiddenData.list, "true")); //registerBlitz());
                // toolbox.contents.push(getCategory(BlitzData.group, BlitzData.list)); //registerBlitz());
                // toolbox.contents.push(getCategory(ImageBlockData.group, ImageBlockData.list));
                // toolbox.contents.push(getCategory(ImageBlockData2.group, ImageBlockData2.list));
                // toolbox.contents.push(getCategory(InputBlockData.group, InputBlockData.list));
                // toolbox.contents.push(getCategory(TextData.group, TextData.list));
                // toolbox.contents.push(getCategory(MathBlockData.group, MathBlockData.list));
                // toolbox.contents.push(getCategory(debugData.group, debugData.list));
                js(allToolBoxDef);
            }
            toolbox_1.init = init;
            function getCategory(nama, l, hidden = "false") {
                let h = {
                    kind: "category",
                    name: nama,
                    contents: getToolBoxContentDef(l),
                    hidden: hidden
                };
                return h;
            }
            /*
            function registerImage(): TToolbokContentDef {
                let h: TToolbokContentDef = {
                    kind: "category",
                    name: "Image",
                    contents: getToolBoxContentDef(ImageBlockData.list)
                }
        
                // //register blitz content
                // ImageBlockData.list.forEach((item) => {
                //     let def: TToolbokContentDef = {
                //         name: item.type,
                //         kind: ToolBoxKind.block,
                //         type: item.type
                //     }
                //     if (item.inputs) {
                //         def.inputs = item.inputs
                //     }
        
                //     h.contents.push(def);
                // })
        
                return h;
            }
            */
            function getToolBoxContentDef(l) {
                //register blitz content 
                let h = [];
                l.forEach((item) => {
                    let def = {
                        name: item.type,
                        kind: ToolBoxKind.block,
                        type: item.type
                    };
                    if (item.inputs) {
                        def.inputs = item.inputs;
                    }
                    h.push(def);
                });
                return h;
            }
            /*
            function registerBlitz(): TToolbokContentDef {
                let blitz: TToolbokContentDef =
                {
                    kind: "category",
                    name: "Blitz",
                    contents: []
                }
        
                //register blitz content
                BlitzData.list.forEach((item) => {
                    let def: TToolbokContentDef = {
                        name: item.type,
                        kind: ToolBoxKind.block,
                        type: item.type
                    }
                    if (item.inputs) {
                        def.inputs = item.inputs
                    }
        
                    blitz.contents.push(def);
                })
        
        
                return blitz;
            }
            */
            function populateToolBox(l) {
                let blockData = [];
                l.forEach((item) => {
                    item.list.forEach((item) => {
                        blockData.push(item);
                    });
                });
                // hiddenData.list.forEach((item) => {
                // 	blockData.push(item);
                // })
                // BlitzData.list.forEach((item) => {
                // 	blockData.push(item);
                // })
                // ImageBlockData.list.forEach((item) => {
                // 	blockData.push(item);
                // })
                // ImageBlockData2.list.forEach((item) => {
                // 	blockData.push(item);
                // })
                // debugData.list.forEach((item) => {
                // 	blockData.push(item);
                // })
                // InputBlockData.list.forEach((item) => {
                // 	blockData.push(item);
                // })
                // TextData.list.forEach((item) => {
                // 	blockData.push(item);
                // })
                // MathBlockData.list.forEach((item) => {
                // 	blockData.push(item);
                // })
                return blockData;
            }
            function js(blockData) {
                for (let i = 0; i < blockData.length; i++) {
                    let itemBlockData = blockData[i];
                    // console.log('type: ' + itemBlockData.type);
                    javascript.javascriptGenerator.forBlock[itemBlockData.type] = (block, generator) => {
                        let code = '';
                        let statement = '';
                        console.group("");
                        if (itemBlockData.output == undefined) {
                            code += `\n/*${itemBlockData.message0}*/\n`;
                        }
                        code += itemBlockData.perintah.split('_')[0];
                        code = code.replace("#update", "_update");
                        if (itemBlockData.kurung) {
                            code += '(';
                        }
                        console.log('code', code);
                        itemBlockData.args0.forEach((item, idx) => {
                            if (item.type == EArgType.inputDummy) {
                            }
                            else if (item.type == EArgType.input_end_row) {
                            }
                            else if (item.type == EArgType.statementValue) {
                                console.log("arg statement");
                                statement = generator.statementToCode(block, item.name);
                            }
                            else {
                                let value = generator.valueToCode(block, item.name, javascript.Order.ATOMIC);
                                code += value;
                                if (idx < itemBlockData.args0.length - 1) {
                                    code += ',';
                                }
                                console.log('code', code);
                            }
                        });
                        if (itemBlockData.kurung) {
                            code += ')';
                        }
                        console.log('code', code);
                        if (statement) {
                            console.log("statement:", statement);
                            if (itemBlockData.stmt) {
                                code += `{${statement}}`;
                            }
                            else {
                                code += `;\n${statement}\n`;
                            }
                        }
                        else {
                        }
                        console.log("code", code);
                        console.groupEnd();
                        if (itemBlockData.output != null) {
                            return [code, Blockly.JavaScript.ORDER_NONE];
                        }
                        else {
                            return code + ';\n';
                        }
                    };
                }
            }
            // let blockData: TBlockDef[] = [];
            //default toolbox
            toolbox_1.toolbox = {
                kind: ToolBoxKind.categoryToolbox,
                contents: [
                    {
                        kind: ToolBoxKind.category,
                        name: "Logic",
                        contents: [
                            {
                                kind: "block",
                                type: "controls_if"
                            },
                            {
                                kind: "block",
                                type: "logic_compare"
                            },
                            {
                                kind: "block",
                                type: "logic_operation"
                            },
                            {
                                kind: "block",
                                type: "logic_negate"
                            },
                            {
                                kind: "block",
                                type: "logic_boolean"
                            },
                            {
                                kind: "block",
                                type: "logic_null"
                            },
                            {
                                kind: "block",
                                type: "logic_ternary"
                            }
                        ]
                    },
                    {
                        kind: "category",
                        name: "Loops",
                        contents: [
                            {
                                kind: "block",
                                type: "controls_repeat_ext"
                            },
                            {
                                kind: "block",
                                type: "controls_whileUntil"
                            }, {
                                kind: "block",
                                type: "controls_for"
                            }, {
                                kind: "block",
                                type: "controls_forEach"
                            }, {
                                kind: "block",
                                type: "controls_flow_statements"
                            },
                        ]
                    },
                    {
                        kind: "category",
                        name: "Math",
                        contents: [
                            {
                                kind: "block",
                                type: "math_number"
                            },
                            {
                                kind: "block",
                                type: "math_arithmetic",
                            },
                            {
                                kind: "block",
                                type: "math_single"
                            },
                            {
                                kind: "block",
                                type: "math_trig"
                            },
                            {
                                kind: "block",
                                type: "math_constant"
                            },
                            {
                                kind: "block",
                                type: "math_number_property"
                            },
                            {
                                kind: "block",
                                type: "math_round"
                            },
                            {
                                kind: "block",
                                type: "math_on_list"
                            },
                            {
                                kind: "block",
                                type: "math_modulo"
                            },
                            {
                                kind: "block",
                                type: "math_constrain"
                            },
                            {
                                kind: "block",
                                type: "math_random_int"
                            },
                            {
                                kind: "block",
                                type: "math_random_float"
                            },
                        ]
                    },
                    {
                        kind: "category",
                        name: "Text",
                        contents: [
                            {
                                kind: "block",
                                type: "text"
                            },
                            {
                                kind: "block",
                                type: "text_join"
                            },
                            {
                                kind: "block",
                                type: "text_append"
                            },
                            {
                                kind: "block",
                                type: "text_length"
                            },
                            {
                                kind: "block",
                                type: "text_isEmpty"
                            },
                            {
                                kind: "block",
                                type: "text_indexOf"
                            },
                            {
                                kind: "block",
                                type: "text_charAt"
                            },
                            {
                                kind: "block",
                                type: "text_getSubstring"
                            },
                            {
                                kind: "block",
                                type: "text_changeCase"
                            },
                            {
                                kind: "block",
                                type: "text_trim"
                            },
                            {
                                kind: "block",
                                type: "text_print"
                            },
                            {
                                kind: "block",
                                type: "text_prompt_ext"
                            },
                        ]
                    },
                    {
                        kind: "category",
                        name: "Lists",
                        contents: [
                            {
                                kind: "block",
                                type: "lists_create_with"
                            },
                            {
                                kind: "block",
                                type: "lists_repeat"
                            },
                            {
                                kind: "block",
                                type: "lists_length"
                            },
                            {
                                kind: "block",
                                type: "lists_isEmpty"
                            },
                            {
                                kind: "block",
                                type: "lists_indexOf"
                            },
                            {
                                kind: "block",
                                type: "lists_getIndex"
                            },
                            {
                                kind: "block",
                                type: "lists_setIndex"
                            },
                            {
                                kind: "block",
                                type: "lists_getSublist"
                            },
                            {
                                kind: "block",
                                type: "lists_split"
                            },
                            {
                                kind: "block",
                                type: "lists_sort"
                            },
                        ]
                    },
                    {
                        kind: "category",
                        name: "Variables",
                        custom: "VARIABLE",
                    },
                    {
                        kind: "category",
                        name: "Functions",
                        custom: "PROCEDURE"
                    }
                ]
            };
        })(toolbox = blockly.toolbox || (blockly.toolbox = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
///<reference path="./toolbox.ts"/>
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Index {
            static updateName() {
                let spanNama = document.body.querySelector("span.judul_file");
                if (blockly.Store.projectId) {
                    spanNama.innerHTML = blockly.Entity.getById(blockly.Store.projectId).nama;
                }
                else {
                    spanNama.innerHTML = "untitled";
                }
            }
            static initWorkSpace() {
                Blockly.Msg["VARIABLES_SET"] = "%1 = %2";
                Blockly.Msg["MATH_CHANGE_TITLE"] = "%1 += %2";
                var options = {
                    toolbox: ha.blockly.toolbox.toolbox,
                    collapse: true,
                    comments: true,
                    disable: true,
                    maxBlocks: Infinity,
                    trashcan: true,
                    // horizontalLayout: true,
                    toolboxPosition: 'start',
                    css: true,
                    media: 'https://blockly-demo.appspot.com/static/media/',
                    rtl: false,
                    scrollbars: true,
                    sounds: true,
                    oneBasedIndex: true
                };
                Index.workspace = Blockly.inject("blocklyDiv", options);
                Index.blocklyArea = document.body.querySelector('#blocklyArea');
                Index.blocklyDiv = document.body.querySelector('#blocklyDiv');
            }
            static getQuery(key) {
                let q = '';
                let h = '';
                console.group('get query: ' + key);
                q = window.top.location.search;
                console.log(q);
                q = q.slice(1, q.length);
                console.log(q);
                let qAr = q.split("&");
                console.log(qAr);
                qAr.forEach((item) => {
                    let keyAr = item.split('=');
                    let pKey = keyAr[0];
                    if (pKey == key) {
                        h = keyAr[1];
                    }
                });
                console.log(h);
                console.groupEnd();
                return h;
            }
            static init() {
                if (this.getQuery("dev") == "true") {
                    console.log('dev mode');
                    blockly.Store.devMode = true;
                }
                else if (this.getQuery("tut") == "true") {
                    blockly.Store.tutMode = true;
                }
                else {
                    // Logo.show
                    ha.blockly.Logo.init();
                    blockly.Logo.dlg.showModal();
                }
                blockly.HalListProject.init();
                blockly.HalListDemo.init();
                ha.blockly.Entity.init();
                ha.blockly.toolbox.init();
                Index.initWorkSpace();
                blockly.Op.resize();
                blockly.Op.op();
                try {
                    let def = JSON.parse(blockly.Store.defWSpace);
                    console.log(def);
                    Blockly.serialization.workspaces.load(JSON.parse(blockly.Store.defWSpace), Index.workspace);
                    if (blockly.Store.devMode) {
                    }
                }
                catch (e) {
                    console.error(e);
                }
                this.updateName();
                if (blockly.Store.devMode || blockly.Store.tutMode) {
                    document.querySelector("span#span_dev_mode").style.display = 'inline';
                }
                if (this.getQuery("tid")) {
                    //load from session storage
                    try {
                        // let str = sessionStorage.getItem('blockly_demo_workspace');
                        // let obj = JSON.parse
                        // Blockly.serialization.workspaces.load(JSON.parse(Store.defWSpace), Index.workspace);
                    }
                    catch (e) {
                    }
                }
            }
        }
        blockly.Index = Index;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var TBlockType;
(function (TBlockType) {
    TBlockType["DEC_FUNGSI_NO_RETURN"] = "procedures_defnoreturn";
    TBlockType["PANGGIL_FUNGSI_NO_RETURN"] = "procedures_callnoreturn";
    TBlockType["VAR_SET"] = "variables_set";
    TBlockType["VAR_GET"] = "variables_get";
    TBlockType["LIT_MATH"] = "math_number";
})(TBlockType || (TBlockType = {}));
var b;
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var InputBlockData;
        (function (InputBlockData) {
            InputBlockData.list = [];
            InputBlockData.group = "Input";
            InputBlockData.hidden = "false";
            // ha.be.Input.InputHit;
            // InputHit
            InputBlockData.list.push({
                type: "ha.be.Input.InputHit",
                perintah: "InputHit",
                message0: "Input Hit count",
                tooltip: `
            Return how many time an input is pressed since the last call.
            Calling this method inside update block will return the count between update.
        `,
                output: EOutput.Number
            });
            // ha.be.Input.InputX;
            InputBlockData.list.push({
                type: "ha.be.Input.InputX",
                perintah: "InputX",
                message0: "Input X position",
                tooltip: "return the x position of input",
                output: EOutput.Number
            });
            // ha.be.Input.InputY
            InputBlockData.list.push({
                type: "ha.be.Input.InputY",
                perintah: "InputY",
                message0: "Input Y position",
                tooltip: "return the y position of input",
                output: EOutput.Number
            });
            //Input extended
            // ===========
            // ha.be.Input.Pencet
            InputBlockData.list.push({
                type: "ha.be.Input.Pencet",
                perintah: "InputIsDown",
                message0: "Input Is Down",
                tooltip: "return true if an input is pressed",
                output: EOutput.Boolean
            });
            // const GeserX = ha.be.Input.GeserX;
            InputBlockData.list.push({
                type: "ha.be.Input.GeserX",
                perintah: "InputDragX",
                message0: "Drag X position",
                tooltip: "return drag x position relative to start position",
                output: EOutput.Number
            });
            // const DragY = ha.be.Input.GeserY;
            InputBlockData.list.push({
                type: "ha.be.Input.GeserY",
                perintah: "InputDragY",
                message0: "Drag Y position",
                tooltip: "return drag y position relative to start position",
                output: EOutput.Number
            });
            // const IsDragged = ha.be.Input.Geser;
            InputBlockData.list.push({
                type: "ha.be.Input.Geser",
                perintah: "InputIsDragged",
                message0: "Input Is Dragged",
                tooltip: "return true if input is dragged",
                output: EOutput.Boolean
            });
            // const InputDragStartX = ha.be.Input.InputXAwal;
            InputBlockData.list.push({
                type: "ha.be.Input.InputXAwal",
                perintah: "InputDragStartX",
                message0: "Input Drag Start X",
                tooltip: "Return x position of the initial drag",
                output: EOutput.Number
            });
            // const InputDragStartY = ha.be.Input.InputYAwal;
            InputBlockData.list.push({
                type: "ha.be.Input.InputYAwal",
                perintah: "InputDragStartY",
                message0: "Input Drag Start Y",
                tooltip: "Return y position of the initial drag",
                output: EOutput.Number
            });
            // const InputTapCount = ha.be.Input.JmlTap;
            InputBlockData.list.push({
                type: "ha.be.Input.JmlTap",
                perintah: "InputTapCount",
                message0: "Input Tap Count",
                tooltip: `
            Return the number of tap happens since last call.
            Calling this method inside update block will return the count between update.
        `,
                output: EOutput.Number
            });
            // const InputDragStartCount = ha.be.Input.JmlDragMulai;
            InputBlockData.list.push({
                type: "ha.be.Input.JmlDragMulai",
                perintah: "InputDragStartCount",
                message0: "Input Drag Start Count",
                tooltip: `
            Return the number drag happens since last call.
            Calling this method inside update block will return the count between update.
        `,
                output: EOutput.Number
            });
            // const InputDragEndCount = ha.be.Input.JmlDragSelesai;
            InputBlockData.list.push({
                type: "ha.be.Input.JmlDragSelesai",
                perintah: "InputDragEndCount",
                message0: "Input Drag End Count",
                tooltip: `
            Return the number drag ends since last call.
            Calling this method inside update block will return the count between update.
        `,
                output: EOutput.Number
            });
        })(InputBlockData = blockly.InputBlockData || (blockly.InputBlockData = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var MathBlockData;
        (function (MathBlockData) {
            MathBlockData.list = [];
            MathBlockData.group = "Math 2";
            MathBlockData.hidden = "false";
            // DistMin
            // ha.be.Transform.degDistMin
            MathBlockData.list.push({
                type: "ha.be.Transform.degDistMin",
                perintah: "DistMin",
                message0: "Dist from %1 to %2",
                args: {
                    fw: 0,
                    fh: 0
                },
                output: EOutput.Number,
                inputsInline: true,
                tooltip: 'return minimum distance between two angles'
            });
        })(MathBlockData = blockly.MathBlockData || (blockly.MathBlockData = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var debugData;
        (function (debugData) {
            debugData.list = [];
            debugData.group = "Misc";
            debugData.hidden = "false";
            debugData.list.push({
                type: "console.log",
                perintah: "console.log",
                message0: "Log %1",
                args: {
                    log: ""
                },
                tooltip: "console log",
            });
            debugData.list.push({
                type: "debugger",
                perintah: "debugger",
                message0: "Pause",
                tooltip: `
            Pause a program when developer tool is open.
            This is the alias for debugger
        `,
                kurung: false
            });
            debugData.list.push({
                type: "note",
                perintah: "//",
                kurung: false,
                message0: "📝 %1",
                args: {
                    comment: ""
                },
                tooltip: "Add note. Will be converted into comment in the real code",
            });
        })(debugData = blockly.debugData || (blockly.debugData = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var Dict;
        (function (Dict) {
            Dict.list = [];
            Dict.group = "Misc 2";
        })(Dict = blockly.Dict || (blockly.Dict = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var SoundData;
        (function (SoundData) {
            SoundData.list = [];
            SoundData.group = "sound";
            // ha.be.Sound.Load;
            // ha.be.Sound.Play;
            // ha.be.Sound.SoundEnded;
            // ha.be.Sound.SoundLoaded
            SoundData.list.push({
                type: "ha.be.Sound.Load",
                perintah: "LoadSound",
                message0: "Load Sound",
                tooltip: `
            Load sound from URL
        `,
                output: EOutput.Any
            });
        })(SoundData = blockly.SoundData || (blockly.SoundData = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var TextData;
        (function (TextData) {
            TextData.list = [];
            TextData.group = "Text 2";
            TextData.hidden = "false";
            // Shortcut buat perintah-perintah font
            // FontName
            TextData.list.push({
                type: "ha.be.Teks.Font",
                perintah: "FontName",
                message0: "Set Font Name to %1",
                args: {
                    name: "cursive"
                }
            });
            // ha.be.Teks.FontSize
            // FontSize 
            TextData.list.push({
                type: "ha.be.Teks.FontSize",
                perintah: "FontSize",
                message0: "Set Font Size to %1",
                args: {
                    size: 14
                }
            });
            // const Align = ha.be.Teks.Rata;
            TextData.list.push({
                type: "ha.be.Teks.Rata",
                perintah: "Align",
                message0: "Set Font Alignment to %1",
                args: {
                    align: "left"
                }
            });
            // ha.be.Teks.Goto;
            TextData.list.push({
                type: "ha.be.Teks.Goto",
                perintah: "ha.be.Teks.Goto",
                message0: "Set Text position to x %1 y %2",
                inputsInline: true,
                args: {
                    x: 0,
                    y: 0
                }
            });
            // ha.be.Teks.fill
            TextData.list.push({
                type: "ha.be.Teks.fill",
                perintah: "ha.be.Teks.fill",
                message0: "Use Font Color Fill is %1",
                args: {
                    fill: true
                }
            });
            // ha.be.Teks.stroke;
            TextData.list.push({
                type: "ha.be.Teks.stroke",
                perintah: "ha.be.Teks.stroke",
                message0: "Use Font Color stroke is %1",
                args: {
                    stroke: false
                }
            });
            // ha.be.Teks.jarak
            TextData.list.push({
                type: "ha.be.Teks.jarak",
                perintah: "ha.be.Teks.jarak",
                message0: "Set line-height to %1",
                args: {
                    height: 40
                }
            });
            // ha.be.Teks.Write;
            TextData.list.push({
                type: "ha.be.Teks.Write",
                perintah: "ha.be.Teks.Write",
                message0: "Write %1",
                args: {
                    text: ""
                }
            });
            // ha.be.Teks.WriteLn;
            TextData.list.push({
                type: "ha.be.Teks.WriteLn",
                perintah: "ha.be.Teks.WriteLn",
                message0: "WriteLn %1",
                args: {
                    text: ""
                },
                tooltip: "Write text and move position to next line"
            });
            // const Print = ha.be.Teks.Tulis;
            TextData.list.push({
                type: "ha.be.Teks.Tulis",
                perintah: "Print",
                message0: "Write %1 text %2 x: %3 y: %4 use fill: %5 use stroke: %6",
                args: {
                    dummy: "",
                    text: "",
                    x: 0,
                    y: 0,
                    fill: true,
                    stroke: false
                }
            });
        })(TextData = blockly.TextData || (blockly.TextData = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
///<reference path="../toolboxType.ts"/>
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var BlitzData;
        (function (BlitzData) {
            BlitzData.group = "Graphics";
            BlitzData.list = [];
            BlitzData.hidden = "false";
            // Start
            BlitzData.list.push({
                type: "ha.be.Be.Start",
                perintah: "Graphics",
                message0: "🛩️ Start %1 width: %2 height: %3 %4",
                inputsInline: true,
                args: {
                    dummy: '',
                    width: 320,
                    height: 240,
                    statement: ""
                },
                stmt: false,
                tooltip: `
            Start Application.
            Use this block as the first block in your app.


            Parameters:
            width: prefered canvas width
            height: prefered canvas height
        `
            });
            // Update
            BlitzData.list.push({
                type: "ha.be.Be.Update",
                perintah: "function #update",
                message0: "⏱️ update %1 %2 %3",
                inputsInline: false,
                args: {
                    dummy: "",
                    input_end_row: "",
                    statement: ""
                },
                stmt: true,
                hat: true,
                tooltip: `
            Update Application.
            Will be called up to 60x per second.
            Put all block to update app here
        `
            });
            // list.push(
            //     {
            //         "type": "block_type",
            //         "message0": "test %1 %2",
            //         "perintah": "test",
            //         "args0": [
            //             {
            //                 "type": EArgType.input_end_row
            //             },
            //             {
            //                 "type": EArgType.statementValue,
            //                 "name": "NAME"
            //             }
            //         ],
            //         "colour": 230,
            //         "tooltip": "",
            //         "helpUrl": ""
            //     })
            // ha.be.Be.Bersih
            BlitzData.list.push({
                type: "ha.be.Be.Bersih",
                perintah: "Cls",
                message0: 'Cls',
                tooltip: "Clear the screen"
            });
            // Color
            //ha.be.Be.Warna;
            BlitzData.list.push({
                type: "ha.be.Be.Warna",
                perintah: "Color",
                message0: 'Set Fill Color to red %1 green %2 blue %3 alpha %4',
                inputsInline: true,
                args: {
                    red: 0,
                    green: 0,
                    blue: 0,
                    alpha: 100
                },
                tooltip: `
            Set default fill color for font, drawing, etc.
            red, green, blue are from 0-255
        `
            });
            // const Stroke = ha.be.Be.StrokeColor;    
            BlitzData.list.push({
                type: " ha.be.Be.StrokeColor",
                perintah: "Stroke",
                message0: 'Set Stroke Color to red %1 green %2 blue %3 alpha %4',
                inputsInline: true,
                args: {
                    red: 0,
                    green: 0,
                    blue: 0,
                    alpha: 100
                },
                tooltip: `
            Set default stroke color for font, drawing, etc
        `
            });
            // const Line = ha.be.Be.Garis;
            BlitzData.list.push({
                type: "ha.be.Be.Garis",
                perintah: "Line",
                message0: 'Draw Line x1 %1 y1 %2 x2 %3 y2 %4',
                inputsInline: true,
                args: {
                    x1: 0,
                    y1: 0,
                    x2: 100,
                    y2: 100
                },
                tooltip: `
            Draw Line
        `
            });
            // const Rect = ha.be.Be.Kotak;
            // Rect
            BlitzData.list.push({
                type: "ha.be.Be.Kotak",
                perintah: "Rect",
                message0: 'Draw Rect x1 %1 y1 %2 x2 %3 y2 %4',
                inputsInline: true,
                args: {
                    x1: 0,
                    y1: 0,
                    x2: 100,
                    y2: 100
                },
                tooltip: `
            Draw Rectangle
        `
            });
            // const Rect = ha.be.Be.Kotak_opt;
            // Rect
            BlitzData.list.push({
                type: "ha.be.Be.Kotak_opt",
                perintah: "Rect",
                message0: 'Draw Rect x1 %1 y1 %2 x2 %3 y2 %4 fill %5 stroke %6',
                inputsInline: true,
                args: {
                    x1: 0,
                    y1: 0,
                    x2: 100,
                    y2: 100,
                    fill: true,
                    stroke: true,
                },
                tooltip: `
            Draw Rectangle with additional parameters
        `
            });
            // const Oval = ha.be.Be.Oval;
            BlitzData.list.push({
                type: "ha.be.Be.Oval",
                perintah: "Oval",
                message0: 'Draw Oval %1 x %2 y %3 radius %4 scaleX %5 scaleY %6 rotation %7',
                args: {
                    dummy: '',
                    x1: 0,
                    y1: 0,
                    radius: 100,
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 0,
                },
                tooltip: `
            Draw Oval 
        `
            });
            // const GetPixel = ha.be.Img.AmbilPiksel;
            BlitzData.list.push({
                type: "ha.be.Img.AmbilPiksel",
                perintah: "GetPixel",
                message0: 'Get Pixel at x %1 y %2',
                inputsInline: true,
                args: {
                    x: 0,
                    y: 0,
                },
                tooltip: `
            Get Pixel Color at x, y position.
            You can get the red, green, and blue result by calling the Red, Green, Blue command respectively.
            If you load images from external domain, then this function will failed.
            This is normal because of CORS Policy. 
        `
            });
            // const Red = ha.be.Be.Merah;
            BlitzData.list.push({
                type: "ha.be.Be.Merah",
                perintah: "Red",
                message0: 'Red',
                tooltip: `
            Return the red color from the GetPixel command
        `,
                output: EOutput.Number
            });
            // const Green = ha.be.Be.Hijau;
            BlitzData.list.push({
                type: "ha.be.Be.Hijau",
                perintah: "Green",
                message0: 'Green',
                tooltip: `
            Return the Green color from the GetPixel command
        `,
                output: EOutput.Number
            });
            // const Blue = ha.be.Be.Biru;
            BlitzData.list.push({
                type: "ha.be.Be.Biru",
                perintah: "Blue",
                message0: 'Blue',
                tooltip: `
            Return the blue blue from the GetPixel command
        `,
                output: EOutput.Number
            });
            // const Alpha = ha.be.Be.Transparan;    
            BlitzData.list.push({
                type: "ha.be.Be.Transparan",
                perintah: "Alpha",
                message0: 'Alpha',
                tooltip: `
            Return the transparent color from the GetPixel command
        `,
                output: EOutput.Number
            });
        })(BlitzData = blockly.BlitzData || (blockly.BlitzData = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var hiddenData;
        (function (hiddenData) {
            hiddenData.list = [];
            hiddenData.group = "hidden";
            hiddenData.hidden = "true";
            // ha.be.Be.Grafis
            // depecrated
            hiddenData.Grafis = {
                type: "ha.be.Be.Grafis",
                perintah: "Graphics",
                message0: "Graphics %1 width: %2 height: %3",
                inputsInline: true,
                args: {
                    dummy: '',
                    width: 320,
                    height: 240
                },
                hidden: 'hidden',
                tooltip: `
            Initialize graphics.
            Use this block as the first block in your appp.
            width: prefered canvas width
            height: prefered canvas height
        `
            };
            hiddenData.list.push(hiddenData.Grafis);
        })(hiddenData = blockly.hiddenData || (blockly.hiddenData = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var ImageBlockData;
        (function (ImageBlockData) {
            ImageBlockData.group = "Image 1";
            ImageBlockData.list = [];
            ImageBlockData.hidden = "false";
            // ha.be.Spr.Muat
            ImageBlockData.blitz_Muat = {
                type: "ha.be.Spr.Muat",
                message0: 'LoadImage %1 url: %2',
                perintah: "LoadImage",
                args: {
                    dummy: '',
                    url: "./imgs/box.png"
                },
                inputsInline: true,
                output: EOutput.Any,
                tooltip: `
            Load an Image from url.
            Url can be local or absolute.
        `
            };
            ImageBlockData.list.push(ImageBlockData.blitz_Muat);
            // LoadAnimImage
            // ha.be.Spr.MuatAnimasi
            ImageBlockData.list.push({
                type: "ha.be.Spr.MuatAnimasi",
                message0: "LoadAnimImage %1 url: %2 frame width: %3 frame height: %4",
                perintah: "LoadAnimImage",
                args: {
                    dummy: '',
                    url: "./imgs/exp2_0.png",
                    fw: 32,
                    fh: 32
                },
                inputsInline: true,
                output: EOutput.Any,
                tooltip: `
        Load image that contains multiple frames (spritesheet)
           
        Params:
        url: the url of image, can be local or absolute
        fw: frame wdith
        fh: frame height 
        `
            });
            // DrawImage
            // ha.be.Spr.GambarXY
            // DrawImageXY
            ImageBlockData.list.push({
                type: "ha.be.Spr.Gambar",
                message0: "DrawImage: %4 image %1 x: %2 y: %3",
                perintah: "DrawImageXY",
                inputsInline: true,
                args: {
                    sprite: {},
                    x: 0,
                    y: 0,
                    dummy: ""
                },
                tooltip: `
            Draw image at x, y location.
            When the image is not yet fully loaded, then it will not draw anything.
        `
            });
            // TileImage
            //ha.be.Spr.Ubin;
            ImageBlockData.list.push({
                type: "ha.be.Spr.Ubin",
                message0: "TileImage: %5 image %1 x: %2 y: %3 frame: %4",
                perintah: "Tile",
                inputsInline: true,
                args: {
                    sprite: {},
                    x: 0,
                    y: 0,
                    frame: 0,
                    dummy: ''
                },
                tooltip: `
            Draw image with tiling effect
            When the image is not yet fully loaded, then it will not draw anything.
        `
            });
            // HandleImage
            // ha.be.Spr.Handle
            ImageBlockData.list.push({
                type: "ha.be.Spr.Handle",
                message0: "HandleImage: %1 image %2 x: %3 y: %4",
                perintah: "Handle",
                inputsInline: true,
                args: {
                    dummy: '',
                    sprite: {},
                    x: 0,
                    y: 0,
                },
                tooltip: `
            Set the position of image handle, 
            useful for rotation when you want to rotate at specific position 
            rather than from top-left position
        `
            });
            // ResizeImage
            // ha.be.Spr.Ukuran;
            ImageBlockData.list.push({
                type: "ha.be.Spr.Ukuran",
                perintah: "ResizeImage",
                message0: "ResizeImage: %1 image %2 width: %3 height: %4",
                inputsInline: true,
                args: {
                    dummy: '',
                    sprite: {},
                    width: 0,
                    height: 0,
                },
                tooltip: `Resize an Image`
            });
            // RotateImage 
            // ha.be.Spr.Rotasi;
            ImageBlockData.list.push({
                type: "ha.be.Spr.Rotasi",
                perintah: "Rotation",
                message0: "RotateImage: %1 image %2 value (0-360): %3",
                inputsInline: true,
                args: {
                    dummy: '',
                    sprite: {},
                    angle: 0
                },
                tooltip: `Rotate an image`
            });
            // ImageAlpha
            // ha.be.Spr.Alpha
            ImageBlockData.list.push({
                type: "ha.be.Spr.Alpha",
                perintah: "ImageAlpha",
                message0: "ImageAlpha: %1 image %2 value (0-100): %3",
                inputsInline: true,
                args: {
                    dummy: '',
                    image: {},
                    alpha: 50
                },
                tooltip: `Set image alpha/transparency`
            });
            // CopyImage
            //TODO
            /**
             * INFO
             * ====
             */
            // ImageWidth
            // ha.be.Spr.Panjang;
            // Width
            ImageBlockData.list.push({
                type: "ha.be.Spr.Panjang",
                perintah: "Width",
                message0: "Image %2 get width %1",
                inputsInline: true,
                args: {
                    dummy: '',
                    sprite: {},
                },
                output: EOutput.Number,
                tooltip: `Return image width
        Will return zero when image is still loading
        `
            });
            // ImageHeight
            // ha.be.Spr.Lebar;
            // Height
            ImageBlockData.list.push({
                type: "ha.be.Spr.Lebar",
                perintah: "Height",
                message0: "%1 Image %2 get height",
                args: {
                    dummy: '',
                    sprite: {},
                },
                inputsInline: true,
                output: EOutput.Number,
                tooltip: `Return image get height
        Will return zero when image is still loading
        `
            });
            // ImageXHandle
            // ha.be.Spr.HandleX
            ImageBlockData.list.push({
                type: "ha.be.Spr.HandleX",
                perintah: "ha.be.Spr.HandleX",
                message0: "Image %2 get handle X position %1",
                args: {
                    dummy: '',
                    sprite: {},
                },
                tooltip: "Return the image handle X position",
                output: EOutput.Number,
                inputsInline: true
            });
            // ImageYHandle
            // ha.be.Spr.HandleY
            ImageBlockData.list.push({
                type: "ha.be.Spr.HandleY",
                perintah: "ha.be.Spr.HandleY",
                message0: "image %2 get handle Y position %1",
                args: {
                    dummy: '',
                    sprite: {},
                },
                tooltip: "return the image-handle Y position",
                output: EOutput.Number,
                inputsInline: true
            });
            // ImagesCollideXY
            // ha.be.Spr.TabrakanXY;
            ImageBlockData.list.push({
                type: "ha.be.Spr.TabrakanXY",
                message0: "ImagesCollide: %1 image1: %2 x1: %3 y1: %4 image2: %5 x2: %6 y2: %7",
                perintah: "ha.be.Spr.TabrakanXY",
                args: {
                    dummy: '',
                    sprite: {},
                    x1: 0,
                    y1: 0,
                    sprite2: {},
                    x2: 0,
                    y2: 0
                },
                inputsInline: true,
                tooltip: "return true if two images are collided at the position",
                output: EOutput.Boolean,
            });
        })(ImageBlockData = blockly.ImageBlockData || (blockly.ImageBlockData = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
//next
// const Loaded = ha.be.Spr.Dimuat;
// const StatusMuat = ha.be.Spr.StatusMuat;
// const Posisi = ha.be.Spr.Posisi;
// const PosisiPolar = ha.be.Spr.posisiPolar;
// const GambarSemua = ha.be.Spr.GambarSemua;
// const PosisiX = ha.be.Spr.PosisiX;
// const PosisiY = ha.be.Spr.PosisiY;
// const Alpha = ha.be.Spr.Alpha;
// const StatusDrag = ha.be.Spr.StatusDrag;
// const Copy = ha.be.Spr.Copy;
// const Bound = ha.be.Spr.Bound;
//next 2
// const SpriteKontek = ha.be.Spr.kontek;
//not supported
// CreateImage
// FreeImage
// SaveImage
// GrabImage
// ImageBuffer
// DrawImageRect
// DrawBlockRect
// DrawBlock
// TileBlock
// MaskImage
// MidHandle => todo
// AutoMidHandle => todo
// ScaleImage
// TFormImage
// TFormFilter
// ImagesOverlap
// RectsOverlap
// ImageRectOverlap
// ImageRectCollide
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var ImageBlockData2;
        (function (ImageBlockData2) {
            ImageBlockData2.group = "Image 2";
            ImageBlockData2.list = [];
            ImageBlockData2.hidden = "false";
            // DrawImage
            ImageBlockData2.list.push({
                type: "ha.be.Spr.Gambar_no_frame",
                perintah: "DrawImage",
                message0: "Draw Image %1",
                inputsInline: true,
                args: {
                    sprite: {},
                },
                tooltip: "Draw image to screen"
            });
            // DrawImageAnim
            // DrawImage
            // ha.be.Spr.Gambar animasi
            ImageBlockData2.list.push({
                type: "ha.be.Spr.Gambar_animasi",
                message0: "DrawImage %1 image %2 frame: %3",
                perintah: "DrawImage",
                inputsInline: true,
                args: {
                    dummy: '',
                    sprite: {},
                    frame: 0,
                },
                tooltip: `
            Draw image at specific frame.
        `
            });
            // const DrawAllImage = ha.be.Spr.GambarSemua;
            ImageBlockData2.list.push({
                type: "ha.be.Spr.GambarSemua",
                perintah: "DrawAllImage",
                message0: "DrawAllImage",
                tooltip: 'Draw All Images, ordered by created time'
            });
            // ha.be.Spr.DragMode();
            ImageBlockData2.list.push({
                type: "ha.be.Spr.DragMode",
                perintah: "ha.be.Spr.DragMode",
                message0: "Image %1 set drag mode to %2",
                inputsInline: true,
                args: {
                    sprite: {},
                    dragMode: 1
                },
                tooltip: `
            Make an image dragable.

            There are two drag-mode available:
            - 0: no interaction, default
            - 1: move
            - 2: rotate
            - 3: move on any drag, even if you don't actually touch the image 
            - 4: rotate on any drag, even if you don't actually touch the image
        `
            });
            // const PositionImageXY = ha.be.Spr.Posisi;
            // PositionImageXY
            ImageBlockData2.list.push({
                type: "ha.be.Spr.Posisi",
                perintah: "PositionImageXY",
                message0: "Image %1 set position to x %2 y %3",
                inputsInline: true,
                args: {
                    sprite: {},
                    x: 0,
                    y: 0
                },
                tooltip: `Position image at x, y`
            });
            // const PositionImagePolar = ha.be.Spr.posisiPolar;
            // PositionImagePolar
            ImageBlockData2.list.push({
                type: "ha.be.Spr.posisiPolar_no_scale",
                perintah: "PositionImagePolar",
                message0: "Image %1 set position relative to x %4 y %5 by angle %2 at dist %3",
                inputsInline: true,
                args: {
                    sprite: {},
                    angle: 0,
                    dist: 100,
                    x: 0,
                    y: 0,
                },
                tooltip: `Position image relative to a certain position
        Can be used to create orbitng motion
        `
            });
            // const PositionImagePolar = ha.be.Spr.posisiPolar;
            // PositionImagePolar
            ImageBlockData2.list.push({
                type: "ha.be.Spr.posisiPolar",
                perintah: "PositionImagePolar",
                message0: "Image %1 set position relative to x %4 y %5 by angle %2 at dist %3 scale x %6 scale y %7",
                inputsInline: true,
                args: {
                    sprite: {},
                    angle: 0,
                    dist: 100,
                    x: 0,
                    y: 0,
                    scaleX: 1,
                    scaleY: 1
                },
                tooltip: 'Position image relative to certain position, scale is used to create an elipse movement'
            });
            // const PositionImagePolar = ha.be.Spr.posisiPolar;
            // PositionImagePolar
            ImageBlockData2.list.push({
                type: "ha.be.Spr.posisiPolar_tilt",
                perintah: "PositionImagePolar",
                message0: "Image %1 set position relative to x %4 y %5 by angle %2 at dist %3 scale x %6 scale y %7 tilt %8",
                inputsInline: true,
                args: {
                    sprite: {},
                    angle: 0,
                    dist: 100,
                    x: 0,
                    y: 0,
                    scaleX: 1,
                    scaleY: 1,
                    tilt: 0
                },
                tooltip: `
        Position image relative to certain position, 
        scale is used to create an elipse movement, 
        tilt is used to create a rotated elipse effect`
            });
            // const ImageAlpha = ha.be.Spr.Alpha;
            // ImageAlpha
            ImageBlockData2.list.push({
                type: "ha.be.Spr.Alpha",
                perintah: "ImageAlpha",
                message0: "Image %1 set alpha to (0-100) %2",
                args: {
                    sprite: {},
                    alpha: 100
                },
                inputsInline: true,
                tooltip: 'Set image alpha '
            });
            // const ImageLoaded = ha.be.Spr.Dimuat;
            // ImageLoaded
            ImageBlockData2.list.push({
                type: "ha.be.Spr.Dimuat",
                perintah: "ImageLoaded",
                message0: "Image %1 loaded",
                inputsInline: true,
                args: {
                    sprite: {},
                },
                tooltip: `Return true is image is already loaded`,
                output: EOutput.Boolean
            });
            // const AllImageLoaded = ha.be.Spr.StatusMuat;
            ImageBlockData2.list.push({
                type: "ha.be.Spr.StatusMuat",
                perintah: "AllImageLoaded",
                message0: "All Images Loaded",
                output: EOutput.Boolean,
                tooltip: 'Return true if All Images have been loaded'
            });
            // const ImageXPosition = ha.be.Spr.PosisiX;
            // ImageXPosition
            ImageBlockData2.list.push({
                type: "ha.be.Spr.PosisiX",
                perintah: "ImageXPosition",
                message0: "Image %1 get X position",
                args: {
                    sprite: {},
                },
                inputsInline: true,
                output: EOutput.Number,
                tooltip: 'Return Image x position'
            });
            // const ImageYPosition = ha.be.Spr.PosisiY;
            // ImageYPosition
            ImageBlockData2.list.push({
                type: "ha.be.Spr.PosisiY",
                perintah: "ImageYPosition",
                message0: "Image %1 get Y position",
                args: {
                    sprite: {},
                },
                inputsInline: true,
                output: EOutput.Number,
                tooltip: 'Return Image y position'
            });
            //rotation get
            // Rotation
            // ha.be.Spr.Rotasi
            ImageBlockData2.list.push({
                type: "ha.be.Spr.Rotasi_get",
                perintah: "Rotation",
                message0: "Image %1 get rotation",
                args: {
                    sprite: {},
                },
                inputsInline: true,
                output: EOutput.Number,
                tooltip: 'Set image rotation'
            });
            // const ImageIsDragged = ha.be.Spr.StatusDrag;
            ImageBlockData2.list.push({
                type: "ha.be.Spr.StatusDrag",
                perintah: "ImageIsDragged",
                message0: "Image %1 is dragged",
                args: {
                    sprite: {},
                },
                inputsInline: true,
                output: EOutput.Boolean,
                tooltip: 'return true if image is dragged'
            });
            // ha.be.Spr.Tabrakan
            //Collide
            ImageBlockData2.list.push({
                type: "ha.be.Spr.Tabrakan",
                perintah: "Collide",
                message0: "check Image %1 is collided with Image %2",
                args: {
                    sprite1: {},
                    sprite2: {},
                },
                output: EOutput.Boolean,
                inputsInline: true,
                tooltip: 'return true if two images is collided'
            });
        })(ImageBlockData2 = blockly.ImageBlockData2 || (blockly.ImageBlockData2 = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
//next
// const CopyImage = ha.be.Spr.Copy;
// const ImageBound = ha.be.Spr.Bound;
//next 2
// const SpriteKontek = ha.be.Spr.kontek;
