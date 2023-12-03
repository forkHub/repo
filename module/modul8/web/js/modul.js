"use strict";
class Id {
    static get id() {
        this._id++;
        return this._id;
    }
}
Id._id = Date.now();
class ModulObj {
    constructor(id, nama) {
        this._id = -1;
        this._nama = '';
        this.anak = [];
        this._id = id;
        this._nama = nama;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get nama() {
        return this._nama;
    }
    set nama(value) {
        this._nama = value;
    }
}
class Modul {
    static get dibuka() {
        return Modul._dibuka;
    }
    static set dibuka(value) {
        Modul._dibuka = value;
    }
    static get dipilih() {
        return Modul._dipilih;
    }
    static set dipilih(value) {
        Modul._dipilih = value;
    }
    static toObj(obj) {
        return {
            id: obj.id,
            nama: obj.nama
        };
    }
    static fromObj(obj) {
        return new ModulObj(obj.id, obj.nama);
    }
    static simpan() {
        let daftar = [];
        this._daftar.forEach((item) => {
            daftar.push(this.toObj(item));
        });
        window.localStorage.setItem(this.namaStorage, JSON.stringify(daftar));
    }
    static muat() {
        while (this._daftar.length > 0) {
            this._daftar.pop();
        }
        try {
            let str = window.localStorage.getItem(this.namaStorage);
            console.log(str);
            let objAr = JSON.parse(str);
            console.log(objAr);
            objAr.forEach((item) => {
                console.log(item);
                this._daftar.push(this.fromObj(item));
            });
            console.log(this.getDaftar);
        }
        catch (e) {
            console.warn(e);
        }
    }
    static init() {
        this.muat();
    }
    static tambah(nama) {
        let obj = new ModulObj(Id.id, nama);
        this._daftar.push(obj);
        return obj;
    }
    static hapus(id) {
        let hasil;
        hasil = this.baca(id);
        for (let i = 0; i < this._daftar.length; i++) {
            if (this._daftar[i].id == id) {
                hasil = this._daftar.splice(i, 1)[0];
                break;
            }
        }
        return hasil;
    }
    static baca(id) {
        let hasil;
        this._daftar.forEach((item) => {
            if (item.id == id) {
                hasil = item;
            }
        });
        return hasil;
    }
    static getDaftar() {
        return this._daftar.slice();
    }
}
Modul._daftar = [];
Modul._dipilih = 0;
Modul._dibuka = 0;
Modul.namaStorage = 'ha.be.modul.modul';
//Modul view
class ModulView {
    static init() {
        this.daftarEl = document.querySelector('div.daftar');
    }
    static buatModulIsiEl(m, p) {
        p.innerHTML = `
        <span>${m.nama}</span>
    `;
    }
    static buatModulEl(m) {
        let el = document.createElement('div');
        el.setAttribute('data-id', m.id + '');
        el.setAttribute('onclick', `pilih(${m.id})`);
        this.buatModulIsiEl(m, el);
        return el;
    }
    static refresh() {
        this.daftarEl.innerHTML = '';
        Modul.getDaftar().forEach((item) => {
            let el = this.buatModulEl(item);
            this.daftarEl.appendChild(el);
        });
    }
    static update(m) {
        let el = this.daftarEl.querySelector(`[data-id="${m.id}"]`);
        this.buatModulIsiEl(m, el);
    }
    static tambah(m) {
        let el = this.buatModulEl(m);
        this.daftarEl.appendChild(el);
    }
    static hapus(m) {
        let el = this.daftarEl.querySelector(`[data-id="${m}"]`);
        this.daftarEl.removeChild(el);
    }
    static baca(id) {
        return this.daftarEl.querySelector(`[data-id="${id}"]`);
    }
}
