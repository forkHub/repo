import { data, dataObj, id } from "../data.js";
import { EType } from "../skema.js";
import { EntityObj } from "./Entity.js";
export class ModulObj extends EntityObj {
    anak = [];
    constructor(nama, indukId) {
        super();
        this._id = id();
        this._nama = nama;
        this._indukId = indukId;
        this._type = EType.modul;
    }
}
class Modul {
    buat(nama, indukId) {
        return new ModulObj(nama, indukId);
    }
    tambah(nama, indukId) {
        let e = this.buat(nama, indukId);
        if (indukId) {
            data.getById(indukId).anak.push(e.id);
        }
        dataObj.entList.push(e);
        return e;
    }
    getByIndukId(id) {
        for (let i = 0; i < dataObj.entList.length; i++) {
            let m = dataObj.entList[i];
            if (m.indukId == id)
                return m;
        }
        throw Error('modul tidak ketemu, indukId: ' + id);
    }
    toObj(obj) {
        return {
            anak: obj.anak.slice(),
            id: obj.id,
            indukId: obj.indukId,
            nama: obj.nama,
            type: obj.type,
        };
    }
    fromObj(i) {
        let h = new ModulObj(i.nama, i.indukId);
        h.id = i.id;
        i.anak.slice().forEach((item) => {
            h.anak.push(item);
        });
        return h;
    }
}
export const modul = new Modul();
export const ROOT = 1;
export const BACK = 2;
