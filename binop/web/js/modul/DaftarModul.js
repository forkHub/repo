var md;
(function (md) {
    class DaftarModulView extends ha.comp.BaseComponent {
        constructor() {
            super();
        }
        get wadah() {
            return this._wadah;
        }
        set wadah(value) {
            this._wadah = value;
        }
        async init() {
            this._template = await this.loadTemplate("./template/md_daftar_modul.html");
            this.build();
            this.wadah = this.getEl('div.wadah');
        }
    }
    md.DaftarModulView = DaftarModulView;
})(md || (md = {}));
