namespace data {
    export const TY_MODUL: string = 'modul';
    export const TY_VARIABLE: string = 'variable';
    export const TY_FUNGSI: string = 'fungsi';

    export function hapusPilihan(): void {
        modul.hapusPilihan();
        variable.hapusPilihan();
        //fungdek //TODO:
    }

    export function typeDipilih(): string {
        if (modul.dipilih()) return 'modul';
        if (variable.dipilih()) return 'variable';
        //fungdek //TODO:
        return '';
    }
}

namespace variable {
    export const daftar: IVar[] = [];

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
                menu.ganti(menu.modul.el());
            }
        }



    }
}

namespace fungDek {

}

namespace param {
    export const daftar: IParam[] = [];

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
        //buat modul
        let modulObj: IModul = {
            id: ha.comp.Util.id(),
            dipilih: false,
            indukId: indukId,
            nama: nama,
            type: 'modul',
        }

        modulObj.view = new View(modulObj);
        // modulObj.view.elHtml.innerHTML = nama;

        daftar.push(modulObj);
        return modulObj;
    }

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
            this._elHtml.innerHTML = item.nama + '/' + item.id

            this._elHtml.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                console.log('modul clik ' + item.id);

                data.hapusPilihan();

                this.item.dipilih = true;
                this.item.view.elHtml.classList.add('dipilih');

                //reset menu
                menu.ganti(menu.modul.el());
            }
        }
    }
}