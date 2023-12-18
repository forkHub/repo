namespace ha.blockly {
    export class HalListProject {
        private static cont: HTMLDialogElement;
        private static listCont: HTMLDivElement;
        // private static selectedId: string = '';
        private static demoList: HalDemoList;
        private static projekList: HalProjekList;
        private static isDemo: boolean = false;

        static DemoButtonKlik() {
            this.isDemo = true;
            this.render();
            this.updateTombol();
        }

        static ProjectButtonKlik() {
            this.isDemo = false;
            this.render();
            this.updateTombol();
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
            let project
            let code;

            if (this.isDemo) {
                f = Store.demo.find((item) => {
                    return (item as IEntity).parentId == Store.selectedId;
                });
                console.log(f);

                code = JSON.parse(f.wspace);
                project = Store.demo.find((item) => {
                    return (item as IEntity).id == Store.selectedId;
                });
            }
            else {
                f = Entity.getByParentId(Store.selectedId) as IFile;
                code = JSON.parse(f.wspace);
                project = Entity.getById(Store.selectedId) as IProject;
            }

            Store.idFile = f.id;
            Store.projectId = project.id;

            Blockly.serialization.workspaces.load(code, Index.workspace);
            this.closeKlik();
            Index.updateName();
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

            if (this.isDemo) {
                Dialog.show("The project is read only");
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
            this.closeKlik();
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

            if (this.isDemo) {
                Dialog.show("the project is read only")
                return;
            }

            let w = window.prompt("renae", (Entity.getById(Store.selectedId) as IProject).nama)
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
            this.isDemo = false;
            (this.cont as any).showModal();
            this.render()
        }

        private static updateTombol() {
            let cont = this.cont.querySelector('.button-cont');
            cont.querySelectorAll('button').forEach((item) => {
                item.classList.remove('outline');
            })

            if (this.isDemo) {
                cont.querySelector('button.demo').classList.add('outline');
            }
            else {
                cont.querySelector('button.project').classList.add('outline');
            }
        }

        static init() {
            this.cont = document.createElement('dialog');
            this.cont.classList.add('project-list');
            this.cont.innerHTML = `
                <div style="display:flex; flex-direction:column; height:100%">
                    <h4>Project List:</h4>
                    <div class='button-cont'> 
                        <button class="project outline" onclick="ha.blockly.HalListProject.ProjectButtonKlik()">My Project</button>
                        <button class="demo" onclick="ha.blockly.HalListProject.DemoButtonKlik()">Demo</button>
                    </div>
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

            this.demoList = new HalDemoList();
            this.projekList = new HalProjekList();
        }

        static updateItemView(el: HTMLDivElement, item: IProject): void {
            el.innerHTML = '';
            this.projekList.buatItemViewIsi(item, el);
        }

        private static render() {
            Store.selectedId = '';
            this.listCont.innerHTML = '';

            if (this.isDemo) {
                this.demoList.render(this.listCont);
            }
            else {
                this.projekList.render(this.listCont);
            }
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

    class HalDemoList {

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
            let list: IProject[] = (Store.demo as IProject[]).filter((item) => {
                return item.type == "project";
            });

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
}

// ha.blockly.HalListProject.DemoButtonKlik;
// ha.blockly.HalListProject.ProjectButtonKlik;