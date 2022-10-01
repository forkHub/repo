namespace md {
	export class ModulItemView extends ha.comp.BaseComponent {
		private item: IModul;
		private namaSpan: HTMLSpanElement;

		constructor(item: IModul) {
			super();

			this.item = item;
		}

		async init(): Promise<void> {
			this._template = await this.loadTemplate('./template/md_modul_item.html');
			this.build();
			this.namaSpan = this.getEl('span.nama');

			this.namaSpan.innerHTML = this.item.nama;
		}

		hapus(modul: IModul): void {
			if (modul.id == this.item.id) {
				this.item = null;
				this.destroy();
			}
		}
	}
}