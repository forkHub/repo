//TODO: view dipisah
namespace variable.ent {
    const daftar: IVar[] = [];

    export function daftarVar(): IVar[] {
        return daftar.slice();
    }

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