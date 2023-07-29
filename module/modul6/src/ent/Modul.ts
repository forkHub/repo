import { data, dataObj, id } from "../data.js";
import { EType, IModul } from "../skema.js";
import { EntityObj } from "./Entity.js";

export class ModulObj extends EntityObj {
    readonly anak: number[] = [];

    constructor(nama: string, indukId: number) {
        super();
        this._id = id();
        this._nama = nama;
        this._indukId = indukId;
        this._type = EType.modul
    }

}

class Modul {
    buat(nama: string, indukId: number) {
        return new ModulObj(nama, indukId);
    }

    tambah(nama: string, indukId: number): EntityObj {
        let e = this.buat(nama, indukId);

        if (indukId) {
            (data.getById(indukId) as ModulObj).anak.push(e.id);
        }

        dataObj.entList.push(e);
        return e;
    }

    getByIndukId(id: number): ModulObj {
        for (let i = 0; i < dataObj.entList.length; i++) {
            let m = dataObj.entList[i] as ModulObj;
            if (m.indukId == id) return m;
        }

        throw Error('modul tidak ketemu, indukId: ' + id);
    }

    toObj(obj: ModulObj): IModul {
        return {
            anak: obj.anak.slice(),
            id: obj.id,
            indukId: obj.indukId,
            nama: obj.nama,
            type: obj.type,
        }
    }

    fromObj(i: IModul): ModulObj {
        let h = new ModulObj(i.nama, i.indukId);
        h.id = i.id;
        i.anak.slice().forEach((item) => {
            h.anak.push(item);
        });

        return h;
    }

    transpile(m: ModulObj): string {
        let h = '';

        m; //TODO:

        //declare variable

        //declare function dek

        return h;
    }
}

export const modul: Modul = new Modul();
export const ROOT = 1;
export const BACK = 2;