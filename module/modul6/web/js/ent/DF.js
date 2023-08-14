import { data, dataObj, id } from "../data.js";
import { EType } from "../skema.js";
import { EntityObj } from "./Entity.js";
export class DFObj extends EntityObj {
    param = [];
    anak = [];
    constructor(nama, indukId) {
        super();
        this._id = id();
        this._nama = nama;
        this._indukId = indukId;
        this._type = EType.df;
    }
}
class DekFungsi {
    toObj(obj) {
        return {
            id: obj.id,
            indukId: obj.indukId,
            nama: obj.nama,
            type: obj.type,
            param: [],
            anak: [] //TODO:
        };
    }
    fromObj(i) {
        let h = new DFObj(i.nama, i.indukId);
        h.id = i.id;
        //TODO:anak, param
        return h;
    }
    buat(nama, indukId) {
        return new DFObj(nama, indukId);
    }
    tambah(nama, indukId) {
        let e = this.buat(nama, indukId);
        if (indukId) {
            data.getById(indukId).anak.push(e.id);
        }
        dataObj.entList.push((e));
        return e;
    }
    namaFull(v, p) {
        if (v.type == EType.modul) {
            if (v.nama != 'root') {
                p = v.nama + '_' + p;
                return this.namaFull(data.getById(v.indukId), p);
            }
        }
        return p;
    }
    transpile(v) {
        let h = '';
        h += 'function ' + this.namaFull(data.getById(v.indukId), '') + v.nama + '() {}';
        h += '\n';
        return h;
    }
}
export const df = new DekFungsi();
