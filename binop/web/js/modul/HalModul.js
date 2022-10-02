var md;
(function (md) {
    class HalModul extends ha.comp.BaseComponent {
        constructor() {
            super();
        }
        async baru(modul) {
            console.group('item baru');
            await this.daftarView.baru(modul);
            console.groupEnd();
        }
        //pindah modul/load modul
        reset() {
            this.daftarView.reset();
        }
        load() {
            this.reset();
        }
        async init() {
            console.group('hal modul init:');
            this._template = await this.loadTemplate('./template/md_hal_modul.html');
            this.build();
            this.daftarWdh = this.getEl('div.daftar-cont');
            this.daftarView = new md.DaftarModulView();
            await this.daftarView.init();
            this.daftarView.attach(this.daftarWdh);
            this.initTombol();
            console.groupEnd();
        }
        initTombol() {
            this.tombolAr = [
                {
                    label: 'tambah',
                    klik: (e) => {
                        console.log('tambah klik');
                        this.tombolKlik(e);
                    }
                },
                {
                    label: 'prop',
                    klik: (e) => {
                        console.log('prop klik');
                        this.tombolKlik(e);
                    }
                },
                {
                    label: 'edit',
                    klik: (e) => {
                        console.log('edit klik');
                        this.tombolKlik(e);
                    }
                },
                {
                    label: Kons.TBL_HAPUS,
                    klik: (e) => {
                        console.log('hapus klik');
                        this.tombolKlik(e);
                    }
                }
            ];
            this.tombolWdh = document.createElement('div');
            this.tombolWdh.classList.add('menu-wdh');
            this.tombolWdh.classList.add('padding');
            this.tombolWdh.classList.add('disp-flex');
            this.tombolAr.forEach((item) => {
                item.el = document.createElement('button');
                item.el.innerHTML = item.label;
                item.el.onclick = (e) => {
                    e.stopPropagation();
                    item.klik(e);
                };
                this.tombolWdh.appendChild(item.el);
            });
            console.log(this.tombolWdh);
        }
        tambahModulKlik() {
            let nama;
            nama = window.prompt('Nama Modul');
            md.Modul.buat(nama, ha.comp.Id.id);
        }
        get tombolWdh() {
            return this._tombolWdh;
        }
        set tombolWdh(value) {
            this._tombolWdh = value;
        }
        get tombolKlik() {
            return this._tombolKlik;
        }
        set tombolKlik(value) {
            this._tombolKlik = value;
        }
    }
    md.halModul = new HalModul();
    md.halModul.tombolKlik = async (e) => {
        let label = e.currentTarget.innerText;
        if (Kons.TBL_TAMBAH == label) {
            let nama;
            nama = window.prompt('Nama Modul');
            let modul = md.Modul.buat(nama, ha.comp.Id.id);
            await md.halModul.baru(modul);
            simpan();
        }
        else if (Kons.TBL_EDIT == label) {
        }
        else if (Kons.TBL_PROP == label) {
        }
        else if (Kons.TBL_HAPUS == label) {
        }
    };
})(md || (md = {}));
