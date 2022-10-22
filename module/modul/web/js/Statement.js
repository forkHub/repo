"use strict";
var ha;
(function (ha) {
    var modul;
    (function (modul) {
        var statement;
        (function (statement) {
            function tambahVar() {
                console.log('tambah stmt');
            }
            statement.tambahVar = tambahVar;
        })(statement = modul.statement || (modul.statement = {}));
    })(modul = ha.modul || (ha.modul = {}));
})(ha || (ha = {}));
