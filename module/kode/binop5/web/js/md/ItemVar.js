"use strict";
class ItemVar extends ha.comp.BaseComponent {
    constructor(item) {
        super();
        this._template = `
            <div class='comp var-item disp-flex'>
                <div class='nama flex-grow-1'></div>
                <div class='menu'>
                    <button>|||</button>
                </div>
            </div>
        `;
        this.build();
        this._item = item;
        this.namaDiv.innerText = 'var: ' + item.nama;
        this.menu = new ha.comp.MenuPopup();
        this.menu.buatTombol({
            label: 'rename',
            f: () => {
                let nama = window.prompt('Nama var: ', this._item.nama);
                if (nama) {
                    this.gantiNama(nama);
                    data.simpan();
                }
            }
        });
        this.menu.buatTombol({
            label: 'hapus',
            f: () => {
                for (let i = 0; i < data.variableAr.length; i++) {
                    if (data.variableAr[i].id == this._item.id) {
                        data.variableAr.splice(i, 1);
                    }
                }
                this.destroy();
                data.simpan();
            }
        });
        this.menuTbl.onclick = (e) => {
            e.stopPropagation();
            this.menu.view.attach(document.body);
        };
    }
    get item() {
        return this._item;
    }
    gantiNama(nama) {
        this._item.nama = nama;
        this.namaDiv.innerText = 'var: ' + nama;
    }
    destroy() {
        super.destroy();
        this._item = null;
    }
    get namaDiv() {
        return this.getEl('div.nama');
    }
    get menuTbl() {
        return this.getEl('div.menu button');
    }
}
