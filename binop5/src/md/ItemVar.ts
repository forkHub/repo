class ItemVar extends ha.comp.BaseComponent {
	private menu: ha.comp.MenuPopup;

	private _item: IVar;
	public get item(): IVar {
		return this._item;
	}

	constructor(item: IVar) {
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
		this.namaDiv.innerText = 'var: ' + item.nama;

		this.menu = new ha.comp.MenuPopup();
		this.menu.buatTombol({
			label: 'rename',
			f: () => {
				let nama: string = window.prompt('Nama var: ', this._item.nama);
				if (nama) {
					this.gantiNama(nama);
					dataObj.simpan();
				}
			}
		})

		this.menu.buatTombol({
			label: 'hapus',
			f: () => {

				for (let i: number = 0; i < Variable.daftar.length; i++) {
					if (Variable.daftar[i].id == this._item.id) {
						Variable.daftar.splice(i, 1);
					}
				}
				this.destroy();
				dataObj.simpan();
			}
		})


		this.menuTbl.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			this.menu.view.attach(document.body);
		}
	}

	gantiNama(nama: string): void {
		this._item.nama = nama;
		this.namaDiv.innerText = 'var: ' + nama;
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
