import { EType, IModul, IVar, TEntity } from "./skema.js";
import { EntityObj } from "./ent/Entity.js";
import { BACK, ModulObj, ROOT, modul } from "./ent/Modul.js";
import { VariableObj, variable } from "./ent/Var.js";

let _id: number = Date.now();
export function id(): number {
    _id++;
    return _id;
}

function buatList(): EntityObj[] {
    return [];
}

export const dataObj = {
    entList: buatList(),
    modulDipilih: 0,
    modulAktif: 0,
    varDipilih: 0
};

class Data {
    private readonly table = 'uha.modul';

    getById(id: number): EntityObj {
        let h = dataObj.entList.filter((item) => {
            return item.id == id;
        });

        if (h && h.length > 0) return h[0];
        return null;
    }

    simpan() {
        let h: TEntity[] = []
        dataObj.entList.forEach((item) => {
            if (item.type == EType.modul) {
                h.push(modul.toObj(item as ModulObj));
            }
            else if (item.type == EType.var) {
                h.push(variable.toObj(item as VariableObj))
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
            let obj: TEntity[] = JSON.parse(str);

            dataObj.entList = [];
            dataObj.modulAktif = 1;
            dataObj.modulDipilih = 0;

            obj.forEach((item) => {
                if (item.type == EType.modul) {
                    dataObj.entList.push(modul.fromObj(item as IModul));
                }
                else if (item.type == EType.var) {
                    dataObj.entList.push(variable.fromObj(item as IVar));
                }
                else {
                    throw Error('muat error, type undefined: type ' + item.type);
                }
            })
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

    hapus(id: number) {
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
    }

}

export function renderPath(mId: number, h: string): string {

    let m = data.getById(mId);

    h = m.nama + '/' + h;

    if (m.id != ROOT) {
        h = renderPath(m.indukId, h);
    }

    return h;
}
export const data = new Data();
