namespace md {
	export class DaftarModulView extends ha.comp.BaseComponent {
		private daftarItem: ModulItemView[] = [];

		constructor() {
			super();
		}

		async init(): Promise<void> {
			this._template = await this.loadTemplate("./template/md_daftar_modul.html");
			this.build();
		}

		baru(modul: IModul) {
			let item: ModulItemView = new ModulItemView(modul);
			item.attach(this._elHtml);

			this.daftarItem.push(item);
		}

	}

}