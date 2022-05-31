namespace data {
    export const TY_MODUL: string = 'modul';
    export const TY_VARIABLE: string = 'variable';
    export const TY_DEK_FUNGSI: string = 'dek-fungsi';
    export const TY_NAMA: string = 'nama';


    //TODO: dipindah
    export function hapusPilihan(): void {
        modul.hapusPilihan();
        variable.hapusPilihan();
        fung.dek.hapusPilihan();
        param.hapusPilihan();
        // nama.hapusPilihan();
    }

    //TODO: dipindah
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
            var: variable.simpan()
        }

        // hasil = JSON.stringify(simpanObj);

        return simpanObj;
    }

    export function muat(obj: ISimpan): void {
        modul.muat(obj.modul);
        variable.muat(obj.var);
        fung.dek.muat(obj.dekFung);
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
                menu.ganti(menu.utama.el());
            }
        }



    }

    export function simpan(): IVar[] {
        let ar: IVar[] = [];

        daftar.forEach((item: IVar) => {
            let obj: IVar = {
                dipilih: item.dipilih,
                diedit: item.diedit,
                id: item.id,
                indukId: item.indukId,
                nama: item.nama,
                type: item.type,
            }
            ar.push(obj);
        });

        return ar;
    }

    export function muat(obj: IVar[]): void {
        while (daftar.length > 0) {
            hapus(daftar[0].id);
        }

        obj.forEach((item: IVar) => {
            item.view = new View(item);
            item.view.attach(modul.hal.halaman());
            daftar.push(item);
        })
    }

}

namespace fung.dek {
    const daftar: IFungDek[] = [];

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

                menu.ganti(menu.utama.el());
            }
        }
    }

    export function simpan(): IFungDek[] {
        let ar: IFungDek[] = [];

        daftar.forEach((item: IFungDek) => {
            let obj: IFungDek = {
                dipilih: item.dipilih,
                diedit: item.diedit,
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
            item.view.attach(modul.hal.halaman());
            daftar.push(item);
        })
    }


}

namespace param {
    const daftar: IParam[] = [];

    export function byIndukId(indukId: number): IParam[] {
        let hasil: IParam[];

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

    export function hapusPilihan(): void {
        daftar.forEach((item: IParam) => {
            item.dipilih = false;
            item.view.elHtml.classList.remove('dipilih');
        })
    }

    export class View extends ha.comp.BaseComponent {
        private _item: IParam;
        public get item(): IParam {
            return this._item;
        }
        public set item(value: IParam) {
            this._item = value;
        }

        constructor(item: IParam) {
            super();
            this.item = item;
            this._elHtml = this.getTemplate('div.param-item');
            this._elHtml.innerHTML = item.nama;

            this._elHtml.onclick = (e: MouseEvent) => {
                e.stopPropagation();

                param.hapusPilihan();

                this.item.dipilih = true;
                this.item.view.elHtml.classList.add('dipilih');
            }
        }
    }
}

namespace modul {
    const daftar: IModul[] = [];

    export function diedit(): IModul {
        let hasil: IModul;

        daftar.forEach((item: IModul) => {
            if (item.diedit) {
                hasil = item;
            }
        })

        return hasil;
    }

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
                dipilih: item.dipilih,
                diedit: item.diedit,
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
            item.view.attach(hal.halaman());

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
                menu.ganti(menu.utama.el());
            }
        }
    }
}

namespace stmt {

}