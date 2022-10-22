class HalModul {
	private static readonly namaModulEl: HTMLElement = ha.comp.Util.getEl('div.header span.nama', document.body);

	static init(): void {
		this.namaModulEl.innerHTML = Modul.getAktif().judul;
	}

	static itemKlik(e: HTMLElement): void {
		console.log(e);
		let type: string = e.getAttribute('type');

		if (VARIABLE == type) {

		}
		else if (MODUL == type) {

		}
		else if (FUNGSI == type) {

		}
		else {
			throw Error('type: ' + type);
		}

	}

	static load(): void {
		FragModul.load();
		FragVariable.load();
	}

}