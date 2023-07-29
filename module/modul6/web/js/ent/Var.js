import { data, dataObj, id } from "../data.js";
import { EType } from "../skema.js";
import { EntityObj } from "./Entity.js";
export class VariableObj extends EntityObj {
    constructor(nama, indukId) {
        super();
        this._type = EType.var;
        this._id = id();
        this._nama = nama;
        this._indukId = indukId;
    }
}
class Variable {
    buat(nama, indukId) {
        return new VariableObj(nama, indukId);
    }
    tambah(nama, indukId) {
        let e = this.buat(nama, indukId);
        console.log('e', e);
        dataObj.entList.push(e);
        return e;
    }
    toObj(obj) {
        return {
            // anak: obj.anak.slice(),
            id: obj.id,
            indukId: obj.indukId,
            nama: obj.nama,
            type: obj.type,
        };
    }
    fromObj(i) {
        let h = new VariableObj(i.nama, i.indukId);
        h.id = i.id;
        return h;
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
        h += 'var ' + this.namaFull(data.getById(v.indukId), '') + v.nama;
        h += '\n';
        return h;
    }
}
export const variable = new Variable();
