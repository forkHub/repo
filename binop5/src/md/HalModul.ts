class HalModule extends ha.comp.BaseComponent {
    private menu: ha.comp.MenuPopup;

    constructor() {
        super();
        this._elHtml = this.getTemplate('div.modul-cont div.hal-modul');

        this.setupTombol();
        this.setupMenu();
    }

    setupMenu(): void {
        this.menu = new ha.comp.MenuPopup();
        this.menu.buatTombol(this.buatTombolTambahVar());
        this.menu.buatTombol({
            label: 'modul',
            f: () => {
                let nama: string = window.prompt('Nama Modul');
                if (nama) {
                    let modulObj: IModul = this.buatModulObj(nama, 0);
                    this.renderModul(modulObj);
                    dataObj.modulAr.push(modulObj);
                    dataObj.simpan();
                }
            }
        });
        this.menu.buatTombol({
            label: 'deklarasi fungsi',
            f: () => {
                let nama: string = window.prompt('Nama Fungsi');
                if (nama) {
                    let fungObj: IDekFungsi = this.buatDekFungsiObj(nama, 0);
                    this.renderDekFungsi(fungObj);
                    dataObj.dekFungsiAr.push(fungObj);
                    dataObj.simpan();
                }
            }
        });
    }

    setupTombol(): void {
        this.menuTbl.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            this.menu.view.attach(document.body);
        }
    }

    buatTombolTambahVar(): ha.comp.ITombol {
        let tombol: ha.comp.ITombol;

        tombol = {
            label: 'var',
            f: () => {
                //buat var
                let nama: string;

                nama = window.prompt('Nama:');
                if (nama) {
                    let variable: IVar;

                    variable = this.buatVarObj(nama, 0);
                    this.renderVar(variable);

                    Variable.daftar.push(variable);
                    dataObj.simpan();
                }
            }
        }

        return tombol;
    }

    renderVar(variable: IVar): void {
        let view: ItemVar;

        view = new ItemVar(variable);
        view.attach(this.variable);
    }

    renderModul(modul: IModul): void {
        let view: ItemModul;

        view = new ItemModul(modul);
        view.attach(this.modul);
    }

    renderDekFungsi(fung: IDekFungsi): void {
        let view: ItemDekFungsi;

        view = new ItemDekFungsi(fung);
        view.attach(this.modul);
    }

    buatVarObj(nama: string, indukId: number): IVar {
        let hasil: IVar;

        hasil = {
            id: Id.id,
            nama: nama,
            indukId: indukId,
            type: TY_VARIABLE,
        }

        return hasil;
    }

    buatModulObj(nama: string, indukId: number): IModul {
        return {
            id: Id.id,
            indukId: indukId,
            nama: nama,
            type: TY_MODUL
        }
    }

    buatDekFungsiObj(nama: string, indukId: number): IDekFungsi {
        return {
            id: Id.id,
            indukId: indukId,
            nama: nama,
            type: TY_DEK_FUNGSI
        }

    }

    get menuTbl(): HTMLButtonElement {
        return this.getEl('div.menu button') as HTMLButtonElement;
    }

    get modul(): HTMLDivElement {
        return this.getEl('div.modul') as HTMLDivElement;
    }

    get variable(): HTMLDivElement {
        return this.getEl('div.var') as HTMLDivElement;
    }

    get deklarasiFungsi(): HTMLDivElement {
        return this.getEl('div.dek-fung') as HTMLDivElement;
    }

}


