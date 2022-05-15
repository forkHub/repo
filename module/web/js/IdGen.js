"use strict";
var ha;
(function (ha) {
    var modul;
    (function (modul) {
        class IdGen {
            id = 0;
            buatId() {
                this.id++;
                return this.id;
            }
        }
        modul.idGen = new IdGen();
    })(modul = ha.modul || (ha.modul = {}));
})(ha || (ha = {}));
