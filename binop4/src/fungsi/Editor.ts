namespace fungsi {

    class View extends ha.comp.BaseComponent {
        constructor() {
            super();
            this._template = `
                <div class='fung-dek-edit padding back-putih min-height-100 display-flex flex-dir-col'>
                    <div class='flex-grow-1'>
                        <div class='path padding'></div>
                        <div class='nama-cont padding'></div>
                        <div class='param-cont padding'></div>
                        <div class='stmt-cont padding'></div>
                    </div>
                    <div class='menu'>
                        <button class='menu'>|||</button>
                    </div>
                </div>
            `;
            this.build();
        }

        get pathCont(): HTMLDivElement {
            return this.getEl('div.path') as HTMLDivElement;
        }

        get namaCont(): HTMLDivElement {
            return this.getEl('div.nama-cont') as HTMLDivElement;
        }

        get paramCont(): HTMLDivElement {
            return this.getEl('div.param-cont') as HTMLDivElement;
        }

        get stmtCont(): HTMLDivElement {
            return this.getEl('div.stmt-cont') as HTMLDivElement;
        }
    }
    const view: View = new View();

    function renderPath(): void {
        ha.comp.Util.bersihDiv(view.pathCont);
        let btn: HTMLButtonElement = document.createElement('button');
        btn.textContent = "<<<"
        view.pathCont.appendChild(btn);

        btn.onclick = () => {
            view.detach();
            md.editor.view.attach(document.body);
        }
    }

    export function exec(): void {
        view.attach(document.body);
        renderPath();
        nama.view.attach(view.namaCont);
        let fungDekObj: IFungDek = fung.dek.ent.diedit();
        nama.view.nama.innerHTML = fungDekObj.nama;

        param.view.attach(view.paramCont);
        param.render();

        stmt.view.attach(view.stmtCont);
        stmt.render();
    }

}

namespace fungsi.nama {

    const menu: ha.comp.MenuPopup = new ha.comp.MenuPopup();
    menu.buatTombol({
        label: 'rename',
        f: () => {
            let fungDekObj: IFungDek = fung.dek.ent.diedit();
            let namaBaru: string = window.prompt('nama: ' + fungDekObj.nama);

            if (namaBaru && fung.dek.ent.validasiNama(namaBaru)) {
                fungDekObj.nama = namaBaru;
                view.nama.innerHTML = namaBaru;
            }
        }
    });

    class Nama extends ha.comp.BaseComponent {
        constructor() {
            super();
            this._template = `
                <div class='nama border padding'>
                    <div class='padding'>Nama:</div> 
                    <div class='row'>
                        <div class='padding flex-grow-1 border'>
                            <span class='nama'></span>
                        </div>
                        <div class='padding'>
                            <button class='menu'>|||</button>
                        </div>
                    </div>
                </div>
            `;
            this.build();

            this.menu.onclick = (e: MouseEvent) => {
                e.stopPropagation();

                //TODO: popup
                menu.view.attach(document.body);



            }
        }

        get menu(): HTMLButtonElement {
            return this.getEl('button.menu') as HTMLButtonElement;
        }

        get nama(): HTMLSpanElement {
            return this.getEl('span.nama') as HTMLSpanElement;
        }


    }
    export const view: Nama = new Nama();
}

namespace fungsi.param {
    var viewDipilih: Item;

    const menu: ha.comp.MenuPopup = new ha.comp.MenuPopup();
    menu.buatTombol({
        label: 'tambah',
        f: () => {
            let nama: string = window.prompt('nama parameter:', 'param');
            if (nama) {
                let paramObj: IParam = window.param.buat(fung.dek.ent.diedit().id, nama);
                let viewItem: Item = new Item(paramObj);
                viewItem.attach(view.daftar);
            }
        }
    });

    class View extends ha.comp.BaseComponent {
        constructor() {
            super();
            this._template = `
                <div class='param-editor padding border'>
                    <div class='label padding'>Params:</div>
                    <div class='daftar padding border'></div>
                    <div class='padding'>
                        <button class='menu'>|||</button>
                    </div>
                </div>
            `;
            this.build();

            this.menu.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                menu.view.attach(document.body);
            }
        }

        get daftar(): HTMLDivElement {
            return this.getEl('div.daftar') as HTMLDivElement;
        }

        get menu(): HTMLButtonElement {
            return this.getEl('button.menu') as HTMLButtonElement;
        }
    }
    export const view: View = new View();

    const menuItem: ha.comp.MenuPopup = new ha.comp.MenuPopup();
    menuItem.buatTombol({
        label: 'hapus',
        f: () => {
            window.param.hapus(viewDipilih.param.id);
            viewDipilih.destroy();
            system.menu.simplanKlik();
        }
    });
    menuItem.buatTombol({
        label: 'rename',
        f: () => {
            let nama: string = window.prompt('Param Name', viewDipilih.param.nama);
            if (nama) {
                viewDipilih.nama.innerHTML = nama;
                viewDipilih.param.nama = nama;
                system.menu.simplanKlik();
            }
        }
    })
    menuItem.buatTombol({
        label: 'atas',
        f: () => {
            //TODO: 
            console.log('geser atas');
        }
    })
    menuItem.buatTombol({
        label: 'bawah',
        f: () => {
            //TODO: 
            console.log('geser bawah');
        }
    })

    class Item extends ha.comp.BaseComponent {
        private _param: IParam;
        public get param(): IParam {
            return this._param;
        }

        constructor(param: IParam) {
            super();
            this._template = `
                <div class='param-item padding'>
                    <div class='border padding row'>
                        <div class='nama flex-grow-1'>
                        </div>
                        <div class='menu padding'>
                            <button class='menu'>|||</button>
                        </div>
                    </div>
                </div>
            `;
            this.build();
            this._param = param;
            this.nama.innerHTML = this.param.nama;

            this.buttonTbl.onclick = (e: MouseEvent) => {
                e.stopPropagation;
                viewDipilih = this;
                menuItem.view.attach(document.body);
            }
        }

        override destroy(): void {
            super.destroy();
            this._param = null;
        }

        get buttonTbl(): HTMLButtonElement {
            return this.getEl('div.menu button.menu') as HTMLButtonElement;
        }

        get nama(): HTMLDivElement {
            return this.getEl('div.nama') as HTMLDivElement;
        }


    }

    export function render(): void {
        let fungDekObj: IFungDek = window.fung.dek.ent.diedit();

        let paramObj: IParam[] = window.param.byIndukId(fungDekObj.id);
        paramObj.forEach((item: IParam) => {
            let viewItem: Item = new Item(item);
            viewItem.attach(view.daftar);
        })

    }
}