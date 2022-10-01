var md;
(function (md) {
    class HalModul extends ha.comp.BaseComponent {
        constructor() {
            super();
            this.tombolAr = [
                {
                    label: 'tambah',
                    klik: () => {
                        console.log('tambah klik');
                    }
                },
                {
                    label: 'prop',
                    klik: () => {
                        console.log('prop klik');
                    }
                },
                {
                    label: 'edit',
                    klik: () => {
                        console.log('edit klik');
                    }
                }
            ];
            this.tombolWdh = document.createElement('div');
            this.tombolWdh.classList.add('menu-wdh');
            this.tombolWdh.classList.add('padding');
            this.tombolWdh.classList.add('disp-flex');
            this.tombolAr.forEach((item) => {
                item.el = document.createElement('button');
                item.el.onclick = (e) => {
                    e.stopPropagation();
                    item.klik();
                };
                this.tombolWdh.appendChild(item.el);
            });
        }
        baru(modul) {
            this.daftarView.baru(modul);
        }
        async init() {
            this._template = await this.loadTemplate('./template/md_hal_modul.html');
            this.build();
            this.daftarWdh = this.getEl('div.daftar-cont');
            this.daftarView = new md.DaftarModulView();
            await this.daftarView.init();
            this.daftarView.attach(this.daftarWdh);
        }
        get tombolWdh() {
            return this._tombolWdh;
        }
        set tombolWdh(value) {
            this._tombolWdh = value;
        }
    }
    md.halModul = new HalModul();
})(md || (md = {}));
