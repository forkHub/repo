import { dataObj, data } from "../../data.js";
import { dialogShow } from "../../dialog.js";
import { BACK, modul, ModulObj } from "../../ent/Modul.js";
import { cont, halModule, renderList } from "./halModul.js";

export function bukaModul(): void {
    if (!dataObj.modulDipilih) {
        console.warn('tidak ada modul dipilih');
        dialogShow('tidak ada modul dipilih');
        return;
    }

    let m = data.getById(dataObj.modulDipilih);

    if (m.id === BACK) {

        console.log('buka parent');
        if (dataObj.modulAktif == 1) {
            console.log('root');
            return;
        }

        dataObj.modulAktif = data.getById(dataObj.modulAktif).indukId;
        dataObj.modulDipilih = 0;
    }
    else {
        console.log('buka modul');
        dataObj.modulAktif = dataObj.modulDipilih;
        dataObj.modulDipilih = 0;
    }

    halModule(cont);
}

export function tambahModul(): void {

    let nama = window.prompt('nama modul', '');

    if (nama) {
        modul.tambah(nama, dataObj.modulAktif);
        data.simpan();
        renderList();
    }
    else {
        console.warn('nama kosong');
    }

}

export function hapusModul(): void {
    if (!dataObj.modulDipilih) {
        dialogShow('tidak ada modul dipilih');
        return;
    }

    let m = data.getById(dataObj.modulDipilih) as ModulObj;
    if (m.anak.length > 0) {
        dialogShow('tidak kosong');
        return;
    }

    console.log('hapus modul, id ', m.id);
    data.hapus(m.id);
    let anak = (data.getById(m.indukId) as ModulObj).anak;

    for (let i = 0; i < anak.length; i++) {
        if (anak[i] === m.id) {
            anak.splice(i, 1);
            break;
        }
    }

    data.simpan();
    renderList();
}

export function renameModul(): void {
    if (!dataObj.modulDipilih) {
        return;
    }

    if (dataObj.modulDipilih == BACK) {
        return;
    }

    let nama = window.prompt('nama:');
    if (!nama) {
        return;
    }

    data.getById(dataObj.modulDipilih).nama = nama;
    data.simpan();
    renderList();
}
