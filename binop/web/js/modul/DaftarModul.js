var md;
(function (md) {
    class DaftarModulView extends ha.comp.BaseComponent {
        constructor() {
            super();
            this.daftarItem = [];
        }
        async init() {
            this._template = await this.loadTemplate("./template/md_daftar_modul.html");
            this.build();
            this.wadah = this.getEl('div.wadah');
        }
        reset() {
            let view;
            while (this.daftarItem.length > 0) {
                view = this.daftarItem.pop();
                view.destroy();
            }
        }
        async baru(modul) {
            let item;
            console.group('daftar modul: baru');
            // item;
            // modul;
            // this.wadah;
            item = new md.ModulItemView(modul);
            await item.init();
            item.attach(this.wadah);
            this.daftarItem.push(item);
            console.groupEnd();
        }
    }
    md.DaftarModulView = DaftarModulView;
})(md || (md = {}));
