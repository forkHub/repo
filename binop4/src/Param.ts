namespace param.update {
    const daftar: Item[] = [];

    export function hapusPilihan(): void {
        daftar.forEach((item: Item) => {
            item.hapusPilihan();
        })
    }

    export function dipilih(): IParam {
        for (let i: number = 0; i < daftar.length; i++) {
            if (daftar[i].dipilih) return daftar[i].item;
        }

        throw Error('tidak ada item dipilih');
    }

    export function tambah(): void {
        let fungObj: IFungDek = fung.dek.diedit();
        let nama: string = window.prompt('nama', 'param');

        console.log('tambah param klik');

        if (nama) {
            if (param.checkDouble(fungObj.id, nama) == false) {
                let paramObj: IParam = param.buat(fungObj.id, nama);
                let itemView: Item = new Item(paramObj);
                itemView.attach(view.daftar);

                daftar.push(itemView);
            }
            else {
                ha.comp.dialog.tampil('nama double, nama: ' + nama);
            }
        }
        else {
            console.log('nama kosong');
        }

    }

    class View extends ha.comp.BaseComponent {
        constructor() {
            super();
            this._template = `
                <div class='back padding'>
                    <div class='daftar box padding back-putih'>
                    </div>
                    <div class='padding'>
                        <button class='tambah'>tambah</button>
                        <button class='tutup'>tutup</button>
                    </div>
                </div>
            `;
            this.build();
            this.tambahTbl.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                param.update.tambah();
            }

            this.tutupTbl.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                this.detach();
            }


        }

        get daftar(): HTMLDivElement {
            return this.getEl('div.daftar') as HTMLDivElement;
        }

        get tambahTbl(): HTMLButtonElement {
            return this.getEl('button.tambah') as HTMLButtonElement;
        }

        get tutupTbl(): HTMLButtonElement {
            return this.getEl('button.tutup') as HTMLButtonElement;
        }
    }

    class Item extends ha.comp.BaseComponent {
        private _item: IParam;
        private _dipilih: boolean;

        public get dipilih(): boolean {
            return this._dipilih;
        }
        public set dipilih(value: boolean) {
            this._dipilih = value;
        }

        public get item(): IParam {
            return this._item;
        }

        constructor(item: IParam) {
            super();
            this._template = `
                <div class='item padding row'>
                    <div class='flex-grow-1'>
                        <span class='nama'></span>
                    </div>
                    <div>
                        <button class='edit'>edit</button>
                        <button class='hapus'>hapus</button>
                    </div>
                </div>
            `;
            this.build();
            this._item = item;
            this.nama.innerHTML = this._item.nama;

            this._elHtml.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                param.update.hapusPilihan();
                this.pilih();
            }

            this.hapusTbl.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                let ok: boolean = window.confirm('hapus?');

                if (ok) {
                    param.hapus(this._item.id);
                    this.destroy();
                }
            }

            this.editTbl.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                let nama: string = window.prompt('nama: ', this._item.nama);
                if (nama) {
                    if (param.checkDouble(this._item.indukId, nama) == false) {
                        console.log('update nama param')
                        this._item.nama = nama;
                        this.nama.innerHTML = nama;
                    }
                    else {
                        ha.comp.dialog.tampil('nama sudah ada');
                    }
                }
            }
        }

        override destroy(): void {
            super.destroy();
            this._item = null;
        }

        hapusPilihan(): void {
            this._elHtml.classList.remove('dipilih');
            this._dipilih = false;
        }

        pilih(): void {
            this._elHtml.classList.add('dipilih');
            this._dipilih = true;
        }

        get editTbl(): HTMLButtonElement {
            return this.getEl('button.edit') as HTMLButtonElement;
        }

        get hapusTbl(): HTMLButtonElement {
            return this.getEl('button.hapus') as HTMLButtonElement;
        }

        get nama(): HTMLSpanElement {
            return this.getEl('span.nama') as HTMLSpanElement;
        }
    }

    const view: View = new View();

    export function exec(): void {
        view.attach(document.body);
        ha.comp.Util.bersihDiv(view.daftar);

        daftar.forEach((item: Item) => {
            item.destroy();
        })

        let fungDekObj: IFungDek = fung.dek.diedit();
        param.byIndukId(fungDekObj.id).forEach((itemObj: IParam) => {
            let item: Item = new Item(itemObj);
            item.attach(view.daftar);
            daftar.push(item);
        })
    }
}
