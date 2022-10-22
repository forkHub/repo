"use strict";
var ha;
(function (ha) {
    var modul;
    (function (modul) {
        class ItemView extends ha.comp.BaseComponent {
            constructor() {
                super();
                this._elHtml = this.getTemplate('item');
            }
            dipilih() {
                this._elHtml.classList.add('dipilih');
            }
            tidakDipilih() {
                this._elHtml.classList.remove('dipilih');
            }
            get judul() {
                return this.getEl('judul');
            }
        }
        modul.ItemView = ItemView;
    })(modul = ha.modul || (ha.modul = {}));
})(ha || (ha = {}));
