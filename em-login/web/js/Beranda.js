"use strict";
var ha;
(function (ha) {
    var contact;
    (function (contact) {
        class Beranda {
            init() {
                // let exit: HTMLButtonElement = document.body.querySelector("button.exit") as HTMLButtonElement;
                // console.log(exit);
                // exit.onclick = () => {
                //     let data: IMessage = {
                //         to: 'server',
                //         action: 'exit',
                //         data: ''
                //     }
                //     window.parent.postMessage(JSON.stringify(data), "*");
                // }
            }
            get cont() {
                return ha.comp.Util.getEl('ha-cont');
            }
            get kolomKiri() {
                return ha.comp.Util.getEl('ha-cont kol-kiri');
            }
            get kolomKanan() {
                return ha.comp.Util.getEl('ha-cont kol-kanan');
            }
            get cariTbl() {
                return ha.comp.Util.getEl('ha-header button.cari');
            }
            get tutupTbl() {
                return ha.comp.Util.getEl("ha-header button.tutup");
            }
        }
        contact.beranda = new Beranda();
    })(contact = ha.contact || (ha.contact = {}));
})(ha || (ha = {}));
