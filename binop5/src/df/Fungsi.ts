namespace df {
    export class HalDeklarasiFungsi extends ha.comp.BaseComponent {
        private _item: IDekFungsi;
        private menu: ha.comp.MenuPopup = new ha.comp.MenuPopup();

        public set item(value: IDekFungsi) {
            this._item = value;
        }

        constructor() {
            super();
            this._elHtml = this.getTemplate("div.hal-fungsi-dek");

            this.menuTbl.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                this.menu.view.attach(document.body);
            }

            this.setupMenu();
        }

        tampil(): void {
            data.variableAr.forEach((item: IVar) => {
                if (item.indukId == this._item.id) {
                    let itemView: ItemVar;

                    itemView = new ItemVar(item);
                    itemView.attach(this.daftarVar);
                }
            })
        }

        setupMenu(): void {
            this.menu.buatTombol({
                label: 'var',
                f: () => {
                    let nama: string;

                    nama = window.prompt('Nama variable: ');

                    if (nama) {
                        let varObj: IVar = data.halModul.buatVarObj(nama, this._item.id);
                        let view: ItemVar;

                        view = new ItemVar(varObj);
                        view.attach(this.daftarVar);
                        data.variableAr.push(varObj);
                    }
                }
            });

            this.menu.buatTombol({
                label: 'param',
                f: () => {
                    //TODO: tambah param
                }
            })

            this.menu.buatTombol({
                label: 'stmt',
                f: () => {
                    //TODO: stmt
                }
            })
        }

        get daftarVar(): HTMLDivElement {
            return this.getEl('div.daftar-var') as HTMLDivElement;
        }

        get menuTbl(): HTMLButtonElement {
            return this.getEl('div.menu button') as HTMLButtonElement;
        }
    }



    // export const halDeklarasiFungsi: HalDeklarasiFungsi = new HalDeklarasiFungsi();
}