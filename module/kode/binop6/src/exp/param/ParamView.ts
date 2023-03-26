///<reference path="../../ha/comp/BaseComponent.ts"/>

class ParamView extends ha.comp.BaseComponent {
    private menu: ha.comp.MenuPopup;
    private _item: IParam;

    constructor(item: IParam) {
        super();
        this._template = `
            <div class='comp item-param disp-flex'>
                <div class='nama flex-grow-1'></div>
                <div class='menu'>
                    <button>|||</button>
                </div>
            </div>
        `;
        this.build();

        this._item = item;
        this.namaDiv.innerText = 'param: ' + item.nama;

        this.menu = new ha.comp.MenuPopup();
        this.menu.buatTombol({
            label: 'rename',
            f: () => {
                let nama: string = window.prompt('Nama param: ', this._item.nama);
                if (nama) {
                    this.gantiNama(nama);
                    dataObj.simpan();
                }
            }
        })

        this.menu.buatTombol({
            label: 'hapus',
            f: () => {

                for (let i: number = 0; i < dataObj.paramAr.length; i++) {
                    if (dataObj.paramAr[i].id == this._item.id) {
                        dataObj.paramAr.splice(i, 1);
                    }
                }
                this.destroy();
                dataObj.simpan();
            }
        })

        this.menuTbl.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            this.menu.view.attach(document.body);
        }
    }

    private gantiNama(nama: string): void {
        this._item.nama = nama;
        this.namaDiv.innerText = 'param: ' + nama;
    }

    destroy(): void {
        super.destroy();
        this._item = null;
    }

    private get namaDiv(): HTMLDivElement {
        return this.getEl('div.nama') as HTMLDivElement;
    }

    private get menuTbl(): HTMLButtonElement {
        return this.getEl('div.menu button') as HTMLButtonElement;
    }
}