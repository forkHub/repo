class VariableItem extends ha.comp.BaseComponent {
	private menu: ha.comp.MenuPopup;
	private _item: IVar;

	constructor(item: IVar) {
		super();
		this._template = `
			<div class='var-item border padding disp-table'>
				<div class='nama disp-cell'></div>
			</div>
        `;
		this.build();

		this._item = item;
		this.namaDiv.innerText = 'let ' + item.nama;

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


		this._elHtml.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			this.menu.view.attach(document.body);
		}
	}

	private gantiNama(nama: string): void {
		this._item.nama = nama;
		this.namaDiv.innerText = 'var: ' + nama;
	}

	destroy(): void {
		super.destroy();
		this._item = null;
	}

	private get namaDiv(): HTMLDivElement {
		return this.getEl('div.nama') as HTMLDivElement;
	}
}
