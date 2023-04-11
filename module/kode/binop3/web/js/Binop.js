"use strict";
var ha;
(function (ha) {
    var binop;
    (function (binop_1) {
        class Binop {
            constructor() {
                this.opr1 = ha.comp.Util.getEl('binop form input.opr1');
                this.opr2 = ha.comp.Util.getEl('binop form input.opr2');
                this.opr = ha.comp.Util.getEl('binop form input.opr');
                this.tblUpdate = ha.comp.Util.getEl('binop menu button.update');
                this.elAktif = 'opr1';
            }
            init() {
                this.opr1.onclick = () => {
                    console.log('opr1 on click');
                    this.elAktif = 'opr1';
                };
                this.opr2.onclick = () => {
                    console.log('opr2 click');
                    this.elAktif = 'opr2';
                };
                this.opr.onclick = () => {
                    console.log('opr click');
                    this.elAktif = 'opr';
                };
                this.tblUpdate.onclick = () => {
                    if (this.elAktif == 'opr1') {
                        let value = window.prompt("value");
                        binopObj.opr1.value = value;
                        this.opr1.value = value;
                    }
                    else if (this.elAktif == 'opr') {
                        let value = window.prompt("value");
                        binopObj.opr = value;
                        this.opr.value = value;
                    }
                    else if (this.elAktif == 'opr2') {
                        let value = window.prompt("value");
                        binopObj.opr2.value = value;
                        this.opr2.value = value;
                    }
                    else {
                        console.log('tidak ada element dipilih');
                    }
                };
            }
        }
        binop_1.binop = new Binop();
    })(binop = ha.binop || (ha.binop = {}));
})(ha || (ha = {}));
let binopObj = {
    opr1: {
        value: "",
        type: "literal"
    },
    opr: "==",
    opr2: {
        value: "",
        type: "literal"
    }
};
window.onload = () => {
    ha.binop.binop.init();
};
