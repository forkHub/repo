"use strict";
class ItemDekFungsi extends ha.comp.BaseComponent {
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
        this.namaDiv.innerText = 'fung: ' + item.nama;
        this.setupMenu();
        this.menuTbl.onclick = (e) => {
            e.stopPropagation();
            this.menu.view.attach(document.body);
        };
    }
    get item() {
        return this._item;
    }
    setupMenu() {
        this.menu = new ha.comp.MenuPopup();
        this.menu.buatTombol({
            label: 'rename',
            f: () => {
                let nama;
                nama = window.prompt('Nama Dek Fungsi: ', this._item.nama);
                if (nama) {
                    this.gantiNama(nama);
                    data.simpan();
                }
            }
        });
        this.menu.buatTombol({
            label: 'hapus',
            f: () => {
                for (let i = 0; i < data.dekFungsiAr.length; i++) {
                    if (data.dekFungsiAr[i].id == this._item.id) {
                        data.dekFungsiAr.splice(i, 1);
                        break;
                    }
                }
                this.destroy();
                data.simpan();
            }
        });
        this.menu.buatTombol({
            label: 'edit',
            f: () => {
                console.log('edit dek fungsi');
                data.halModul.detach();
                data.halFungsi.attach(document.body);
                data.halFungsi.item = this._item;
                data.halFungsi.tampil();
            }
        });
    }
    gantiNama(nama) {
        this._item.nama = nama;
        this.namaDiv.innerText = 'fung: ' + nama;
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
