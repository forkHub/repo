import { data, dataObj } from "../../data.js";
import { dialogShow } from "../../dialog.js";
import { df } from "../../ent/DF.js";
import { util } from "../../util.js";
import { renderList } from "./halModul.js";
export function tblTambahDekFungsi() {
    let tbl = document.createElement('button');
    tbl.innerText = 'tambah DF';
    tbl.onclick = (e) => {
        e.stopPropagation();
        let str = window.prompt('nama fungsi:');
        if (!str) {
            dialogShow('nama invalid');
            return;
        }
        df.tambah(str, dataObj.modulAktif);
        renderList();
        data.simpan();
        //update list
    };
    return tbl;
}
export function tblEditDekFungsi() {
    let tbl = document.createElement('button');
    tbl.innerText = 'edit DF';
    tbl.onclick = (e) => {
        e.stopPropagation();
        if (!dataObj.dfDipilih) {
            dialogShow('tidak ada dek fungsi dipilih');
            return;
        }
        let str = window.prompt('nama fungsi:');
        if (!str) {
            dialogShow('nama invalid');
            return;
        }
        data.getById(dataObj.dfDipilih).nama = str;
        renderList();
        data.simpan();
    };
    return tbl;
}
export function tblHapusDF() {
    let tbl = util.buatTombol('hapus df');
    tbl.onclick = (e) => {
        e.stopPropagation();
        if (!dataObj.dfDipilih) {
            dialogShow('tidak ada dek fungsi dipilih');
            return;
        }
        let df = data.getById(dataObj.dfDipilih);
        data.hapus(dataObj.dfDipilih);
        dataObj.dfDipilih = 0;
        //hapus relasi ke parent
        let anak = data.getById(df.indukId).anak;
        for (let i = 0; i < anak.length; i++) {
            if (anak[i] === df.id) {
                anak.splice(i, 1);
                break;
            }
        }
        renderList();
        data.simpan();
        //TODO: next: hapus statement
    };
    return tbl;
}
//TODO:
/**
 * edit df
 * hapus df
 *
 * tambah param
 * edit param
 * hapus param
 *
 * tambah stmt
 * hapus stmt
 * edit stmt
 * ubah stmt type
 *
 */ 
