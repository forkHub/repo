import { ent } from "../ent/ent.js";
import { expl } from "../hal/explore.js";
import { dialogShow } from "../index.js";
import { beranda } from "./beranda.js";
import { menuEl, setKlik } from "./menu.js";
class File {
    tambah() {
        if (!ent.folder.data.aktif) {
            dialogShow('tidak ada folder aktif');
            return;
        }
        let nama = window.prompt('Nama file:');
        if (!ent.file.validasiNama(nama)) {
            dialogShow('nama invalid');
            return;
        }
        //validasi nama
        let f = ent.file.buat(nama);
        ent.folder.tambahFile(ent.folder.data.aktif, f);
        ent.folder.renderFolder(ent.project.data.aktif.data, ent.folder.data.aktif, expl.listEl, expl.pathEl);
    }
    hapus() {
        let f = ent.file.data.dipilih;
        console.log(f);
        if (!f) {
            dialogShow('tidak ada file dipilih');
            return;
        }
        //
        let p = ent.folder.getFileInduk(ent.project.data.aktif.data, ent.file.data.dipilih);
        if (p) {
            let idx = p.file.indexOf(ent.file.data.dipilih);
            if (idx >= 0) {
                p.file.splice(idx, 1);
                ent.folder.renderFolder(ent.project.data.aktif.data, ent.folder.data.aktif, expl.listEl, expl.pathEl);
            }
            else {
                console.warn('file tidak ditemukan di parent');
                console.log("parent ", p);
                console.log("file", ent.file.data.dipilih);
            }
        }
        else {
            console.warn('parent tidak ketemu:');
            console.log('target', ent.file.data.dipilih);
        }
    }
    rename() {
        if (!ent.file.data.dipilih) {
            dialogShow('tidak ada file dipilih');
            return;
        }
        let nama = window.prompt('nama', ent.file.data.dipilih.nama);
        if (!nama) {
            dialogShow('nama tidak valid');
            return;
        }
        if (!ent.file.validasiNama(nama)) {
            dialogShow('nama tidak valid');
            return;
        }
        ent.file.data.dipilih.nama = nama;
        ent.folder.renderFolder(ent.project.data.aktif.data, ent.folder.data.aktif, expl.listEl, expl.pathEl);
    }
    render(cont) {
        cont.innerHTML = `
            <button class="tambah">baru</button>
            <button class="hapus">hapus</button>
            <button class="rename">rename</button>
        `;
        menuEl.atas.detail.innerText = 'file';
        setKlik(cont, 'tambah', () => { this.tambah(); });
        setKlik(cont, 'hapus', () => { this.hapus(); });
        setKlik(cont, 'rename', () => { this.rename(); });
        menuEl.atas.balik.onclick = () => {
            beranda.render(cont);
        };
    }
}
export const file = new File();
