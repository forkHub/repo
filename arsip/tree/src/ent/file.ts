export interface IFIle {
    nama: string;
}

export class FileObj implements IFIle {
    private _nama: string;

    public get nama(): string {
        return this._nama;
    }
    public set nama(value: string) {
        this._nama = value;
    }
}

class Data {
    dipilih: FileObj;
}

export class File {
    readonly data: Data = new Data();

    validasiNama(nama: string): boolean {
        if (!nama) return false;
        if (nama == '..') return false;
        if (nama == '...') return false;
        if (nama == 'root') return false;

        if (nama.indexOf('...') >= 0) return false;

        return true;
    }

    buat(nama: string): FileObj {
        let hasil: FileObj = new FileObj();
        hasil.nama = nama;
        return hasil;
    }

    buatHtml(fileP: FileObj): HTMLDivElement {
        let hasil: HTMLDivElement = document.createElement('div');
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
        }

        return hasil;
    }

    render(file: FileObj, cont: HTMLDivElement): void {
        cont.innerHTML = '';

        let el = this.buatHtml(file);
        cont.appendChild(el);
    }

    toObjs(f: FileObj[]): IFIle[] {
        let hasil: IFIle[] = [];
        f.forEach((item) => {
            hasil.push(this.toObj(item));
        })

        return hasil;
    }

    toObj(f: FileObj): IFIle {
        return {
            nama: f.nama
        }
    }

    fromObj(f: IFIle): FileObj {
        let h = new FileObj;
        h.nama = f.nama;
        return h;
    }

    fromObjs(f: IFIle[]): FileObj[] {
        let h: FileObj[] = [];

        f.forEach((item) => {
            item;//TODO:
        })

        return h;
    }
}
