import { data, dataObj, id } from "../data.js";
import { EType, IDF } from "../skema.js";
import { EntityObj } from "./Entity.js";

export class DFObj extends EntityObj implements IDF {
    readonly param: number[] = [];
    readonly anak: number[] = [];

    constructor(nama: string, indukId: number) {
        super();
        this._id = id();
        this._nama = nama;
        this._indukId = indukId;
        this._type = EType.df;
    }
}

class DekFungsi {

    toObj(obj: DFObj): IDF {
        return {
            id: obj.id,
            indukId: obj.indukId,
            nama: obj.nama,
            type: obj.type,
            param: [],  //TODO:
            anak: []    //TODO:
        }
    }

    fromObj(i: IDF): DFObj {
        let h = new DFObj(i.nama, i.indukId);
        h.id = i.id;

        //TODO:anak, param

        return h;
    }

    buat(nama: string, indukId: number) {
        return new DFObj(nama, indukId);
    }

    tambah(nama: string, indukId: number): EntityObj {
        let e = this.buat(nama, indukId);

        if (indukId) {
            (data.getById(indukId) as DFObj).anak.push(e.id);
        }

        dataObj.entList.push((e));
        return e;
    }

    namaFull(v: EntityObj, p: string): string {
        if (v.type == EType.modul) {
            if (v.nama != 'root') {
                p = v.nama + '_' + p;
                return this.namaFull(data.getById(v.indukId), p);
            }
        }

        return p;
    }

    transpile(v: EntityObj): string {
        let h = '';

        h += 'function ' + this.namaFull(data.getById(v.indukId), '') + v.nama + '() {}';
        h += '\n';

        return h;
    }
}

export const df = new DekFungsi();