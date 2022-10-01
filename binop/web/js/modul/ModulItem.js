var md;
(function (md) {
    class ModulItemView extends ha.comp.BaseComponent {
        constructor(item) {
            super();
            this.item = item;
        }
        async init() {
            this._template = await this.loadTemplate('./template/md_modul_item.html');
            this.build();
            this.namaSpan = this.getEl('span.nama');
            this.namaSpan.innerHTML = this.item.nama;
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
