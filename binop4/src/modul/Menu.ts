namespace md.editor.menu {

    export function ganti(el: HTMLDivElement | HTMLElement): void {
        while (halModul.menu.firstChild) {
            halModul.menu.removeChild(halModul.menu.firstChild);
        }

        halModul.menu.appendChild(el);
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

namespace md.editor.menu.utama {

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
                window.md.editor.menu.ganti(system.menu.el());
            }

            this.updateTbl.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                let dipilih: string = data.typeDipilih();

                if (data.TY_MODUL == dipilih) {
                    let modulObj: IModul = window.md.dipilih();
                    let nama: string = window.prompt('nama', modulObj.nama);
                    if (nama) {
                        modulObj.nama = nama;
                        modulObj.view.elHtml.innerHTML = modulObj.nama;
                    }
                }
                else if (data.TY_VARIABLE == dipilih) {
                    let varObj: IVar = window.variable.ent.dipilih();
                    varObj.nama = window.prompt('nama', varObj.nama);
                    if (varObj.nama && varObj.nama != '') varObj.view.nama.innerHTML = varObj.nama;
                }
                else if (data.TY_DEK_FUNGSI == dipilih) {
                    console.log('fungsi dipilih');
                    let fungObj: IFungDek = window.fung.dek.ent.dipilih();
                    window.fung.dek.ent.hapusDiedit();
                    fungObj.diedit = true;
                    fungsi.exec();
                    halModul.detach();
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

                window.md.editor.menu.ganti(window.md.editor.menu.tambah.el());
            }

            this.hapusTbl.onclick = (e: MouseEvent) => {
                e.stopPropagation();

                let dipilih: string = data.typeDipilih();
                if (data.TY_MODUL == dipilih) {
                    let modulObj: IModul = window.md.dipilih();
                    window.md.hapus(modulObj.id);
                }
                else if (data.TY_VARIABLE == dipilih) {
                    let varObj: IVar = window.variable.ent.dipilih();
                    window.variable.ent.hapus(varObj.id);
                }
                else if (data.TY_DEK_FUNGSI == dipilih) {
                    let fungDekObj: IFungDek = window.fung.dek.ent.dipilih();
                    window.fung.dek.ent.hapus(fungDekObj.id);
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

namespace md.editor.menu.tambah {
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
            let modulObj: IModul = window.md.buat(nama, 0);
            modulObj.view.attach(halModul.halaman);
        }

        varTbl().onclick = (e: MouseEvent) => {
            e.stopPropagation();
            let nama: string = window.prompt('nama', 'variable 1');
            let varObj: IVar = window.variable.ent.buat(nama, 0);   //TODO: id dipilih
            varObj.view.attach(halModul.variable);
        }

        fungTbl().onclick = (e: MouseEvent) => {
            e.stopPropagation();
            let nama: string = window.prompt('nama', 'fungsi');
            let varObj: IFungDek = window.fung.dek.ent.buat(nama, 0);   //TODO: id dipilih
            varObj.view.attach(halModul.deklarasiFungsi);
        }

    }
}