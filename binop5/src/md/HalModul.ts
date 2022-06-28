class HalModule extends ha.comp.BaseComponent {
    private menu: ha.comp.MenuPopup;
    private _modul: IModul;

    constructor() {
        super();
        this._elHtml = this.getTemplate('div.modul-cont div.hal-modul');

        this.setupTombol();
        this.setupMenu();
    }

    private setBack(): void {
        Path.back = () => {
            if (this._modul.indukId == 0) {
                console.log('modul awal');
            }
            else {
                let pModul: IModul = Modul.getModul(this._modul.indukId);
                dataObj.halModul.tampil(pModul);
            }
        }
    }

    tampil(modul: IModul): void {
        console.log('tampil');

        this._modul = modul;

        ha.comp.Util.bersihDiv(this.varCont);
        ha.comp.Util.bersihDiv(this.modulCont);
        ha.comp.Util.bersihDiv(this.fungCont);

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

        this.setBack();
    }

    private setupMenu(): void {
        this.menu = new ha.comp.MenuPopup();
        let tombol: ha.comp.ITombol[] = [
            {
                label: 'terjemah',
                f: () => {
                    // dataObj.ter
                    Project.terj();
                }
            },
            {
                label: '+ var',
                f: () => {
                    //buat var
                    let nama: string;

                    nama = window.prompt('Nama:');
                    if (nama) {
                        let variable: IVar;

                        variable = Variable.buatVarObj(nama, 0);
                        this.renderVar(variable);
                        this._modul.varAr.push(variable.id);

                        dataObj.simpan();
                    }
                }
            },
            {
                label: '+ modul',
                f: () => {
                    let nama: string = window.prompt('Nama Modul', 'modul');
                    if (nama) {
                        let modulObj: IModul = Modul.buatModulObj(nama, this._modul.id);
                        this.renderModul(modulObj);
                        this._modul.modulAr.push(modulObj.id);
                        dataObj.simpan();
                    }
                }
            },
            {
                label: '+ fungsi',
                f: () => {
                    let nama: string = window.prompt('Nama Fungsi', 'fungsi');
                    if (nama) {
                        let fungObj: IDekFungsi = DekFungsi.buat(nama, this._modul.id);
                        this.renderDekFungsi(fungObj);
                        this._modul.fungAr.push(fungObj.id);
                        dataObj.simpan();
                    }
                }
            }
        ]

        this.menu.buatTombol2(tombol);
    }

    private setupTombol(): void {
        this.menuTbl.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            this.menu.view.attach(document.body);
        }
    }

    private renderVar(variable: IVar): void {
        let view: VariableItem;

        view = new VariableItem(variable);
        view.attach(this.varCont);
    }

    private renderModul(modul: IModul): void {
        let view: ItemModul;

        view = new ItemModul(modul);
        view.attach(this.modulCont);
    }

    private renderDekFungsi(fung: IDekFungsi): void {
        let view: DekFungsiItemView;

        view = new DekFungsiItemView(fung);
        view.attach(this.fungCont);
    }

    private get menuTbl(): HTMLButtonElement {
        return this.getEl('div.menu button') as HTMLButtonElement;
    }

    private get modulCont(): HTMLDivElement {
        return this.getEl('div.modul') as HTMLDivElement;
    }

    private get varCont(): HTMLDivElement {
        return this.getEl('div.var') as HTMLDivElement;
    }

    private get fungCont(): HTMLDivElement {
        return this.getEl('div.dek-fung') as HTMLDivElement;
    }

}


