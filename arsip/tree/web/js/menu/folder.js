import { ent } from "../ent/ent.js";
import { expl } from "../hal/explore.js";
import { dialogShow } from "../index.js";
import { beranda } from "./beranda.js";
import { menuEl, setKlik } from "./menu.js";
class Folder {
    tambahFolder() {
        if (!ent.folder.data.aktif) {
            dialogShow('tidak ada folder aktif');
            return;
        }
        let nama = window.prompt('Nama folder:');
        if (!ent.folder.validasiNama(nama)) {
            dialogShow('nama invalid');
            return;
        }
        //validasi nama
        let fd = ent.folder.buatFolder(nama);
        ent.folder.tambahFolder(ent.folder.data.aktif, fd);
        ent.folder.renderFolder(ent.project.data.aktif.data, ent.folder.data.aktif, expl.listEl, expl.pathEl);
    }
    bukaFolder() {
        console.log('dipilih', ent.folder.data.dipilih);
        if (!ent.folder.data.dipilih) {
            console.log('kosong');
            dialogShow('tidak ada folder dipilih');
            return;
        }
        if ('...' == ent.folder.data.dipilih.nama) {
            if (ent.folder.data.aktif.nama == 'root')
                return;
            ent.folder.renderFolder(ent.project.data.aktif.data, ent.folder.data.aktif, expl.listEl, expl.pathEl);
            return;
        }
        if ('..' == ent.folder.data.dipilih.nama) {
            let folderObj = ent.folder.getFolderInduk(ent.project.data.aktif.data, ent.folder.data.aktif);
            if (folderObj) {
                ent.folder.renderFolder(ent.project.data.aktif.data, folderObj, expl.listEl, expl.pathEl);
                ent.folder.data.aktif = folderObj;
            }
            return;
        }
        ent.folder.renderFolder(ent.project.data.aktif.data, ent.folder.data.dipilih, expl.listEl, expl.pathEl);
        ent.folder.data.aktif = ent.folder.data.dipilih;
        ent.file.data.dipilih = null;
    }
    hapus() {
        let fd = ent.folder.data.dipilih;
        console.log(fd);
        if (!fd) {
            dialogShow('tidak ada folder dipilih');
            return;
        }
        if ((fd.nama == '..') || ('...' == fd.nama)) {
            dialogShow('folder tidak bisa dihapus');
            return;
        }
        if (fd.file.length > 0 || fd.folder.length > 2) {
            dialogShow('folder tidak kosong');
            return;
        }
        //
        let p = ent.folder.getFolderInduk(ent.project.data.aktif.data, ent.folder.data.dipilih);
        if (p) {
            let idx = p.folder.indexOf(ent.folder.data.dipilih);
            if (idx >= 0) {
                p.folder.splice(idx, 1);
                ent.folder.renderFolder(ent.project.data.aktif.data, ent.folder.data.aktif, expl.listEl, expl.pathEl);
            }
            else {
                console.warn('folder tidak ditemukan di parent');
                console.log("parent ", p);
                console.log("folder", ent.folder.data.dipilih);
            }
        }
        else {
            console.warn('parent tidak ketemu:');
            console.log('target', ent.folder.data.dipilih);
        }
    }
    rename() {
        if (!ent.folder.data.dipilih) {
            dialogShow('tidak ada folder dipilih');
            return;
        }
        let nama = window.prompt('nama', ent.folder.data.dipilih.nama);
        if (!nama) {
            dialogShow('nama tidak valid');
            return;
        }
        if (!ent.folder.validasiNama(nama)) {
            dialogShow('nama tidak valid');
            return;
        }
        ent.folder.data.dipilih.nama = nama;
        ent.folder.renderFolder(ent.project.data.aktif.data, ent.folder.data.aktif, expl.listEl, expl.pathEl);
    }
    render(cont) {
        cont.innerHTML = `
            <button class="tambah">baru</button>
            <button class="buka">buka</button>
            <button class="hapus">hapus</button>
            <button class="rename">rename</button>
        `;
        setKlik(cont, 'tambah', () => { this.tambahFolder(); });
        setKlik(cont, 'buka', () => { this.bukaFolder(); });
        setKlik(cont, 'hapus', () => { this.hapus(); });
        setKlik(cont, 'rename', () => { this.rename(); });
        menuEl.atas.detail.innerText = 'folder';
        menuEl.atas.balik.onclick = () => {
            beranda.render(cont);
        };
    }
}
export const folder = new Folder();
