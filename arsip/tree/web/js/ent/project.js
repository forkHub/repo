import { ent } from "./ent.js";
import { FolderObj } from "./folder.js";
export class ProjectObj {
    _nama = '';
    get nama() {
        return this._nama;
    }
    set nama(value) {
        this._nama = value;
    }
    _data = new FolderObj();
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
}
class Data {
    _aktif;
    _dipilih;
    get dipilih() {
        return this._dipilih;
    }
    set dipilih(value) {
        this._dipilih = value;
    }
    get aktif() {
        return this._aktif;
    }
    set aktif(value) {
        this._aktif = value;
    }
}
export class Project {
    list = [];
    data = new Data();
    simpan() {
        try {
            let str = JSON.stringify(this.p2Objs(this.list));
            window.localStorage.setItem('ha.folder', str);
        }
        catch (e) {
            console.warn(e);
        }
    }
    muat() {
        try {
            while (this.list.length > 0) {
                this.list.pop();
            }
            let str = window.localStorage.getItem('ha.folder');
            let obj = JSON.parse(str);
            obj.forEach((item) => {
                this.list.push(this.fromObj(item));
            });
        }
        catch (e) {
            console.warn(e);
        }
    }
    p2Objs(p) {
        let hasil = [];
        p.forEach((item) => {
            hasil.push(this.p2Obj(item));
        });
        return hasil;
    }
    fromObj(p) {
        let h = new ProjectObj();
        h.nama = p.nama;
        h.data = ent.folder.fromObj(p.data);
        return h;
    }
    p2Obj(p) {
        return {
            nama: p.nama,
            data: ent.folder.toObj(p.data)
        };
    }
    buka(p) {
        this.data.aktif = p;
    }
    buat(nama) {
        let h = new ProjectObj();
        h.nama = nama;
        h.data.nama = 'root';
        this.list.push(h);
        return h;
    }
}
// export const project = new Project();
