namespace md {
	export class ModulItemView extends ha.comp.BaseComponent {
		private item: IModul;
		private namaSpan: HTMLSpanElement;

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

		hapus(modul: IModul): void {
			if (modul.id == this.item.id) {
				this.item = null;
				this.destroy();
			}
		}
	}
}