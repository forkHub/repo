export class FileObj {
    _nama;
    get nama() {
        return this._nama;
    }
    set nama(value) {
        this._nama = value;
    }
}
class Data {
    dipilih;
}
export class File {
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
    buat(nama) {
        let hasil = new FileObj();
        hasil.nama = nama;
        return hasil;
    }
    buatHtml(fileP) {
        let hasil = document.createElement('div');
        hasil.classList.add('file-item');
        hasil.innerHTML = `
            <span>-</span> <span>${fileP.nama}</span>
        `;
        hasil.onclick = (e) => {
            e.stopPropagation();
            this.data.dipilih = fileP;
            document.body.querySelectorAll('div.file-item.dipilih').forEach((item) => {
                item.classList.remove('dipilih');
            });
            hasil.classList.add('dipilih');
        };
        return hasil;
    }
    render(file, cont) {
        cont.innerHTML = '';
        let el = this.buatHtml(file);
        cont.appendChild(el);
    }
    toObjs(f) {
        let hasil = [];
        f.forEach((item) => {
            hasil.push(this.toObj(item));
        });
        return hasil;
    }
    toObj(f) {
        return {
            nama: f.nama
        };
    }
    fromObj(f) {
        let h = new FileObj;
        h.nama = f.nama;
        return h;
    }
    fromObjs(f) {
        let h = [];
        f.forEach((item) => {
            item; //TODO:
        });
        return h;
    }
}
