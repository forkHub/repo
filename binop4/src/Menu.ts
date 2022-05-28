namespace menu {
    export function ganti(el: HTMLDivElement): void {
        while (hal.menu().firstChild) {
            hal.menu().removeChild(hal.menu().firstChild);
        }

        hal.menu().appendChild(el);
    }
}

namespace menu.tambah {
    let _el: HTMLDivElement;

    export function el(): HTMLDivElement {
        if (!_el) {
            _el = ha.comp.Util.getTemplate('div.menu-tambah') as HTMLDivElement;
        }
        return _el;
    }

    function modulTbl(): HTMLButtonElement {
        return ha.comp.Util.getEl('button.modul', el()) as HTMLButtonElement;
    }

    function varTbl(): HTMLButtonElement {
        return ha.comp.Util.getEl('button.var', el()) as HTMLButtonElement;
    }

    function fungTbl(): HTMLButtonElement {
        return ha.comp.Util.getEl('button.fungsi', el()) as HTMLButtonElement;
    }

    export function mulai(): void {

        modulTbl().onclick = (e: MouseEvent) => {
            e.stopPropagation();
            let nama: string = window.prompt('nama', 'modul 1');
            let modulObj: IModul = window.modul.buat(nama, 0);
            modulObj.view.attach(hal.halaman());
        }

        varTbl().onclick = (e: MouseEvent) => {
            e.stopPropagation();
            let nama: string = window.prompt('nama', 'variable 1');
            let varObj: IVar = window.variable.buat(nama, 0);
            varObj.view.attach(hal.variable());
        }

        fungTbl().onclick = (e: MouseEvent) => {
            e.stopPropagation();
            //TODO: fungsi deklarasi baru
        }


    }
}

namespace menu.param {
    let _el: HTMLDivElement;

    export function el(): HTMLDivElement {
        if (!_el) {
            _el = ha.comp.Util.getTemplate('div.menu-param') as HTMLDivElement;
        }
        return _el;
    }

    export function mulai(): void {
        let tbl: HTMLButtonElement;

        //tombol update param
        tbl = ha.comp.Util.getEl('button.param', el()) as HTMLButtonElement;
        tbl.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            console.log('update param');
            //TODO:
        }

        //tombol update nama
        tbl = ha.comp.Util.getEl('button.nama', el()) as HTMLButtonElement;
        tbl.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            let nama: string = window.prompt('nama param');
            nama; //TODO:
        }



    }

}

namespace menu.modul {
    let _el: HTMLDivElement;

    export function el(): HTMLDivElement {
        if (!_el) {
            _el = ha.comp.Util.getTemplate('div.menu-modul') as HTMLDivElement;
        }
        return _el;
    }

    function updateTbl(): HTMLButtonElement {
        return ha.comp.Util.getEl('button.update', el()) as HTMLButtonElement;
    }

    function tambahTbl(): HTMLButtonElement {
        return ha.comp.Util.getEl('button.tambah', el()) as HTMLButtonElement;
    }

    function hapusTbl(): HTMLButtonElement {
        return ha.comp.Util.getEl('button.hapus', el()) as HTMLButtonElement;
    }

    export function mulai(): void {
        hal.menu().appendChild(el());

        updateTbl().onclick = (e: MouseEvent) => {
            e.stopPropagation();
            let dipilih: string = data.typeDipilih();

            if (data.TY_MODUL == dipilih) {
                let modulObj: IModul = window.modul.dipilih();
                modulObj.nama = window.prompt('nama', modulObj.nama);
                modulObj.view.elHtml.innerHTML = modulObj.nama;
            }
            else if (data.TY_VARIABLE == dipilih) {
                let varObj: IVar = window.variable.dipilih();
                varObj.nama = window.prompt('nama', varObj.nama);
                varObj.view.nama.innerHTML = varObj.nama;
            }
            else if (data.TY_FUNGSI == dipilih) {
                //TODO:
                console.log('fungsi dipilih')
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
            else if (data.TY_FUNGSI == dipilih) {
                //TODO:
                console.log('hapus fungsi')
            }
            else {
                console.error('dipilih kosong: ' + dipilih);
            }

        }
    }
}