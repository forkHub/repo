namespace md {
	export class DaftarModulView extends ha.comp.BaseComponent {
		private daftarItem: ModulItemView[] = [];
		private wadah: HTMLElement;

		constructor() {
			super();
		}

		async init(): Promise<void> {
			this._template = await this.loadTemplate("./template/md_daftar_modul.html");
			this.build();
			this.wadah = this.getEl('div.wadah');
		}

		reset(): void {
			let view: ModulItemView;
			while (this.daftarItem.length > 0) {
				view = this.daftarItem.pop();
				view.destroy();
			}
		}

		async baru(modul: IModul): Promise<void> {
			let item: ModulItemView;

			console.group('daftar modul: baru');

			// item;
			// modul;
			// this.wadah;

			item = new ModulItemView(modul);
			await item.init();
			item.attach(this.wadah);

			this.daftarItem.push(item);

			console.groupEnd();
		}

	}

}