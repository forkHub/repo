namespace modul.editor.menu {

    export function ganti(el: HTMLDivElement | HTMLElement): void {
        while (window.modul.editor.view.menu.firstChild) {
            window.modul.editor.view.menu.removeChild(window.modul.editor.view.menu.firstChild);
        }

        window.modul.editor.view.menu.appendChild(el);
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

namespace modul.editor.menu.utama {

    class View extends ha.comp.BaseComponent {
        constructor() {
            super();
            this._template = `
                <div class="menu-modul">
                    <button class="sistem">sistem</button>
                    <button class="tambah">tambah</button>
                    <button class="update">update</button>
                    <button class="hapus">delete</button>
                    <button class="masuk">buka</button>
                </div>
            `;
            this.build();

            this.sistemTbl.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                window.modul.editor.menu.ganti(system.menu.el());
            }

            this.updateTbl.onclick = (e: MouseEvent) => {
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
                    let fungObj: IFungDek = window.fung.dek.dipilih();
                    window.fung.dek.hapusDiedit();
                    fungObj.diedit = true;
                    fung.dek.editor.exec();
                    window.modul.editor.view.detach();
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

            this.tambahTbl.onclick = (e: MouseEvent) => {
                e.stopPropagation();

                window.modul.editor.menu.ganti(window.modul.editor.menu.tambah.el());
            }

            this.hapusTbl.onclick = (e: MouseEvent) => {
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

        get sistemTbl(): HTMLButtonElement {
            return this.getEl('button.sistem') as HTMLButtonElement;
        }

        get updateTbl(): HTMLButtonElement {
            return this.getEl('button.update') as HTMLButtonElement;
        }

        get tambahTbl(): HTMLButtonElement {
            return this.getEl('button.tambah') as HTMLButtonElement;
        }

        get hapusTbl(): HTMLButtonElement {
            return this.getEl('button.hapus') as HTMLButtonElement;
        }

    }
    export const view: View = new View();


}

namespace modul.editor.menu.tambah {
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

    export function exec(): void {

        modulTbl().onclick = (e: MouseEvent) => {
            e.stopPropagation();
            let nama: string = window.prompt('nama', 'modul 1');
            let modulObj: IModul = window.modul.buat(nama, 0);
            modulObj.view.attach(window.modul.editor.view.halaman);
        }

        varTbl().onclick = (e: MouseEvent) => {
            e.stopPropagation();
            let nama: string = window.prompt('nama', 'variable 1');
            let varObj: IVar = window.variable.buat(nama, 0);   //TODO: id dipilih
            varObj.view.attach(window.modul.editor.view.variable);
        }

        fungTbl().onclick = (e: MouseEvent) => {
            e.stopPropagation();
            let nama: string = window.prompt('nama', 'fungsi');
            let varObj: IFungDek = window.fung.dek.buat(nama, 0);   //TODO: id dipilih
            varObj.view.attach(window.modul.editor.view.deklarasiFungsi);
        }

    }
}