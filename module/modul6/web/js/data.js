import { EType } from "./skema.js";
import { BACK, ROOT, modul } from "./ent/Modul.js";
import { variable } from "./ent/Var.js";
import { df } from "./ent/DF.js";
let _id = Date.now();
export function id() {
    _id++;
    return _id;
}
function buatList() {
    return [];
}
export class Obs {
    lst;
    constructor(val) {
        this._val = val;
        this.update();
    }
    rm(f) {
        for (let i = 0; i < this.lst.length; i++) {
            if (this.lst[i] == f) {
                this.lst.splice(i, 1);
                return;
            }
        }
    }
    update() {
        this.lst.forEach((item) => {
            item();
        });
    }
    _val;
    get val() {
        return this._val;
    }
    set val(value) {
        this._val = value;
        this.update();
    }
}
export const dataObj = {
    entList: buatList(),
    modulDipilih: 0,
    modulAktif: 0,
    varDipilih: 0,
    dfDipilih: 0
};
class Data {
    table = 'uha.modul';
    getById(id) {
        let h = dataObj.entList.filter((item) => {
            return item.id == id;
        });
        if (h && h.length > 0)
            return h[0];
        console.warn("data tidak ketemu, id " + id);
        return null;
    }
    simpan() {
        let h = [];
        dataObj.entList.forEach((item) => {
            if (item.type == EType.modul) {
                h.push(modul.toObj(item));
            }
            else if (item.type == EType.var) {
                h.push(variable.toObj(item));
            }
            else if (item.type == EType.df) {
                h.push(df.toObj(item));
            }
            else {
                console.warn('type salah: ' + item.type);
            }
        });
        let str = JSON.stringify(h);
        window.localStorage.setItem(this.table, str);
    }
    muat() {
        try {
            let str = window.localStorage.getItem(this.table);
            let obj = JSON.parse(str);
            dataObj.entList = [];
            dataObj.modulAktif = 1;
            dataObj.modulDipilih = 0;
            obj.forEach((item) => {
                if (item.type == EType.modul) {
                    dataObj.entList.push((modul.fromObj(item)));
                }
                else if (item.type == EType.var) {
                    dataObj.entList.push((variable.fromObj(item)));
                }
                else if (item.type == EType.df) {
                    dataObj.entList.push(df.fromObj(item));
                }
                else {
                    throw Error('muat error, type undefined: type ' + item.type);
                }
            });
        }
        catch (e) {
            console.warn('muat error');
            console.warn(e);
            let root = modul.tambah('root', 0);
            root.id = ROOT;
            let back = modul.tambah('..', 0);
            back.id = BACK;
            modul.tambah('root01', root.id);
            modul.tambah('root02', root.id);
            dataObj.modulAktif = root.id;
            this.simpan();
        }
    }
    hapus(id) {
        for (let i = 0; i < dataObj.entList.length; i++) {
            let e = dataObj.entList[i];
            if (e.id === id) {
                dataObj.entList.splice(i, 1);
                console.log('hapus entity', e);
                return;
            }
        }
        console.warn('hapus gagal, id tidak ada: ' + id);
    }
    resetDipilih() {
        dataObj.varDipilih = 0;
        dataObj.modulDipilih = 0;
        dataObj.dfDipilih = 0;
    }
}
export function renderPath(mId, h) {
    let m = data.getById(mId);
    h = m.nama + '/' + h;
    if (m.id != ROOT) {
        h = renderPath(m.indukId, h);
    }
    return h;
}
export const data = new Data();
