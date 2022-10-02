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
        hapus(modul) {
            if (modul.id == this.item.id) {
                this.item = null;
                this.destroy();
            }
        }
    }
    md.ModulItemView = ModulItemView;
})(md || (md = {}));
