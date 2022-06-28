class HalModule extends ha.comp.BaseComponent {
    private menu: ha.comp.MenuPopup;
    private _modul: IModul;

    constructor() {
        super();
        this._elHtml = this.getTemplate('div.modul-cont div.hal-modul');

        this.setupTombol();
        this.setupMenu();
    }

    tampil(modul: IModul): void {
        this._modul = modul;

        this._modul.varAr.forEach((id: number) => {
            let item: IVar;

            item = Variable.getVar(id);
            this.renderVar(item);

        });

        this._modul.modulAr.forEach((id: number) => {
            let item: IModul = Modul.getModul(id);
            this.renderModul(item);
        });

        this._modul.fungAr.forEach((id: number) => {
            let item: IDekFungsi = DekFungsi.get(id);
            this.renderDekFungsi(item);
        })

    }

    private setupMenu(): void {
        this.menu = new ha.comp.MenuPopup();
        this.menu.buatTombol({
            label: 'terjemah',
            f: () => {
                // dataObj.ter
                Project.terj();
            }
        })
        this.menu.buatTombol(this.buatTombolTambahVar());
        this.menu.buatTombol({
            label: 'modul',
            f: () => {
                let nama: string = window.prompt('Nama Modul', 'modul');
                if (nama) {
                    let modulObj: IModul = Modul.buatModulObj(nama, 0);
                    this.renderModul(modulObj);
                    Modul.daftar.push(modulObj);
                    dataObj.simpan();
                }
            }
        });
        this.menu.buatTombol({
            label: 'deklarasi fungsi',
            f: () => {
                let nama: string = window.prompt('Nama Fungsi', 'fungsi');
                if (nama) {
                    let fungObj: IDekFungsi = DekFungsi.buat(nama, 0);
                    this.renderDekFungsi(fungObj);
                    this._modul.fungAr.push(fungObj.id);
                    dataObj.simpan();
                }
            }
        });
    }

    private setupTombol(): void {
        this.menuTbl.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            this.menu.view.attach(document.body);
        }
    }

    private buatTombolTambahVar(): ha.comp.ITombol {
        let tombol: ha.comp.ITombol;

        tombol = {
            label: 'var',
            f: () => {
                //buat var
                let nama: string;

                nama = window.prompt('Nama:');
                if (nama) {
                    let variable: IVar;

                    variable = Variable.buatVarObj(nama, 0);
                    this.renderVar(variable);

                    Variable.daftar.push(variable);
                    dataObj.simpan();
                }
            }
        }

        return tombol;
    }

    private renderVar(variable: IVar): void {
        let view: VariableItem;

        view = new VariableItem(variable);
        view.attach(this.variable);
    }

    private renderModul(modul: IModul): void {
        let view: ItemModul;

        view = new ItemModul(modul);
        view.attach(this.modulEl);
    }

    private renderDekFungsi(fung: IDekFungsi): void {
        let view: DekFungsiItemView;

        view = new DekFungsiItemView(fung);
        view.attach(this.modulEl);
    }

    //TODO: dipindah
    // private buatDekFungsiObj(nama: string, indukId: number): IDekFungsi {
    //     return {
    //         id: Id.id,
    //         indukId: indukId,
    //         nama: nama,
    //         type: TY_DEK_FUNGSI
    //     }

    // }

    get menuTbl(): HTMLButtonElement {
        return this.getEl('div.menu button') as HTMLButtonElement;
    }

    get modulEl(): HTMLDivElement {
        return this.getEl('div.modul') as HTMLDivElement;
    }

    get variable(): HTMLDivElement {
        return this.getEl('div.var') as HTMLDivElement;
    }

    get deklarasiFungsi(): HTMLDivElement {
        return this.getEl('div.dek-fung') as HTMLDivElement;
    }

}


