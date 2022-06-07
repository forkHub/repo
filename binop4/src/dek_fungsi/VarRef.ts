namespace fung.dek.editor.variable.ref.item {
    var aktifView: View;

    const menu: ha.comp.MenuPopup = new ha.comp.MenuPopup();
    menu.buatTombol({
        label: 'update ref',
        f: () => {
            daftar.tampil(aktifView);
        }
    })

    export class View extends ha.comp.BaseComponent {
        private _item: IRef;
        public get item(): IRef {
            return this._item;
        }

        constructor(item: IRef) {
            super();
            this._template = `
                <div class='value-comp border row'>
                    <div class='value padding tengah-tengah'></div>
                    <div class='padding'>
                        <button class='menu'>|||</button>
                    </div>
                </div>
            `;

            this.build();
            this._item = item;

            this.menuTbl.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                aktifView = this;
            }
        }

        override destroy(): void {
            super.destroy();
            this._item = null;
        }

        get valueDiv(): HTMLDivElement {
            return this.getEl('div.value') as HTMLDivElement;
        }

        get menuTbl(): HTMLButtonElement {
            return this.getEl('button.menu') as HTMLButtonElement;
        }
    }

}