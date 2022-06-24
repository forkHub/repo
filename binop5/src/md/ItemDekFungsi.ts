class ItemDekFungsi extends ha.comp.BaseComponent {
	private menu: ha.comp.MenuPopup;

	private _item: IDekFungsi;
	public get item(): IDekFungsi {
		return this._item;
	}

	constructor(item: IDekFungsi) {
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
		this.namaDiv.innerText = 'fung: ' + item.nama;


		this.setupMenu();


		this.menuTbl.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			this.menu.view.attach(document.body);
		}
	}

	setupMenu(): void {
		this.menu = new ha.comp.MenuPopup();
		this.menu.buatTombol({
			label: 'rename',
			f: () => {
				let nama: string;

				nama = window.prompt('Nama Dek Fungsi: ', this._item.nama);
				if (nama) {
					this.gantiNama(nama);
					data.simpan();
				}
			}
		})

		this.menu.buatTombol({
			label: 'hapus',
			f: () => {
				for (let i: number = 0; i < data.dekFungsiAr.length; i++) {
					if (data.dekFungsiAr[i].id == this._item.id) {
						data.dekFungsiAr.splice(i, 1);
						break;
					}
				}

				this.destroy();
				data.simpan();
			}
		})

		this.menu.buatTombol({
			label: 'edit',
			f: () => {
				console.log('edit dek fungsi');
				data.halModul.detach();
				data.halFungsi.attach(document.body);
				data.halFungsi.item = this._item;
				data.halFungsi.tampil();
			}
		})

	}

	gantiNama(nama: string): void {
		this._item.nama = nama;
		this.namaDiv.innerText = 'fung: ' + nama;
	}

	destroy(): void {
		super.destroy();
		this._item = null;
	}

	get namaDiv(): HTMLDivElement {
		return this.getEl('div.nama') as HTMLDivElement;
	}

	get menuTbl(): HTMLButtonElement {
		return this.getEl('div.menu button') as HTMLButtonElement;
	}
}