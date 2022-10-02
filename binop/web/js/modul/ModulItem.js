var md;
(function (md) {
    class ModulItemView extends ha.comp.BaseComponent {
        constructor(item) {
            super();
            this.item = item;
        }
        destroy() {
            super.destroy();
            this.item = null;
        }
        async init() {
            console.group('item init');
            this._template = await this.loadTemplate('./template/md_modul_item.html');
            this.build();
            this.namaSpan = this.getEl('span.nama');
            this.namaSpan.innerHTML = this.item.nama;
            this.elHtml.onclick = (e) => {
                e.stopPropagation();
                console.log('focus');
                let el = document.querySelector('div.md-modul-item.dipilih');
                if (el) {
                    el.classList.remove('dipilih');
                }
                this.elHtml.classList.add('dipilih');
                md.Modul.modulAktif = this.item;
                this.elHtml.focus();
            };
            console.log('item init ends');
            console.groupEnd();
        }
        update() {
            this.namaSpan.innerHTML = this.item.nama;
        }
        static reset() {
            while (this.daftar.length > 0) {
                let view;
                view = this.daftar.pop();
                view.destroy();
            }
        }
        static async buat(item, wadah) {
            let hasil;
            hasil = new ModulItemView(item);
            await hasil.init();
            this.daftar.push(hasil);
            if (wadah) {
                hasil.attach(wadah);
            }
            return hasil;
        }
        static update(modul) {
            this.daftar.forEach((view) => {
                if (view.item.id == modul.id) {
                    view.update();
                }
            });
        }
        static hapus(modul) {
            for (let i = 0; i < this.daftar.length; i++) {
                let view;
                view = this.daftar[i];
                if (view.item.id == modul.id) {
                    view.destroy();
                    this.daftar.splice(i, 1);
                }
            }
        }
    }
    ModulItemView.daftar = [];
    md.ModulItemView = ModulItemView;
})(md || (md = {}));
