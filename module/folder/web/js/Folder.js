var ha;
(function (ha) {
    class Folder {
        constructor(id, nama, indukId) {
            this._id = 0;
            this._nama = '';
            this._metaData = [];
            this._sub = [];
            this._indukId = 0;
            this._populated = false;
            this.fileData = [];
            this.subData = [];
            this._id = id;
            this._indukId = indukId;
            this._nama = nama;
        }
        static buatFolder(path) {
            let pathAr = path.split('/');
            console.log('buat folder, path: ' + path);
            console.log(pathAr);
            let folder = this._root;
            for (let i = 0; i < pathAr.length; i++) {
                let nama = pathAr[i];
                console.log('buat folder, nama: ' + nama);
                let sub = Folder.getSubFolderByName(folder, nama);
                if (sub) {
                    throw Error('folder sudah ada');
                }
                else {
                    folder = Folder.buatSubFolder(ha.comp.Id.id, nama, folder.id);
                }
            }
        }
        static buatFile(path, namaFile, isi) {
            let pathAr = path.split('/');
            let folder = Folder.populate(this._root);
            console.log('buat file: ');
            console.log(pathAr);
            for (let i = 0; i < pathAr.length; i++) {
                let nama = pathAr[i];
                folder = Folder.getSubFolderByName(folder, nama, true);
            }
            ;
            let file = Folder.getSubFileByName(folder, pathAr[pathAr.length - 1]);
            if (file) {
                throw Error('file sudah ada, path ' + path);
            }
            else {
                console.log('buat sub file, folder: ' + folder.nama + '/nama file: ' + namaFile + '/isi: ' + isi);
                this.buatSubFile(folder, namaFile, isi);
            }
            return file;
        }
        static bacaFile(path) {
            let pathAr = path.split('/');
            let hasil = '';
            let folder = Folder.populate(this._root);
            for (let i = 0; i < pathAr.length - 1; i++) {
                let nama = pathAr[i];
                folder = Folder.getSubFolderByName(folder, nama, true);
            }
            ;
            let file = Folder.getSubFileByName(folder, pathAr[pathAr.length - 1], true);
            hasil = file.isi;
            return hasil;
        }
        static getSubFileByName(folder, nama, error = false) {
            let hasil;
            Folder.populate(folder);
            folder.fileData.forEach((file) => {
                if (file.nama == nama) {
                    hasil = file;
                }
            });
            if (!hasil && error) {
                throw Error('file not found: ' + nama + '/induk: ' + folder.nama);
            }
            return hasil;
        }
        static getSubFolderByName(folder, nama, error = false) {
            let hasil;
            console.group('get sub by name: ' + nama);
            Folder.populate(folder);
            folder.subData.forEach((item) => {
                if (item.nama == nama) {
                    hasil = item;
                }
            });
            if (!hasil && error) {
                throw Error('folder tidak ada, folder ' + nama + '/induk ' + folder.nama);
            }
            console.log('hasil: ' + hasil);
            console.groupEnd();
            return hasil;
        }
        static getFileById(id) {
            let hasil;
            this.daftarFile.forEach((file) => {
                if (file.id == id) {
                    hasil = file;
                }
            });
            return hasil;
        }
        static populate(folder) {
            if (folder.populated)
                return folder;
            folder.sub.forEach((item) => {
                folder.subData.push(Folder.getFolderById(item));
            });
            folder.file.forEach((id) => {
                folder.fileData.push(Folder.getFileById(id));
            });
            return folder;
        }
        static getFolderById(id, error = false) {
            let hasil;
            this.daftar.forEach((item) => {
                if (item.id == id) {
                    hasil = item;
                }
            });
            if (null == hasil && error) {
                throw Error('id tidak ketemu: ' + id);
            }
            return hasil;
        }
        static buatSubFolder(id, nama, indukId) {
            let hasil;
            console.group('buat sub folder, nama: ' + nama + '/induk id: ' + indukId);
            let induk = Folder.populate(Folder.getFolderById(indukId));
            let sub = Folder.getSubFolderByName(induk, nama);
            if (sub) {
                throw Error('folder sudah ada: ' + nama + '/parent: ' + induk.nama);
            }
            hasil = new Folder(id, nama, indukId);
            this.daftar.push(hasil);
            induk = this.getFolderById(indukId);
            induk.sub.push(hasil.id);
            console.log('parent ' + induk.sub);
            console.groupEnd();
            return hasil;
        }
        static buatSubFile(induk, namaFile, isi) {
            let file;
            let subFile = Folder.getSubFileByName(induk, namaFile);
            if (subFile) {
                throw Error('file sudah ada: ' + subFile.nama);
            }
            file = {
                id: ha.comp.Id.id,
                nama: namaFile,
                isi: isi,
                indukId: induk.id,
            };
            induk.file.push(file.id);
            this.daftarFile.push(file);
        }
        static init() {
            this._root = new Folder(ha.comp.Id.id, 'root', 0);
            this.daftar.push(this._root);
        }
        get populated() {
            return this._populated;
        }
        set populated(value) {
            this._populated = value;
        }
        static get root() {
            return Folder._root;
        }
        get indukId() {
            return this._indukId;
        }
        set indukId(value) {
            this._indukId = value;
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
        get file() {
            return this._metaData;
        }
        set file(value) {
            this._metaData = value;
        }
        get sub() {
            return this._sub;
        }
        set sub(value) {
            this._sub = value;
        }
    }
    Folder.daftar = [];
    Folder.daftarFile = [];
    ha.Folder = Folder;
})(ha || (ha = {}));
