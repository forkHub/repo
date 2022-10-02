namespace md {
	class HalModul extends ha.comp.BaseComponent {

		private daftarView: DaftarModulView;
		private daftarWdh: HTMLElement;
		private tombolAr: ITombol[];
		private _tombolWdh: HTMLElement;
		private _tombolKlik: (e: MouseEvent) => void;

		constructor() {
			super();
		}

		async baru(modul: IModul): Promise<void> {
			console.group('item baru');
			await this.daftarView.baru(modul);
			console.groupEnd();
		}

		//pindah modul/load modul
		reset(): void {
			this.daftarView.reset();
		}

		load(): void {
			this.reset();
		}

		async init(): Promise<void> {
			console.group('hal modul init:');

			this._template = await this.loadTemplate('./template/md_hal_modul.html');
			this.build();
			this.daftarWdh = this.getEl('div.daftar-cont');

			this.daftarView = new DaftarModulView();
			await this.daftarView.init();
			this.daftarView.attach(this.daftarWdh);

			this.initTombol();

			console.groupEnd();
		}

		initTombol(): void {
			this.tombolAr = [
				{
					label: 'tambah',
					klik: (e: MouseEvent) => {
						console.log('tambah klik');
						this.tombolKlik(e);
					}
				},
				{
					label: 'prop',
					klik: (e: MouseEvent) => {
						console.log('prop klik');
						this.tombolKlik(e);
					}
				},
				{
					label: 'edit',
					klik: (e: MouseEvent) => {
						console.log('edit klik');
						this.tombolKlik(e);
					}
				},
				{
					label: Kons.TBL_HAPUS,
					klik: (e: MouseEvent) => {
						console.log('hapus klik');
						this.tombolKlik(e);
					}
				}

			];

			this.tombolWdh = document.createElement('div');
			this.tombolWdh.classList.add('menu-wdh');
			this.tombolWdh.classList.add('padding');
			this.tombolWdh.classList.add('disp-flex');

			this.tombolAr.forEach((item: ITombol) => {
				item.el = document.createElement('button') as HTMLButtonElement;
				item.el.innerHTML = item.label;
				item.el.onclick = (e: MouseEvent) => {
					e.stopPropagation();
					item.klik(e);
				}
				this.tombolWdh.appendChild(item.el);
			});

			console.log(this.tombolWdh);
		}

		tambahModulKlik(): void {
			let nama: string;

			nama = window.prompt('Nama Modul');
			Modul.buat(nama, ha.comp.Id.id);
		}

		public get tombolWdh(): HTMLElement {
			return this._tombolWdh;
		}
		public set tombolWdh(value: HTMLElement) {
			this._tombolWdh = value;
		}
		public get tombolKlik(): (e: MouseEvent) => void {
			return this._tombolKlik;
		}
		public set tombolKlik(value: (e: MouseEvent) => void) {
			this._tombolKlik = value;
		}


	}

	export const halModul = new HalModul();

	halModul.tombolKlik = async (e: MouseEvent) => {
		let label: string = (e.currentTarget as HTMLButtonElement).innerText;

		if (Kons.TBL_TAMBAH == label) {
			let nama: string;

			nama = window.prompt('Nama Modul');
			let modul: IModul = Modul.buat(nama, ha.comp.Id.id);
			await halModul.baru(modul);
			simpan();
		}
		else if (Kons.TBL_EDIT == label) {

		}
		else if (Kons.TBL_PROP == label) {

		}
		else if (Kons.TBL_HAPUS == label) {

		}
	}
}