namespace md {
	export class ModulItemView extends ha.comp.BaseComponent {
		private item: IModul;
		private namaSpan: HTMLSpanElement;
		static readonly daftar: ModulItemView[] = [];

		constructor(item: IModul) {
			super();
			this.item = item;
		}

		public destroy(): void {
			super.destroy();
			this.item = null;
		}

		async init(): Promise<void> {
			console.group('item init');

			this._template = await this.loadTemplate('./template/md_modul_item.html');
			this.build();
			this.namaSpan = this.getEl('span.nama');

			this.namaSpan.innerHTML = this.item.nama;

			this.elHtml.onclick = (e: MouseEvent) => {
				e.stopPropagation();
				console.log('focus');

				let el: HTMLElement = document.querySelector('div.md-modul-item.dipilih');
				if (el) {
					el.classList.remove('dipilih');
				}

				this.elHtml.classList.add('dipilih');
				Modul.modulAktif = this.item;
				this.elHtml.focus();
			}

			console.log('item init ends');
			console.groupEnd();
		}

		update(): void {
			this.namaSpan.innerHTML = this.item.nama;
		}

		static reset(): void {
			while (this.daftar.length > 0) {
				let view: ModulItemView;
				view = this.daftar.pop();
				view.destroy();
			}
		}

		static async buat(item: IModul, wadah: HTMLElement): Promise<ModulItemView> {
			let hasil: ModulItemView;

			hasil = new ModulItemView(item);
			await hasil.init();
			this.daftar.push(hasil);

			if (wadah) {
				hasil.attach(wadah);
			}

			return hasil;
		}

		static update(modul: IModul): void {
			this.daftar.forEach((view: ModulItemView) => {
				if (view.item.id == modul.id) {
					view.update();
				}
			});
		}

		static hapus(modul: IModul): void {
			for (let i: number = 0; i < this.daftar.length; i++) {
				let view: ModulItemView;
				view = this.daftar[i];
				if (view.item.id == modul.id) {
					view.destroy();
					this.daftar.splice(i, 1);
				}
			}
		}
	}
}