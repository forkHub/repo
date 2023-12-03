"use strict";
//operation
function tambah() {
    let str = window.prompt("nama:", "");
    if (str) {
        let obj = Modul.tambah(str);
        if (Modul.dipilih <= 0) {
            Modul.dipilih = obj.id;
            pilih(obj.id);
        }
        ModulView.tambah(obj);
        Modul.simpan();
    }
    else {
        Dialog.open('nama invalid');
    }
}
function edit() {
    if (Modul.dipilih <= 0) {
        Dialog.open('tidak ada modul dipilih');
        return;
    }
    let str = window.prompt('nama:');
    if (str) {
        let m = Modul.baca(Modul.dipilih);
        m.nama = str;
        ModulView.update(m);
    }
}
function hapus() {
    console.group('hapus');
    console.log('modul dipilih', Modul.dipilih);
    console.groupEnd();
    if (Modul.dipilih <= 0) {
        Dialog.open("tidak ada modul dipilih");
        return;
    }
    let c = window.confirm('Hapus?');
    if (c) {
        Modul.hapus(Modul.dipilih);
        ModulView.hapus(Modul.dipilih);
        Modul.dipilih = -1;
        Modul.simpan();
    }
}
function pilih(id) {
    if (Modul.dipilih > 0) {
        ModulView.baca(Modul.dipilih).classList.remove('dipilih');
    }
    Modul.dipilih = id;
    ModulView.baca(Modul.dipilih).classList.add('dipilih');
}
function buka() {
    if (Modul.dipilih <= 0) {
        Dialog.open('tidak ada modul dipilih');
        return;
    }
    window.location.href = `./index.html?id=${Modul.dipilih}`;
}
Modul.init();
ModulView.init();
if (getq)
    ModulView.refresh();
