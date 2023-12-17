namespace ha.blockly {
    export class HalListProject {
        private static cont: HTMLDialogElement;
        private static listCont: HTMLDivElement;
        private static selectedId: string = '';
        // private static project: IProject;

        static openKlik() {
            if (this.selectedId == '') {
                //no selected
                console.log('no selected');
                Dialog.show("no item selected");
                return;
            }

            if (Store.projectId == this.selectedId) {
                //already opened
                console.log('already open');
                Dialog.show("You are currently editing this project");

                return;
            }

            let f: IFile = Entity.getByParentId(this.selectedId) as IFile;
            let code = JSON.parse(f.wspace);

            let project = Entity.getById(this.selectedId) as IProject;

            Store.idFile = f.id;
            Store.projectId = project.id;

            Blockly.serialization.workspaces.load(code, Index.workspace);
            this.closeKlik();
            Index.updateName();
        }

        static deleteKlik() {
            console.group('delete klik')

            if (this.selectedId == '') {
                //TODO: dialog
                console.log('no item selected');
                console.groupEnd();
                Dialog.show("no item selected");
                return;
            }

            if (this.selectedId == Store.projectId) {
                //already opened
                console.log("already opened");
                console.groupEnd();
                Dialog.show("You are currently editing this project");
                return;
            }

            let confirm = window.confirm("are you sure you ?");

            if (confirm) {
                console.log('delete by id ' + this.selectedId);
                Entity.delete(this.selectedId);
                Entity.commit();

                console.log("get view to delete");
                this.listCont.querySelectorAll('.project').forEach((item) => {
                    if (item.getAttribute('data-id') == this.selectedId) {
                        item.parentElement.removeChild(item);
                        console.log("ok");
                    }
                })


                this.selectedId = '';
            }
            else {
                console.log('cancel');
            }

            console.groupEnd();
            this.closeKlik();
        }

        static closeKlik() {
            (this.cont as HTMLDialogElement as any).close();
            this.selectedId = '';
            // this.project = null;
        }

        static show(p: IProject[]) {
            (this.cont as any).showModal();
            this.render(p)
        }

        static renameKlik() {
            if (this.selectedId == '') {
                Dialog.show("no item selected");
                return;
            }

            let w = window.prompt("renae", (Entity.getById(this.selectedId) as IProject).nama)
            if (w) {
                (Entity.getById(this.selectedId) as IProject).nama = w;
                this.updateItemView(
                    this.listCont.querySelector(`div[data-id='${this.selectedId}']`), Entity.getById(this.selectedId) as IProject)
                Entity.commit();
            }
            else {
                Dialog.show("invalid name");
            }
        }

        static init() {
            this.cont = document.createElement('dialog');
            this.cont.innerHTML = `
                <div style="display:flex; flex-direction:column">
                    <h4>Project List:</h4>
                    <div class='list-cont' style="flex-grow-1">
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
        }

        private static buatItemViewIsi(item: IProject, cont: HTMLDivElement): void {
            cont.innerHTML = `
                <span>${item.nama}</span>
            `;
        }

        static updateItemView(el: HTMLDivElement, item: IProject): void {
            el.innerHTML = '';
            this.buatItemViewIsi(item, el);
        }

        private static buatItemView(item: IProject): HTMLDivElement {
            let hasil: HTMLDivElement;

            hasil = document.createElement('div') as HTMLDivElement;
            hasil.classList.add('project');

            hasil.setAttribute('data-id', item.id);
            hasil.onclick = () => {
                this.selectedId = item.id;

                this.listCont.querySelectorAll(".project").forEach((item2) => {
                    item2.classList.remove('selected')
                });

                hasil.classList.add('selected');
            }

            this.buatItemViewIsi(item, hasil);

            return hasil;
        }

        private static render(list: IProject[]) {
            list = list.sort((item, item2) => {
                if (item.nama < item2.nama) return -1;
                if (item.nama > item2.nama) return 1;
                return 0;
            })
            this.listCont.innerHTML = '';
            this.renderList(list);
        }

        private static renderList(list: IProject[]) {
            list.forEach((item) => {
                this.listCont.appendChild(this.buatItemView(item));
            })
        }
    }
}