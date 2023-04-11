"use strict";
class ItemModul extends ha.comp.BaseComponent {
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
        this.gantiNama(item.nama);
        this.setupMenu();
        this.menuTbl.onclick = (e) => {
            e.stopPropagation();
            this.menu.view.attach(document.body);
        };
    }
    get item() {
        return this._item;
    }
    destroy() {
        super.destroy();
        this._item = null;
    }
    setupMenu() {
        this.menu = new ha.comp.MenuPopup();
        this.menu.buatTombol({
            label: 'rename',
            f: () => {
                let nama = window.prompt('Nama Modul: ', this._item.nama);
                if (nama) {
                    this.gantiNama(nama);
                    data.simpan();
                }
            }
        });
        this.menu.buatTombol({
            label: 'edit',
            f: () => {
                console.log('edit modul');
            }
        });
        this.menu.buatTombol({
            label: 'hapus',
            f: () => {
                for (let i = 0; i < data.modulAr.length; i++) {
                    if (data.modulAr[i].id == this._item.id) {
                        data.modulAr.splice(i, 1);
                        break;
                    }
                }
                this.destroy();
                data.simpan();
            }
        });
    }
    gantiNama(nama) {
        this._item.nama = nama;
        this.namaDiv.innerText = 'mod: ' + nama;
    }
    get namaDiv() {
        return this.getEl('div.nama');
    }
    get menuTbl() {
        return this.getEl('div.menu button');
    }
}
