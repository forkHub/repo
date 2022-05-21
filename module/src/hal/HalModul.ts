namespace ha.modul {
	class TambahVarView extends ha.comp.BaseComponent {
		get namaInput(): HTMLInputElement {
			return this.getEl('input.nama') as HTMLInputElement;
		}

		get tblSimpan(): HTMLButtonElement {
			return this.getEl('button.simpan') as HTMLButtonElement;
		}

		get tblBatal(): HTMLButtonElement {
			return this.getEl('button.batal') as HTMLButtonElement;
		}

		get form(): HTMLFormElement {
			return this.getEl('form') as HTMLFormElement;
		}

		constructor() {
			super();
			this._elHtml = this.getTemplate('var-baru');

			this.form.onsubmit = () => {
				try {
					ha.modul.modul.varBaru(this.namaInput.value, ""); //TOOD: var pakai type
					halModul.render();
					blok.style.display = 'none';
					this.detach();
					session.simpan();
				}
				catch (e) {
					console.error(e);
				}

				return false;
			}
		}

	}

	class TambahFungsiView extends ha.comp.BaseComponent {
		constructor() {
			super();
			this._elHtml = this.getTemplate('fungsi-baru') as HTMLDivElement;

			this.form.onsubmit = () => {
				try {
					ha.modul.modul.fungsiBaru(this.namaInput.value); //TOOD: var pakai return
					halModul.render();
					blok.style.display = 'none';
					this.detach();
				}
				catch (e) {
					console.error(e);
				}

				return false;
			}
		}

		get namaInput(): HTMLInputElement {
			return this.getEl('input.nama') as HTMLInputElement;
		}

		get tblSimpan(): HTMLButtonElement {
			return this.getEl('button.simpan') as HTMLButtonElement;
		}

		get tblBatal(): HTMLButtonElement {
			return this.getEl('button.batal') as HTMLButtonElement;
		}

		get form(): HTMLFormElement {
			return this.getEl('form') as HTMLFormElement;
		}



	}

	export class HalModul {
		private daftarModulView: HTMLDivElement;
		private daftarVarView: HTMLDivElement;
		private daftarFungsiView: HTMLDivElement;
		private tambahVarView: TambahVarView;
		private tambahFungsiView: TambahFungsiView;

		constructor() {
			this.tambahVarView = new TambahVarView();
			this.tambahFungsiView = new TambahFungsiView();
		}

		tambahVar(): void {
			blok.style.display = 'block';
			this.tambahVarView.attach(document.body);
		}

		tambahFungsi(): void {
			blok.style.display = 'block';
			this.tambahFungsiView.attach(document.body);
		}

		tampil() {
			// sessionObj = session.load();
			this.daftarModulView = ha.comp.Util.getEl('halaman daftar-modul') as HTMLDivElement;
			this.daftarVarView = ha.comp.Util.getEl('halaman daftar-var') as HTMLDivElement;
			this.daftarFungsiView = ha.comp.Util.getEl('halaman daftar-fungsi') as HTMLDivElement;
			this.renderModul();
			this.renderVar();
			menu.ganti(KONTEK_MODUL, this.menu)
			sessionObj.idDipilih = sessionObj.daftarModul[0].id;
		}

		render(): void {
			this.renderModul();
			this.renderVar();
			this.renderFungsi();
		}

		resetPilihan(): void {
			//reset pilih
			sessionObj.daftarVar.forEach((item: IVar) => {
				item.view.tidakDipilih();
			});

			//reset pilih
			sessionObj.daftarModul.forEach((item: IModul) => {
				item.view.tidakDipilih();
			});
		}

		//TODO: render fungsi
		private renderFungsi(): void {
			this.daftarFungsiView;
		}

		private renderVar(): void {
			console.group('render var, jml ' + sessionObj.daftarVar.length);

			while (this.daftarVarView.firstChild) {
				this.daftarVarView.removeChild(this.daftarVarView.firstChild);
			}

			//render var
			sessionObj.daftarVar.forEach((item: IVar) => {

				let view: ItemView = new ItemView();
				view.judul.innerHTML = item.nama;
				view.attach(this.daftarVarView);
				item.view = view;
				if (sessionObj.idDipilih == item.id) {
					view.dipilih();
				}

				//tambahkan item event
				item.view.elHtml.onclick = () => {
					this.resetPilihan();

					//pilih item sekarang
					item.view.dipilih();
					sessionObj.idDipilih = item.id;
				}
			});
			console.groupEnd();
		}

		private renderModul(): void {

			console.group('render modul, jml ' + sessionObj.daftarModul.length);

			while (this.daftarModulView.firstChild) {
				this.daftarModulView.removeChild(this.daftarModulView.firstChild);
			}


			//render modul
			sessionObj.daftarModul.forEach((item: IModul) => {
				// if (item.view) item.view.detach();

				let view: ItemView = new ItemView();
				view.judul.innerHTML = item.nama;
				view.attach(this.daftarModulView);
				item.view = view;
				if (sessionObj.idDipilih == item.id) {
					view.dipilih();
				}
				// this.items.push(item);

				//tambahkan item event
				item.view.elHtml.onclick = () => {

					this.resetPilihan();

					//pilih item sekarang
					item.view.dipilih();
					sessionObj.idDipilih = item.id;
				}
			});

			//render var

			//render function

			console.groupEnd();
		}

		get menu(): HTMLDivElement {
			return ha.comp.Util.getEl('menu') as HTMLDivElement
		}
	}

	export var halModul: HalModul = new HalModul();


}