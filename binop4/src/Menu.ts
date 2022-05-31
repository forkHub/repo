namespace menu {
    export function ganti(el: HTMLDivElement): void {
        while (modul.hal.menu().firstChild) {
            modul.hal.menu().removeChild(modul.hal.menu().firstChild);
        }

        modul.hal.menu().appendChild(el);
    }

    export function mulai(): void {
        menu.fung.dek.update.mulai();
        menu.utama.mulai();
        menu.tambah.mulai();
        menu.system.mulai();
        menu.system.mulai();
    }

    export namespace tambah {
        let _el: HTMLDivElement;

        export function el(): HTMLDivElement {
            if (!_el) {
                _el = ha.comp.Util.getTemplate('div.menu-tambah') as HTMLDivElement;
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

        // export function paramTbl(): HTMLButtonElement {
        //     return ha.comp.Util.getEl('button.param', el()) as HTMLButtonElement;
        // }

        // export function stmtTbl(): HTMLButtonElement {
        //     return ha.comp.Util.getEl('button.stmt', el()) as HTMLButtonElement;
        // }

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

            // paramTbl().onclick = (e: MouseEvent) => {
            //     e.stopPropagation();
            //     console.log('param tbl');
            // }

            // stmtTbl().onclick = (e: MouseEvent) => {
            //     e.stopPropagation();
            //     console.log('stmt tbl');
            // }


        }
    }

    //TODO: pindahin
    export namespace param {
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

    function tombol(query: string, el: HTMLDivElement): HTMLButtonElement {
        return ha.comp.Util.getEl(query, el) as HTMLButtonElement;
    }

    export function klik(query: string, el: HTMLDivElement, f: () => void): void {
        let btn: HTMLButtonElement = tombol(query, el);
        btn.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            f();
        }
    }

}