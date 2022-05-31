namespace menu.utama {
    let _el: HTMLDivElement;

    export function el(): HTMLDivElement {
        if (!_el) {
            _el = ha.comp.Util.getTemplate('div.menu div.menu-modul') as HTMLDivElement;
        }
        return _el;
    }

    export function sistemTbl(): HTMLButtonElement {
        return ha.comp.Util.getEl('button.sistem', el()) as HTMLButtonElement;
    }

    export function updateTbl(): HTMLButtonElement {
        return ha.comp.Util.getEl('button.update', el()) as HTMLButtonElement;
    }

    export function tambahTbl(): HTMLButtonElement {
        return ha.comp.Util.getEl('button.tambah', el()) as HTMLButtonElement;
    }

    export function hapusTbl(): HTMLButtonElement {
        return ha.comp.Util.getEl('button.hapus', el()) as HTMLButtonElement;
    }

    export function mulai(): void {
        modul.hal.menu().appendChild(el());

        sistemTbl().onclick = (e: MouseEvent) => {
            e.stopPropagation();
            menu.ganti(menu.system.el());
        }

        updateTbl().onclick = (e: MouseEvent) => {
            e.stopPropagation();
            let dipilih: string = data.typeDipilih();

            if (data.TY_MODUL == dipilih) {
                let modulObj: IModul = window.modul.dipilih();
                let nama: string = window.prompt('nama', modulObj.nama);
                if (nama) {
                    modulObj.nama = nama;
                    modulObj.view.elHtml.innerHTML = modulObj.nama;
                }
            }
            else if (data.TY_VARIABLE == dipilih) {
                let varObj: IVar = window.variable.dipilih();
                varObj.nama = window.prompt('nama', varObj.nama);
                if (varObj.nama && varObj.nama != '') varObj.view.nama.innerHTML = varObj.nama;
            }
            else if (data.TY_DEK_FUNGSI == dipilih) {
                console.log('fungsi dipilih');
                menu.ganti(menu.func.dec.update.el());
            }
            else if (data.TY_NAMA == dipilih) {
                //edit nama
                // nama.klikUpdate(nama.dipilih());
                //TODO: dihapus
            }
            else {
                console.warn('dipilih kosong: ' + dipilih);
            }
        }

        tambahTbl().onclick = (e: MouseEvent) => {
            e.stopPropagation();

            menu.ganti(menu.tambah.el());
        }

        hapusTbl().onclick = (e: MouseEvent) => {
            e.stopPropagation();

            let dipilih: string = data.typeDipilih();
            if (data.TY_MODUL == dipilih) {
                let modulObj: IModul = window.modul.dipilih();
                window.modul.hapus(modulObj.id);
            }
            else if (data.TY_VARIABLE == dipilih) {
                let varObj: IVar = window.variable.dipilih();
                window.variable.hapus(varObj.id);
            }
            else if (data.TY_DEK_FUNGSI == dipilih) {
                let fungDekObj: IFungDek = window.fung.dek.dipilih();
                window.fung.dek.hapus(fungDekObj.id);
            }
            else {
                console.error('dipilih kosong: ' + dipilih);
            }

        }
    }
}


