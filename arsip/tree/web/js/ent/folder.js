// import { root } from "../index.js";
import { ent } from "./ent.js";
export class FolderObj {
    _nama;
    get nama() {
        return this._nama;
    }
    set nama(value) {
        this._nama = value;
    }
    folder = [];
    file = [];
}
class Data {
    _aktif;
    get aktif() {
        return this._aktif;
    }
    set aktif(value) {
        this._aktif = value;
    }
    _dipilih;
    get dipilih() {
        return this._dipilih;
    }
    set dipilih(value) {
        this._dipilih = value;
    }
}
export class Folder {
    data = new Data();
    validasiNama(nama) {
        if (!nama)
            return false;
        if (nama == '..')
            return false;
        if (nama == '...')
            return false;
        if (nama == 'root')
            return false;
        if (nama.indexOf('...') >= 0)
            return false;
        return true;
    }
    tambahHelper(folder) {
        let ada = false;
        folder.folder.forEach((item) => {
            if (item.nama == '..')
                ada = true;
            if (item.nama == '...')
                ada = true;
        });
        if (folder.nama == '')
            ada = true;
        if (folder.nama == '..')
            ada = true;
        if (folder.nama == '...')
            ada = true;
        if (!ada) {
            this.tambahFolder(folder, this.buatFolder('..'));
            this.tambahFolder(folder, this.buatFolder('...'));
        }
    }
    tambahFolder(folderSrc, folderBaru) {
        // console.log('tambah folder');
        folderSrc.folder.push(folderBaru);
        this.tambahHelper(folderBaru);
    }
    tambahFile(folder, file) {
        folder.file.push(file);
    }
    getFolderInduk(folderSrc, folderTrg) {
        let hasil;
        for (let i = 0; i < folderSrc.folder.length; i++) {
            let item = folderSrc.folder[i];
            if (item == folderTrg) {
                console.groupEnd();
                return folderSrc;
            }
        }
        //cari di anak
        for (let i = 0; i < folderSrc.folder.length; i++) {
            let item = folderSrc.folder[i];
            if (item.nama != '..' && item.nama != '...') {
                hasil = this.getFolderInduk(item, folderTrg);
                if (hasil) {
                    console.groupEnd();
                    return hasil;
                }
            }
        }
        console.groupEnd();
        return null;
    }
    getFileInduk(folderSrc, file) {
        let hasil;
        console.group('get file induk');
        console.log('folder', folderSrc);
        console.log('file', file);
        //cari di current
        for (let i = 0; i < folderSrc.file.length; i++) {
            let item = folderSrc.file[i];
            if (item == file) {
                return folderSrc;
            }
        }
        //cari di anak
        for (let i = 0; i < folderSrc.folder.length; i++) {
            let item = folderSrc.folder[i];
            if (item.nama != '..' && item.nama != '...') {
                hasil = this.getFileInduk(item, file);
                if (hasil) {
                    console.groupEnd();
                    return hasil;
                }
            }
        }
        console.groupEnd();
        return null;
    }
    buatFolder(nama) {
        let hasil = new FolderObj();
        hasil.nama = nama;
        return hasil;
    }
    buatFolderHtml(folderP) {
        let hasil = document.createElement('div');
        hasil.classList.add('folder-item');
        hasil.innerHTML = `
        <span>[+]</span> <span>${folderP.nama} (${Math.max(folderP.folder.length - 2, 0)}/${folderP.file.length})</span>
    `;
        hasil.onclick = (e) => {
            e.stopPropagation();
            this.data.dipilih = folderP;
            document.body.querySelectorAll('div.folder-item.dipilih').forEach((item) => {
                item.classList.remove('dipilih');
            });
            hasil.classList.add('dipilih');
        };
        return hasil;
    }
    renderFolder(root, folder, cont, pathCont) {
        cont.innerHTML = '';
        //populate parent
        let p = folder;
        let path = folder.nama;
        let ulang = true;
        while (ulang) {
            p = this.getFolderInduk(root, p);
            if (p) {
                path = p.nama + '/' + path;
            }
            else {
                ulang = false;
            }
        }
        pathCont.innerText = path;
        folder.folder.forEach((item) => {
            let el = this.buatFolderHtml(item);
            cont.appendChild(el);
        });
        folder.file.forEach((item) => {
            cont.appendChild(ent.file.buatHtml(item));
        });
    }
    toObjs(f) {
        let hasil = [];
        f.forEach((item) => {
            hasil.push({
                nama: item.nama,
                folder: this.toObjs(item.folder),
                file: ent.file.toObjs(item.file)
            });
        });
        return hasil;
    }
    toObj(f) {
        return {
            nama: f.nama,
            folder: this.toObjs(f.folder),
            file: ent.file.toObjs(f.file)
        };
    }
    fromObj(f) {
        let h = new FolderObj();
        ent.file.fromObjs(f.file).forEach((item) => {
            h.file.push(item);
        });
        f.folder.forEach((item) => {
            h.folder.push(this.fromObj(item));
        });
        h.nama = f.nama;
        return h;
    }
}
