namespace data {
    export const TY_MODUL: string = 'modul';
    export const TY_VARIABLE: string = 'variable';
    export const TY_DEK_FUNGSI: string = 'dek-fungsi';
    export const TY_NAMA: string = 'nama';
    export const TY_PARAM: string = 'param';
    export const TY_STMT: string = 'stmt';
    export const TY_VALUE: string = 'value';
    export const TY_EXP: string = 'exp';

    export const STMT_VAR_ISI: string = 'var isi';

    export var idEdit: number = 0;

    //TODO: dipindah ke modul, kurang efektif
    export function hapusPilihan(): void {
        modul.hapusPilihan();
        variable.hapusPilihan();
        fung.dek.hapusPilihan();
        // param.hapusPilihan();
        // nama.hapusPilihan();
    }

    //TODO: dipindah ke modul, kurang efektif
    export function typeDipilih(): string {
        if (modul.dipilih()) return data.TY_MODUL;
        if (variable.dipilih()) return data.TY_VARIABLE;
        if (fung.dek.dipilih()) return data.TY_DEK_FUNGSI;
        // if (nama.dipilih()) return data.TY_NAMA;
        return '';
    }

    export function simpan(): ISimpan {
        // let hasil: string = '';

        let simpanObj: ISimpan = {
            dekFung: fung.dek.simpan(),
            modul: modul.simpan(),
            var: variable.simpan(),
            param: param.simpan()
        }

        // hasil = JSON.stringify(simpanObj);

        return simpanObj;
    }

    export function muat(obj: ISimpan): void {
        modul.muat(obj.modul);
        variable.muat(obj.var);
        fung.dek.muat(obj.dekFung);
        param.muat(obj.param);
    }

    //TODO: dipindah
    export function idDipilih(): number {
        if (modul.dipilih()) return modul.dipilih().id;
        if (variable.dipilih()) return variable.dipilih().id;
        if (fung.dek.dipilih()) return fung.dek.dipilih().id;

        //edit fungsi
        //TODO: param
        //TODO: stmt
        //TODO: arg
        return 0;
    }

    export function typeById(id: number): string {
        let hasil: string;

        if (modul.byId(id)) hasil = modul.byId(id).type;
        if (fung.dek.byId(id)) hasil = fung.dek.byId(id).type;
        if (variable.byId(id)) hasil = variable.byId(id).type;
        if (param.byId(id)) hasil = param.byId(id).type;

        //stmt
        //arg

        return hasil;
    }

    //TODO: dipindah
    export function updateNama(id: number, nama: string): void {
        if (modul.byId(id)) nama; //TODO:

    }
}

namespace variable {
    const daftar: IVar[] = [];

    export function byIndukId(indukId: number): IVar[] {
        let hasil: IVar[];

        daftar.forEach((item: IVar) => {
            if (item.indukId == indukId) {
                hasil.push(item);
            }
        });

        return hasil;
    }

    export function hapusPilihan(): void {
        daftar.forEach((item: IVar) => {
            item.dipilih = false;
            item.view.elHtml.classList.remove('dipilih');
        })
    }

    export function buat(nama: string, indukId: number): IVar {
        //buat modul
        let variable: IVar = {
            id: ha.comp.Util.id(),
            dipilih: false,
            diedit: false,
            indukId: indukId,
            nama: nama,
            type: 'variable',
        }

        variable.view = new View(variable);

        daftar.push(variable);
        return variable;
    }

    export function hapus(id: number): void {
        for (let i: number = 0; i < daftar.length; i++) {
            if (daftar[i].id == id) {
                daftar[i].view.detach();
                daftar[i].view.item = null;
                daftar[i].view = null;
                daftar.splice(i, 1);
                return;
            }
        }

        throw Error('variable hapus error');
    }

    export function byId(id: number): IVar {
        for (let i: number = 0; i < daftar.length; i++) {
            if (daftar[i].id == id) return daftar[i];
        }

        return null;
    }

    export function dipilih(): IVar {
        let hasil: IVar;

        daftar.forEach((item: IVar) => {
            if (item.dipilih) {
                hasil = item;
            }
        })

        return hasil;
    }

    export class View extends ha.comp.BaseComponent {
        private _item: IVar;
        public get item(): IVar {
            return this._item;
        }
        public set item(value: IVar) {
            this._item = value;
        }

        get nama(): HTMLDivElement {
            return this.getEl('span.nama') as HTMLDivElement;
        }

        constructor(variable: IVar) {
            super();
            this._item = variable;
            this._elHtml = ha.comp.Util.getTemplate('div.var-item');
            // this._elHtml.innerHTML = variable.nama;
            this.nama.innerHTML = variable.nama

            this._elHtml.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                // console.log('variable clik');
                // console.log(this._item);

                data.hapusPilihan();

                this.item.dipilih = true;
                this.item.view.elHtml.classList.add('dipilih');

                //reset menu
                modul.editor.menu.ganti(modul.editor.menu.utama.view.elHtml);
            }
        }



    }

    export function simpan(): IVar[] {
        let ar: IVar[] = [];

        daftar.forEach((item: IVar) => {
            let obj: IVar = {
                dipilih: false,
                diedit: false,
                id: item.id,
                indukId: item.indukId,
                nama: item.nama,
                type: item.type,
            }
            ar.push(obj);
        });

        return ar;
    }

    //TODO: dipindah
    export function muat(obj: IVar[]): void {
        while (daftar.length > 0) {
            hapus(daftar[0].id);
        }

        obj.forEach((item: IVar) => {
            item.view = new View(item);
            item.view.attach(modul.editor.view.variable);
            daftar.push(item);
        })
    }

}

namespace fung.dek {
    const daftar: IFungDek[] = [];

    export function validasiNama(nama: string): boolean {
        //TODO: validasi nama;
        nama;
        return true;
    }

    export function diedit(): IFungDek {

        for (let i: number = 0; i < daftar.length; i++) {
            if (daftar[i].diedit) return daftar[i];
        }

        throw Error('tidak ada deklarasi fungsi diedit');
    }

    export function hapusDiedit(): void {
        daftar.forEach((item: IFungDek) => {
            item.diedit = false;
        })
    }

    //Buat dan pasang view
    export function buat(nama: string, indukId: number): IFungDek {

        let modulObj: IFungDek = {
            id: ha.comp.Util.id(),
            dipilih: false,
            diedit: false,
            indukId: indukId,
            nama: nama,
            type: data.TY_DEK_FUNGSI,
        }

        modulObj.view = new View(modulObj);

        daftar.push(modulObj);
        return modulObj;
    }

    export function hapusPilihan(): void {
        daftar.forEach((item: IFungDek) => {
            item.dipilih = false;
            item.view.elHtml.classList.remove('dipilih');
        })
    }

    //TODO: hapus param, hapus stmt, hapus
    export function hapus(id: number): void {
        for (let i: number = 0; i < daftar.length; i++) {
            if (daftar[i].id == id) {
                daftar[i].view.detach();
                daftar[i].view.item = null;
                daftar[i].view = null;
                daftar.splice(i, 1);
                return;
            }
        }

        throw Error('modul hapus error');
    }

    export function byId(id: number): IFungDek {
        for (let i: number = 0; i < daftar.length; i++) {
            if (daftar[i].id == id) return daftar[i];
        }

        return null;
    }

    export function dipilih(): IFungDek {
        let hasil: IFungDek;

        daftar.forEach((item: IFungDek) => {
            if (item.dipilih) {
                hasil = item;
            }
        })

        return hasil;
    }

    export class View extends ha.comp.BaseComponent {
        private _item: IFungDek;
        public get item(): IFungDek {
            return this._item;
        }
        public set item(value: IFungDek) {
            this._item = value;
        }

        update(): void {
            this._elHtml.innerHTML = 'fungsi ' + this.item.nama + '()';
        }

        constructor(item: IFungDek) {
            super();
            this.item = item;
            this._elHtml = this.getTemplate('div.fung-dek-item');
            this._elHtml.innerHTML = 'fungsi ' + item.nama + '()';

            this._elHtml.onclick = (e: MouseEvent) => {
                e.stopPropagation();

                data.hapusPilihan();

                this.item.dipilih = true;
                this.item.view.elHtml.classList.add('dipilih');

                modul.editor.menu.ganti(modul.editor.menu.utama.view.elHtml as HTMLDivElement);
            }
        }
    }

    export function simpan(): IFungDek[] {
        let ar: IFungDek[] = [];

        daftar.forEach((item: IFungDek) => {
            let obj: IFungDek = {
                dipilih: false,
                diedit: false,
                id: item.id,
                indukId: item.indukId,
                nama: item.nama,
                type: item.type,
            }
            ar.push(obj);
        });

        return ar;
    }

    export function muat(obj: IFungDek[]): void {
        while (daftar.length > 0) {
            hapus(daftar[0].id);
        }

        obj.forEach((item: IFungDek) => {
            item.view = new View(item);
            item.view.attach(modul.editor.view.deklarasiFungsi);
            daftar.push(item);
        })
    }

}

namespace param {
    const daftar: IParam[] = [];

    export function byIndukId(indukId: number): IParam[] {
        let hasil: IParam[] = [];

        daftar.forEach((item: IParam) => {
            if (item.indukId == indukId) {
                hasil.push(item);
            }
        });

        return hasil;
    }

    export function byId(id: number): IParam {
        for (let i: number = 0; i < daftar.length; i++) {
            if (daftar[i].id == id) return daftar[i];
        }

        return null;
    }

    export function buat(indukId: number, nama: string): IParam {
        let hasil: IParam = {
            id: ha.comp.Util.id(),
            indukId: indukId,
            nama: nama,
            diedit: false,
            dipilih: false,
            type: data.TY_PARAM
        }

        daftar.push(hasil);

        return hasil;
    }

    export function checkDouble(indukId: number, nama: string): boolean {
        indukId;
        nama;
        return false; //TODO:
    }

    export function hapus(id: number): void {
        for (let i: number = 0; i < daftar.length; i++) {
            if (daftar[i].id == id) {
                daftar.splice(i, 1);
                return;
            }
        }

        throw Error('hapus gagal, id ' + id);
    }

    export function simpan(): IParam[] {
        let ar: IParam[] = [];

        daftar.forEach((item: IParam) => {
            let obj: IParam = {
                dipilih: false,
                diedit: false,
                id: item.id,
                indukId: item.indukId,
                nama: item.nama,
                type: item.type
            }
            ar.push(obj);
        });

        return ar;

    }

    export function muat(obj: IParam[] = []): void {
        while (daftar.length > 0) {
            hapus(daftar[0].id);
        }

        obj.forEach((item: IParam) => {
            daftar.push(item);
        });
    }
}

namespace modul {
    const daftar: IModul[] = [];

    //TODO: hapus
    export function hapusPilihan(): void {
        daftar.forEach((item: IModul) => {

            // if (item.dipilih) {
            //     console.log('item dipilih, id ' + item.id);
            // }

            item.dipilih = false;
            item.view.elHtml.classList.remove('dipilih');
        })
    }

    export function hapus(id: number): void {
        for (let i: number = 0; i < daftar.length; i++) {
            if (daftar[i].id == id) {
                daftar[i].view.detach();
                daftar[i].view.item = null;
                daftar[i].view = null;
                daftar.splice(i, 1);
                return;
            }
        }

        throw Error('modul hapus error');
    }

    export function byId(id: number): IModul {
        for (let i: number = 0; i < daftar.length; i++) {
            if (daftar[i].id == id) return daftar[i];
        }

        return null;
    }

    //TODO: pindah
    export function dipilih(): IModul {
        let hasil: IModul;

        daftar.forEach((item: IModul) => {
            if (item.dipilih) {
                hasil = item;
            }
        })

        return hasil;
    }

    export function buat(nama: string, indukId: number): IModul {
        let modulObj: IModul = {
            id: ha.comp.Util.id(),
            dipilih: false,
            diedit: false,
            indukId: indukId,
            nama: nama,
            type: 'modul',
        }

        modulObj.view = new View(modulObj);

        daftar.push(modulObj);
        return modulObj;
    }

    export function simpan(): IModul[] {
        let ar: IModul[] = [];

        daftar.forEach((item: IModul) => {
            let obj: IModul = {
                dipilih: false,
                diedit: false,
                id: item.id,
                indukId: item.indukId,
                nama: item.nama,
                type: item.type,
            }
            ar.push(obj);
        });

        return ar;
    }

    export function muat(obj: IModul[]): void {
        while (daftar.length > 0) {
            hapus(daftar[0].id);
        }

        obj.forEach((item: IModul) => {

            //TODO: dihapus
            item.view = new View(item);
            item.view.attach(modul.editor.view.halaman);

            daftar.push(item);
        });
    }

    //TODO: pindah
    export class View extends ha.comp.BaseComponent {
        private _item: IModul;
        public get item(): IModul {
            return this._item;
        }
        public set item(value: IModul) {
            this._item = value;
        }

        constructor(item: IModul) {
            super();
            this.item = item;
            this._elHtml = this.getTemplate('div.modul-item');
            this._elHtml.innerHTML = 'modul:' + item.nama

            this._elHtml.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                console.log('modul clik ' + item.id);

                data.hapusPilihan();

                this.item.dipilih = true;
                this.item.view.elHtml.classList.add('dipilih');

                //reset menu
                modul.editor.menu.ganti(modul.editor.menu.utama.view.elHtml);
            }
        }
    }
}

