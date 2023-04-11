var md;
(function (md) {
    class HalModul extends ha.comp.BaseComponent {
        constructor() {
            super();
        }
        get daftarWdh() {
            return this._daftarWdh;
        }
        set daftarWdh(value) {
            this._daftarWdh = value;
        }
        // async baru(modul: IModul): Promise<void> {
        // 	console.group('item baru');
        // 	await this.daftarView.baru(modul);
        // 	console.groupEnd();
        // }
        //pindah modul/load modul
        // reset(): void {
        // this.daftarView.reset();
        // }
        // load(): void {
        // this.reset();
        // }
        async init() {
            console.group('hal modul init:');
            this._template = await this.loadTemplate('./template/md_hal_modul.html');
            this.build();
            this.daftarWdh = this.getEl('div.daftar-cont');
            // this.daftarView = new DaftarModulView();
            // await this.daftarView.init();
            // this.daftarView.attach(this.daftarWdh);
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
            await md.ModulItemView.buat(modul, md.halModul.daftarWdh);
            simpan();
        }
        else if (Kons.TBL_EDIT == label) {
            if (md.Modul.modulAktif) {
                let nama;
                nama = window.prompt('Nama Modul');
                md.Modul.modulAktif.nama = nama;
                md.ModulItemView.update(md.Modul.modulAktif);
                simpan();
            }
            else {
                ha.comp.dialog.tampil('tidak ada item dipilih');
            }
        }
        else if (Kons.TBL_PROP == label) {
            console.log('prop di klik');
        }
        else if (Kons.TBL_HAPUS == label) {
            console.log('hapus di klik');
            if (md.Modul.modulAktif) {
                md.ModulItemView.hapus(md.Modul.modulAktif);
                md.Modul.hapusAktif();
                simpan();
            }
            else {
                ha.comp.Util.error(new Error('tidak ada modul aktif'));
            }
        }
        else {
            ha.comp.Util.error(new Error('label tidak terdaftar: ' + label));
        }
    };
})(md || (md = {}));
