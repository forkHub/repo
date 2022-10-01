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
        }
        baru(modul) {
            let item = new md.ModulItemView(modul);
            item.attach(this._elHtml);
            this.daftarItem.push(item);
        }
    }
    md.DaftarModulView = DaftarModulView;
})(md || (md = {}));
