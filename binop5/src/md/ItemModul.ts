class ItemModul extends ha.comp.BaseComponent {
    private menu: ha.comp.MenuPopup;

    private _item: IModul;
    public get item(): IModul {
        return this._item;
    }

    constructor(item: IModul) {
        super();
        this._template = `
            <div class='comp var-item disp-flex'>
                <div class='nama flex-grow-1'></div>
                <div class='menu'>
                    <button>|||</button>
                </div>
            </div>
        `;
        this.build();

        this._item = item;
        this.gantiNama(item.nama);
        this.setupMenu();

        this.menuTbl.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            this.menu.view.attach(document.body);
        }
    }

    override destroy(): void {
        super.destroy();
        this._item = null;
    }

    setupMenu(): void {
        this.menu = new ha.comp.MenuPopup();
        this.menu.buatTombol({
            label: 'rename',
            f: () => {
                let nama: string = window.prompt('Nama Modul: ', this._item.nama);
                if (nama) {
                    this.gantiNama(nama);
                    data.simpan();
                }
            }
        })

        this.menu.buatTombol({
            label: 'edit',
            f: () => {
                console.log('edit modul');
            }
        })

        this.menu.buatTombol({
            label: 'hapus',
            f: () => {
                for (let i: number = 0; i < data.modulAr.length; i++) {
                    if (data.modulAr[i].id == this._item.id) {
                        data.modulAr.splice(i, 1);
                        break;
                    }
                }

                this.destroy();
                data.simpan();
            }
        })

    }

    gantiNama(nama: string): void {
        this._item.nama = nama;
        this.namaDiv.innerText = 'mod: ' + nama;
    }

    get namaDiv(): HTMLDivElement {
        return this.getEl('div.nama') as HTMLDivElement;
    }

    get menuTbl(): HTMLButtonElement {
        return this.getEl('div.menu button') as HTMLButtonElement;
    }
}