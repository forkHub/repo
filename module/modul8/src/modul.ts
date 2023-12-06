type TModul = {
    id: number;
    nama: string;
    anak: number[];
    indukId: number;
}

class Id {
    private static _id = Date.now();

    static get id(): number {
        this._id++;
        return this._id;
    }
}

class ModulObj implements TModul {
    private _id: number = -1;
    private _nama: string = '';
    private _indukId: number = 0;

    readonly anak: number[] = [];

    constructor(id: number, nama: string, indukId: number) {
        this._id = id;
        this._nama = nama;
        this._indukId = indukId;
    }

    public get indukId(): number {
        return this._indukId;
    }
    public set indukId(value: number) {
        this._indukId = value;
    }


    get id(): number {
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }

    get nama(): string {
        return this._nama;
    }
    set nama(value: string) {
        this._nama = value;
    }
}

class Modul {
    // private static readonly _daftar: ModulObj[] = [];
    private static _dipilih: number = 0;
    private static _dibuka: number = 0;

    // private static readonly namaStorage: string = 'ha.be.modul.modul';

    public static get dibuka(): number {
        return Modul._dibuka;
    }
    public static set dibuka(value: number) {
        Modul._dibuka = value;
    }

    public static get dipilih(): number {
        return Modul._dipilih;
    }
    public static set dipilih(value: number) {
        Modul._dipilih = value;
    }

    // static toObj(obj: ModulObj): TModul {
    //     obj.indukId = obj.indukId || 0;
    //     return {
    //         id: obj.id,
    //         nama: obj.nama,
    //         indukId: obj.indukId,
    //         anak: obj.anak.slice()
    //     }
    // }

    // static fromObj(obj: TModul): ModulObj {
    //     return new ModulObj(obj.id, obj.nama, obj.indukId);
    // }

    // static simpan() {
    //     let daftar: TModul[] = [];
    //     this._daftar.forEach((item) => {
    //         daftar.push(this.toObj(item));
    //     })
    //     window.localStorage.setItem(this.namaStorage, JSON.stringify(daftar));
    // }








    // static baca(id: number): ModulObj {
    //     let hasil: ModulObj;

    //     this._daftar.forEach((item) => {
    //         if (item.id == id) {
    //             hasil = item;
    //         }
    //     })

    //     return hasil;
    // }

}

//Modul view
class ModulView {
    private static daftarEl: HTMLDivElement;

    static init() {
        this.daftarEl = document.querySelector('div.daftar');
    }

    private static buatModulIsiEl(m: ModulObj, p: HTMLDivElement): void {
        p.innerHTML = `
        <span>${m.nama}</span>
    `;
    }

    private static buatModulEl(m: ModulObj): HTMLDivElement {
        let el = document.createElement('div');
        el.setAttribute('data-id', m.id + '');
        el.setAttribute('onclick', `pilih(${m.id})`);
        this.buatModulIsiEl(m, el);
        return el;
    }

    static refresh(data: ModulObj[]): void {
        this.daftarEl.innerHTML = '';

        data.forEach((item) => {
            let el = this.buatModulEl(item);
            this.daftarEl.appendChild(el);
        })
    }

    static update(m: ModulObj): void {
        let el = this.daftarEl.querySelector(`[data-id="${m.id}"]`) as HTMLDivElement;
        this.buatModulIsiEl(m, el);
    }

    static tambah(m: ModulObj) {
        let el = this.buatModulEl(m);
        this.daftarEl.appendChild(el);
    }

    static hapus(m: number) {
        let el = this.daftarEl.querySelector(`[data-id="${m}"]`) as HTMLDivElement;
        this.daftarEl.removeChild(el);
    }

    static baca(id: number): HTMLDivElement {
        return this.daftarEl.querySelector(`[data-id="${id}"]`);
    }

}

class ModulService {
    private static readonly _daftar: ModulObj[] = [];
    private static readonly namaStorage: string = 'ha.be.modul.modul';

    static toObj(obj: ModulObj): TModul {
        obj.indukId = obj.indukId || 0;
        return {
            id: obj.id,
            nama: obj.nama,
            indukId: obj.indukId,
            anak: obj.anak.slice()
        }
    }

    static fromObj(obj: TModul): ModulObj {
        //TODO: default value
        if (obj.indukId == undefined) obj.indukId = 0;
        return new ModulObj(obj.id, obj.nama, obj.indukId);
    }

    static async baca(id: number): Promise<ModulObj> {
        let hasil: ModulObj;

        this._daftar.forEach((item) => {
            if (item.id == id) {
                hasil = item;
            }
        })

        return hasil;
    }

    static tambah(nama: string, indukId: number): ModulObj {
        let obj = new ModulObj(Id.id, nama, indukId);
        this._daftar.push(obj);
        return obj;
    }

    static init() {
        this.muat();
    }

    static muat() {

        while (this._daftar.length > 0) {
            this._daftar.pop();
        }

        try {
            let str = window.localStorage.getItem(this.namaStorage);
            console.log(str);
            let objAr: TModul[] = JSON.parse(str);
            console.log(objAr);
            objAr.forEach((item) => {
                console.log(item);
                this._daftar.push(this.fromObj(item));
            })
            console.log(this.getDaftar);
        }
        catch (e) {
            console.warn(e);
        }
    }

    static async simpan() {
        let daftar: TModul[] = [];
        this._daftar.forEach((item) => {
            daftar.push(this.toObj(item));
        })
        window.localStorage.setItem(this.namaStorage, JSON.stringify(daftar));
    }

    static async hapus(id: number): Promise<ModulObj> {
        let hasil: ModulObj;

        hasil = await this.baca(id);
        for (let i = 0; i < this._daftar.length; i++) {
            if (this._daftar[i].id == id) {
                hasil = this._daftar.splice(i, 1)[0];
                break;
            }
        }

        return hasil;
    }

    static getDaftar(): ModulObj[] {
        return this._daftar.slice();
    }

    static getByIndukId(indukId: number): ModulObj[] {
        return this._daftar.filter((item) => {
            return item.indukId == indukId
        })
    }

}
