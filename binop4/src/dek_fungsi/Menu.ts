namespace menu {

    //menu update di klik saat pilih deklarasi fungsi
    export namespace func.dec.update {
        let _el: HTMLDivElement;
        const balikQuery: string = 'button.balik';
        const namaQuery: string = 'button.nama';

        export function el(): HTMLDivElement {
            if (!_el) {
                _el = ha.comp.Util.getTemplate('div.menu-fungsi-deklarasi-update') as HTMLDivElement;
            }
            return _el;
        }

        export function modulTbl(): HTMLButtonElement {
            return ha.comp.Util.getEl('button.modul', el()) as HTMLButtonElement;
        }

        export function mulai(): void {
            klik(balikQuery, el(), () => {
                menu.ganti(menu.utama.el());
            });

            klik(namaQuery, el(), () => {

            })



        }

    }

    /*
    export namespace func.dec.edit {
        let _el: HTMLDivElement;

        export function el(): HTMLDivElement {
            if (!_el) {
                _el = ha.comp.Util.getTemplate('div.menu-fung-dec-edit') as HTMLDivElement;
            }
            return _el;
        }

        export function modulTbl(): HTMLButtonElement {
            return ha.comp.Util.getEl('button.modul', el()) as HTMLButtonElement;
        }

        export function varTbl(): HTMLButtonElement {
            return ha.comp.Util.getEl('button.var', el()) as HTMLButtonElement;
        }

        export function fungTbl(): HTMLButtonElement {
            return ha.comp.Util.getEl('button.fungsi', el()) as HTMLButtonElement;
        }

        export function paramTbl(): HTMLButtonElement {
            return ha.comp.Util.getEl('button.param', el()) as HTMLButtonElement;
        }

        export function stmtTbl(): HTMLButtonElement {
            return ha.comp.Util.getEl('button.stmt', el()) as HTMLButtonElement;
        }

        export function mulai(): void {

            modulTbl().onclick = (e: MouseEvent) => {
                e.stopPropagation();
                let nama: string = window.prompt('nama', 'modul 1');
                let modulObj: IModul = window.modul.buat(nama, 0);
                modulObj.view.attach(modul.hal.halaman());
            }

            varTbl().onclick = (e: MouseEvent) => {
                e.stopPropagation();
                let nama: string = window.prompt('nama', 'variable 1');
                let varObj: IVar = window.variable.buat(nama, 0);   //TODO: id dipilih
                varObj.view.attach(modul.hal.variable());
            }

            fungTbl().onclick = (e: MouseEvent) => {
                e.stopPropagation();
                let nama: string = window.prompt('nama', 'fungsi');
                let varObj: IFungDek = window.fung.dek.buat(nama, 0);   //TODO: id dipilih
                varObj.view.attach(modul.hal.deklarasiFungsi());
            }

            paramTbl().onclick = (e: MouseEvent) => {
                e.stopPropagation();
                console.log('param tbl');
            }

            stmtTbl().onclick = (e: MouseEvent) => {
                e.stopPropagation();
                console.log('stmt tbl');
            }


        }
    }*/

}