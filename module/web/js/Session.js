"use strict";
var ha;
(function (ha) {
    var modul;
    (function (modul) {
        class Session {
            simpan() {
            }
            load() {
                let dataStr = window.sessionStorage.getItem('ha.mobile.editor');
                let ses;
                ses = JSON.parse(dataStr);
                return ses;
            }
        }
        modul.session = new Session();
    })(modul = ha.modul || (ha.modul = {}));
})(ha || (ha = {}));
