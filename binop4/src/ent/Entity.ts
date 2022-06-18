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
        md.hapusPilihan();
        variable.ent.hapusPilihan();
        fung.dek.ent.hapusPilihan();
    }

    //TODO: dipindah ke modul, kurang efektif
    export function typeDipilih(): string {
        if (md.dipilih()) return data.TY_MODUL;
        if (variable.ent.dipilih()) return data.TY_VARIABLE;
        if (fung.dek.ent.dipilih()) return data.TY_DEK_FUNGSI;
        return '';
    }

    export function simpan(): ISimpan {
        let simpanObj: ISimpan = {
            dekFung: fung.dek.ent.simpan(),
            modul: md.simpan(),
            var: variable.ent.simpan(),
            param: param.simpan(),
            exp: exp.ent.simpan(),
            stmt: stmt.ent.simpan(),
            value: value.ent.simpan(),
            ref: variable.ref.ent.simpan()
        }

        return simpanObj;
    }

    export function muat(obj: ISimpan): void {
        md.muat(obj.modul);
        variable.ent.muat(obj.var);
        fung.dek.ent.muat(obj.dekFung);
        param.muat(obj.param);
        stmt.ent.muat(obj.stmt);
        exp.ent.muat(obj.exp);
        value.ent.muat(obj.value);
        variable.ref.ent.muat(obj.ref);
    }

    //TODO: dipindah
    export function idDipilih(): number {
        if (md.dipilih()) return md.dipilih().id;
        if (variable.ent.dipilih()) return variable.ent.dipilih().id;
        if (fung.dek.ent.dipilih()) return fung.dek.ent.dipilih().id;

        //edit fungsi
        //TODO: param
        //TODO: stmt
        //TODO: arg
        return 0;
    }

    //TODO: dipindah
    export function typeById(id: number): string {
        let hasil: string;

        if (md.byId(id)) hasil = md.byId(id).type;
        if (fung.dek.ent.byId(id)) hasil = fung.dek.ent.byId(id).type;
        if (variable.ent.byId(id)) hasil = variable.ent.byId(id).type;
        if (param.byId(id)) hasil = param.byId(id).type;

        //stmt
        //arg

        return hasil;
    }

    //TODO: dipindah
    export function updateNama(id: number, nama: string): void {
        if (md.byId(id)) nama; //TODO:

    }
}

namespace fung.dek.ent {
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

                md.editor.menu.ganti(md.editor.menu.utama.view.elHtml as HTMLDivElement);
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
            item.view.attach(halModul.view.deklarasiFungsi);
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

namespace md {
    export const daftar: IModul[] = [];

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
            item.view.attach(halModul.halaman);

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
                md.editor.menu.ganti(md.editor.menu.utama.view.elHtml);
            }
        }
    }
}