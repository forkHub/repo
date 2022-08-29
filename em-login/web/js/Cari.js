"use strict";
var ha;
(function (ha) {
    var contact;
    (function (contact) {
        class Cari extends ha.comp.BaseComponent {
            constructor() {
                super();
                this._elHtml = this.getTemplate('ha-search');
            }
            init() {
                ha.contact.beranda.cariTbl.onclick = () => {
                    console.log('cari click');
                    this.attach(document.body);
                };
                this.tutupTbl.onclick = (e) => {
                    e.stopPropagation();
                    this.detach();
                };
                this.cariTbl.onclick = (e) => {
                    e.stopPropagation();
                    console.log('cari click');
                    ha.contact.contact.postRefresh();
                };
            }
            get tutupTbl() {
                return this.getEl('button.tutup');
            }
            get cariTbl() {
                return this.getEl('button.cari');
            }
        }
        contact.cari = new Cari();
    })(contact = ha.contact || (ha.contact = {}));
})(ha || (ha = {}));
