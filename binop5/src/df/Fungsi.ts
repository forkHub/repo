namespace df {
    export class HalDeklarasiFungsi extends ha.comp.BaseComponent {
        private _item: IDekFungsi;
        private menu: ha.comp.MenuPopup = new ha.comp.MenuPopup();

        public get item(): IDekFungsi {
            return this._item;
        }
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
        }

        setupMenu(): void {
            this.menu.buatTombol({
                label: 'var',
                f: () => {
                    //TODO: tambah variable
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

        get menuTbl(): HTMLButtonElement {
            return this.getEl('div.menu button') as HTMLButtonElement;
        }
    }



    // export const halDeklarasiFungsi: HalDeklarasiFungsi = new HalDeklarasiFungsi();
}