"use strict";
class Data {
    constructor() {
        this.variableAr = [];
        this.modulAr = [];
        this.dekFungsiAr = [];
        this.paramAr = [];
        this.stmtAr = [];
    }
    get halModul() {
        return this._halModul;
    }
    get halFungsi() {
        return this._halFungsi;
    }
    buatHalaman() {
        this._halFungsi = new df.HalDeklarasiFungsi();
        this._halModul = new HalModule();
    }
    simpan() {
        let str = '';
        let simpan;
        simpan = {
            var: this.variableAr,
            dekFung: this.dekFungsiAr,
            modul: this.modulAr,
            param: this.paramAr,
            stmt: this.stmtAr,
            value: [],
            arg: []
        };
        str = JSON.stringify(simpan);
        window.localStorage.setItem('ha.binop', str);
    }
    load() {
        try {
            let str;
            str = window.localStorage.getItem('ha.binop');
            if (str) {
                let muatObj;
                muatObj = JSON.parse(str);
                while (this.variableAr.length > 0) {
                    this.variableAr.pop();
                }
                while (this.modulAr.length > 0) {
                    this.modulAr.pop();
                }
                while (this.dekFungsiAr.length > 0) {
                    this.dekFungsiAr.pop();
                }
                while (this.paramAr.length > 0) {
                    this.paramAr.pop();
                }
                while (this.stmtAr.length > 0) {
                    this.stmtAr.pop();
                }
                muatObj.var.forEach((item) => {
                    this.variableAr.push({
                        id: item.id,
                        indukId: item.indukId,
                        nama: item.nama,
                        type: item.type
                    });
                });
                muatObj.modul.forEach((item) => {
                    this.modulAr.push({
                        id: item.id,
                        indukId: item.indukId,
                        nama: item.nama,
                        type: item.type
                    });
                });
                muatObj.dekFung.forEach((item) => {
                    this.dekFungsiAr.push({
                        id: item.id,
                        indukId: item.indukId,
                        nama: item.nama,
                        type: item.type
                    });
                });
                muatObj.param.forEach((item) => {
                    this.paramAr.push({
                        id: item.id,
                        indukId: item.indukId,
                        nama: item.nama,
                        type: item.type,
                        prevIdx: item.prevIdx
                    });
                });
                muatObj.stmt.forEach((item) => {
                    if (item.stmtType == STMT_PANGGIL_FUNGSI) {
                    }
                    else if (item.stmtType == STMT_VAR_ISI) {
                        let varIsi = item;
                        let obj = {
                            id: varIsi.id,
                            indukId: varIsi.indukId,
                            nama: varIsi.nama,
                            prevIdx: varIsi.prevIdx,
                            refExpId: varIsi.refExpId,
                            refVarId: varIsi.refVarId,
                            stmtType: varIsi.stmtType,
                            type: varIsi.type,
                        };
                        this.stmtAr.push(obj);
                    }
                });
            }
            else {
            }
        }
        catch (e) {
            ha.comp.dialog.tampil(e);
        }
    }
}
let data = new Data();
