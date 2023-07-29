// import { root } from "../index.js";
import { ent } from "./ent.js";
import { FileObj, IFIle } from "./file.js";

export interface IFolder {
    nama: string;
    folder: IFolder[];
    file: IFIle[];
}

export class FolderObj implements IFolder {
    private _nama: string;
    public get nama(): string {
        return this._nama;
    }
    public set nama(value: string) {
        this._nama = value;
    }
    readonly folder: FolderObj[] = [];
    readonly file: FileObj[] = [];
}

class Data {
    private _aktif: FolderObj;

    public get aktif(): FolderObj {
        return this._aktif;
    }
    public set aktif(value: FolderObj) {
        this._aktif = value;
    }
    private _dipilih: FolderObj;
    public get dipilih(): FolderObj {
        return this._dipilih;
    }
    public set dipilih(value: FolderObj) {
        this._dipilih = value;
    }
}

export class Folder {
    readonly data: Data = new Data();

    validasiNama(nama: string): boolean {
        if (!nama) return false;
        if (nama == '..') return false;
        if (nama == '...') return false;
        if (nama == 'root') return false;

        if (nama.indexOf('...') >= 0) return false;

        return true;
    }

    tambahHelper(folder: FolderObj): void {

        let ada = false;
        folder.folder.forEach((item) => {
            if (item.nama == '..') ada = true;
            if (item.nama == '...') ada = true;
        });

        if (folder.nama == '') ada = true;
        if (folder.nama == '..') ada = true;
        if (folder.nama == '...') ada = true;

        if (!ada) {
            this.tambahFolder(folder, this.buatFolder('..'));
            this.tambahFolder(folder, this.buatFolder('...'));
        }
    }

    tambahFolder(folderSrc: FolderObj, folderBaru: FolderObj): void {
        // console.log('tambah folder');

        folderSrc.folder.push(folderBaru);
        this.tambahHelper(folderBaru);
    }

    tambahFile(folder: FolderObj, file: FileObj): void {
        folder.file.push(file);
    }

    getFolderInduk(folderSrc: FolderObj, folderTrg: FolderObj): FolderObj {
        let hasil: FolderObj;

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

    getFileInduk(folderSrc: FolderObj, file: FileObj): FolderObj {
        let hasil: FolderObj;

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

    buatFolder(nama: string): FolderObj {
        let hasil: FolderObj = new FolderObj();
        hasil.nama = nama;
        return hasil;
    }

    buatFolderHtml(folderP: FolderObj): HTMLDivElement {
        let hasil: HTMLDivElement = document.createElement('div');
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
        }

        return hasil;
    }

    renderFolder(root: FolderObj, folder: FolderObj, cont: HTMLDivElement, pathCont: HTMLDivElement): void {
        cont.innerHTML = '';

        //populate parent
        let p: FolderObj = folder;
        let path = folder.nama
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
        })
    }

    toObjs(f: FolderObj[]): IFolder[] {
        let hasil: IFolder[] = [];

        f.forEach((item) => {
            hasil.push({
                nama: item.nama,
                folder: this.toObjs(item.folder),
                file: ent.file.toObjs(item.file)
            })
        })

        return hasil;
    }

    toObj(f: FolderObj): IFolder {
        return {
            nama: f.nama,
            folder: this.toObjs(f.folder),
            file: ent.file.toObjs(f.file)
        }
    }

    fromObj(f: IFolder): FolderObj {
        let h: FolderObj = new FolderObj();

        ent.file.fromObjs(f.file).forEach((item) => {
            h.file.push(item);
        });

        f.folder.forEach((item) => {
            h.folder.push(this.fromObj(item));
        })

        h.nama = f.nama;

        return h;
    }
}
