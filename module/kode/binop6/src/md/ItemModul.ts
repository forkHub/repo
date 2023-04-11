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

	destroy(): void {
		super.destroy();
		this._item = null;
	}

	private setupMenu(): void {
		this.menu = new ha.comp.MenuPopup();
		this.menu.buatTombol({
			label: 'rename',
			f: () => {
				let nama: string = window.prompt('Nama Modul: ', this._item.nama);
				if (nama) {
					this.gantiNama(nama);
					dataObj.simpan();
				}
			}
		})

		this.menu.buatTombol({
			label: 'edit',
			f: () => {
				console.log('edit modul');
				dataObj.halModul.tampil(this._item);
			}
		})

		this.menu.buatTombol({
			label: 'hapus',
			f: () => {
				Modul.hapus(this._item.id);
				this.destroy();
				dataObj.simpan();
			}
		})

	}

	private gantiNama(nama: string): void {
		this._item.nama = nama;
		this.namaDiv.innerText = 'mod: ' + nama;
	}

	private get namaDiv(): HTMLDivElement {
		return this.getEl('div.nama') as HTMLDivElement;
	}

	private get menuTbl(): HTMLButtonElement {
		return this.getEl('div.menu button') as HTMLButtonElement;
	}
}