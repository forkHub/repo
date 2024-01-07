declare var demoData: IEntity[];

namespace ha.blockly {
    export class HalListProject {
        private static cont: HTMLDialogElement;
        private static listCont: HTMLDivElement;
        private static projekList: HalProjekList;

        static openKlik() {
            if (Store.selectedId == '') {
                //no selected
                console.log('no selected');
                Dialog.show("no item selected");
                return;
            }

            if (Store.projectId == Store.selectedId) {
                //already opened
                console.log('already open');
                Dialog.show("You are currently editing this project");

                return;
            }

            let f: IFile;
            let project
            let code;

            if (Store.tutMode) {
                try {

                    fetch(
                        `./tut/p${Store.selectedId}.json`,
                        {
                            // headers: { 'Content-Type': 'application/json' }, // Added in response to comment
                            method: 'GET',
                        }
                    ).then(function (response) {
                        console.log(response);
                        console.log(response.text().then((e) => {
                            console.log("load projek response text")
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

                            Store.idFile = "";
                            Store.projectId = Store.selectedId;

                            Blockly.serialization.workspaces.load(obj, Index.workspace);
                            HalListProject.closeKlik();
                            Index.updateName();

                        }));
                    }).catch((e) => {
                        console.error(e);
                    })
                }
                catch (e) {
                    console.error(e);
                }
            }
            else {
                f = Entity.getByParentId(Store.selectedId) as IFile;
                code = JSON.parse(f.wspace);
                project = Entity.getById(Store.selectedId) as IProject;
                // }

                Store.idFile = f.id;
                Store.projectId = project.id;

                Blockly.serialization.workspaces.load(code, Index.workspace);
                this.closeKlik();
                Index.updateName();
            }
        }

        static deleteKlik() {
            console.group('delete klik')

            if (Store.selectedId == '') {
                //TODO: dialog
                console.log('no item selected');
                console.groupEnd();
                Dialog.show("no item selected");
                return;
            }

            if (Store.selectedId == Store.projectId) {
                //already opened
                console.log("already opened");
                console.groupEnd();
                Dialog.show("You are currently editing this project");
                return;
            }

            let confirm = window.confirm("are you sure you ?");

            if (confirm) {
                console.log('delete by id ' + Store.selectedId);
                Entity.delete(Store.selectedId);
                Entity.commit();

                //delete file
                console.log("delete file");
                Entity.delete(Entity.getByParentId(Store.selectedId).id);

                console.log("get view to delete");
                this.listCont.querySelectorAll('.project').forEach((item) => {
                    if (item.getAttribute('data-id') == Store.selectedId) {
                        item.parentElement.removeChild(item);
                        console.log("ok");
                    }
                })


                Store.selectedId = '';
            }
            else {
                console.log('cancel');
            }

            console.groupEnd();
        }

        static closeKlik() {
            (this.cont as HTMLDialogElement as any).close();
            Store.selectedId = '';
            // this.project = null;
        }

        static renameKlik() {
            if (Store.selectedId == '') {
                Dialog.show("no item selected");
                return;
            }

            // if (this.isDemo) {
            //     Dialog.show("the project is read only")
            //     return;
            // }

            let w = window.prompt("renae", (Entity.getById(Store.selectedId) as IProject).nama);
            //todo: validate 

            if (w) {

                (Entity.getById(Store.selectedId) as IProject).nama = w;
                Entity.commit();
                this.updateItemView(
                    this.listCont.querySelector(`div[data-id='${Store.selectedId}']`), Entity.getById(Store.selectedId) as IProject)
            }
            else {
                Dialog.show("invalid name");
            }
        }

        static show() {
            // this.isDemo = false;
            (this.cont as any).showModal();
            this.render()
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
            this.projekList = new HalProjekList();
        }

        static updateItemView(el: HTMLDivElement, item: IProject): void {
            el.innerHTML = '';
            this.projekList.buatItemViewIsi(item, el);
        }

        private static render() {
            Store.selectedId = '';
            this.listCont.innerHTML = '';

            this.projekList.render(this.listCont);
        }
    }

    class HalProjekList {
        buatItemViewIsi(item: IProject, cont: HTMLDivElement): void {
            cont.innerHTML = `
                <span>${item.nama}</span>
            `;
        }

        //TODO: buat shared method
        private buatItemView(item: IProject, cont: HTMLDivElement): HTMLDivElement {
            let hasil: HTMLDivElement;

            hasil = document.createElement('div') as HTMLDivElement;
            hasil.classList.add('project');

            hasil.setAttribute('data-id', item.id);
            hasil.onclick = () => {
                Store.selectedId = item.id;

                cont.querySelectorAll(".project").forEach((item2) => {
                    item2.classList.remove('selected')
                });

                hasil.classList.add('selected');
            }

            this.buatItemViewIsi(item, hasil);

            return hasil;
        }

        render(cont: HTMLDivElement) {
            let list: IProject[] = Entity.getByType(EEntity.PROJECT) as IProject[];
            list = list.sort((item, item2) => {
                if (item.nama < item2.nama) return -1;
                if (item.nama > item2.nama) return 1;
                return 0;
            })

            list.forEach((item) => {
                cont.appendChild(this.buatItemView(item, cont));
            })
        }
    }

    //TODO: depecrated
    class ListDemoView {

        buatItemViewIsi(item: IProject, cont: HTMLDivElement): void {
            cont.innerHTML = `
                <span>${item.nama}</span>
            `;
        }

        private buatItemView(item: IProject, cont: HTMLDivElement): HTMLDivElement {
            let hasil: HTMLDivElement;

            hasil = document.createElement('div') as HTMLDivElement;
            hasil.classList.add('project');

            hasil.setAttribute('data-id', item.id);
            hasil.onclick = () => {
                Store.selectedId = item.id;

                cont.querySelectorAll(".project").forEach((item2) => {
                    item2.classList.remove('selected')
                });

                hasil.classList.add('selected');
            }

            this.buatItemViewIsi(item, hasil);

            return hasil;
        }

        render(cont: HTMLDivElement): void {
            let list: IProject[] = (demoData as IProject[]).filter((item) => {
                return item.type == "project";
            });

            list = list.sort((item, item2) => {
                if (item.nama < item2.nama) return -1;
                if (item.nama > item2.nama) return 1;
                return 0;
            })

            list.forEach((item) => {
                //temporary 
                cont.appendChild(this.buatItemView(item, cont));
            })
        }
    }

    export class HalListDemo {
        private static cont: HTMLDialogElement;
        private static listCont: HTMLDivElement;
        private static demoList: ListDemoView;

        static DemoButtonKlik() {
            this.render();
        }

        static openKlik() {
            if (Store.selectedId == '') {
                //no selected
                console.log('no selected');
                Dialog.show("no item selected");
                return;
            }

            if (Store.projectId == Store.selectedId) {
                //already opened
                console.log('already open');
                Dialog.show("You are currently editing this project");

                return;
            }

            let f: IFile;
            // let project
            let code;

            f = Store.demo.find((item) => {
                return (item as IEntity).parentId == Store.selectedId;
            });
            console.log(f);

            code = JSON.parse(f.wspace);
            // project = Store.demo.find((item) => {
            //     return (item as IEntity).id == Store.selectedId;
            // });


            Store.idFile = f.id;
            Store.projectId = '';

            Blockly.serialization.workspaces.load(code, Index.workspace);
            this.closeKlik();
            Index.updateName();
        }

        static closeKlik() {
            (this.cont as HTMLDialogElement as any).close();
            Store.selectedId = '';
            // this.project = null;
        }

        static show() {
            (this.cont as any).showModal();
            this.render()
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

            this.demoList = new ListDemoView();
        }

        private static render() {
            Store.selectedId = '';
            this.listCont.innerHTML = '';

            this.demoList.render(this.listCont);
        }

    }
}

