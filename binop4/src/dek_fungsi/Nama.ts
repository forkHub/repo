//nama buat edit dek fungsi
//gak disimpan di db
//cuman dibuat sekali
namespace nama {
    const daftar: INama[] = [];

    //Buat dan pasang view
    export function buat(nama: string, indukId: number): INama {

        let namaObj: INama = {
            id: ha.comp.Util.id(),
            dipilih: false,
            diedit: false,
            indukId: indukId,
            nama: nama,
            type: data.TY_NAMA,
        }

        namaObj.view = new View(namaObj);

        daftar.push(namaObj);
        return namaObj;
    }

    export function hapusPilihan(): void {
        daftar.forEach((item: INama) => {
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

        throw Error('nama hapus error');
    }

    export function byId(id: number): INama {
        for (let i: number = 0; i < daftar.length; i++) {
            if (daftar[i].id == id) return daftar[i];
        }

        return null;
    }

    export function dipilih(): INama {
        let hasil: INama;

        daftar.forEach((item: INama) => {
            if (item.dipilih) {
                hasil = item;
            }
        })

        return hasil;
    }

    export function klikUpdate(namaObj: INama): void {
        let nama: string = window.prompt('nama');

        if (nama) {
            let dekFungObj: IFungDek = fung.dek.byId(namaObj.indukId);
            dekFungObj.nama = nama;
            namaObj.view.elHtml.innerHTML = nama;
        }
    }

    export class View extends ha.comp.BaseComponent {
        private _item: INama;
        public get item(): INama {
            return this._item;
        }
        public set item(value: INama) {
            this._item = value;
        }

        constructor(item: INama) {
            super();
            this.item = item;
            this._elHtml = this.getTemplate('div.nama-item');
            this._elHtml.innerHTML = item.nama;

            this._elHtml.onclick = (e: MouseEvent) => {
                e.stopPropagation();

                data.hapusPilihan();

                this.item.dipilih = true;
                this.item.view.elHtml.classList.add('dipilih');

                menu.ganti(menu.utama.el());
            }
        }
    }
}