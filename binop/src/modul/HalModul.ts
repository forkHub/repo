namespace md {
	class HalModul extends ha.comp.BaseComponent {
		private daftarView: DaftarModulView;
		private daftarWdh: HTMLElement;
		private tombolAr: ITombol[];
		private _tombolWdh: HTMLElement;

		constructor() {
			super();
			this.tombolAr = [
				{
					label: 'tambah',
					klik: () => {
						console.log('tambah klik');
					}
				},
				{
					label: 'prop',
					klik: () => {
						console.log('prop klik');
					}
				},
				{
					label: 'edit',
					klik: () => {
						console.log('edit klik')
					}
				}
			];

			this.tombolWdh = document.createElement('div');
			this.tombolWdh.classList.add('menu-wdh');
			this.tombolWdh.classList.add('padding');
			this.tombolWdh.classList.add('disp-flex');

			this.tombolAr.forEach((item: ITombol) => {
				item.el = document.createElement('button') as HTMLButtonElement;
				item.el.onclick = (e: MouseEvent) => {
					e.stopPropagation();
					item.klik();
				}
				this.tombolWdh.appendChild(item.el);
			});
		}

		baru(modul: IModul): void {
			this.daftarView.baru(modul);
		}

		async init(): Promise<void> {
			this._template = await this.loadTemplate('./template/md_hal_modul.html');
			this.build();
			this.daftarWdh = this.getEl('div.daftar-cont');

			this.daftarView = new DaftarModulView();
			await this.daftarView.init();
			this.daftarView.attach(this.daftarWdh);
		}

		public get tombolWdh(): HTMLElement {
			return this._tombolWdh;
		}
		public set tombolWdh(value: HTMLElement) {
			this._tombolWdh = value;
		}


	}

	export const halModul = new HalModul();
}