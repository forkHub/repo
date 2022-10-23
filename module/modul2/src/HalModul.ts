class HalModul {
	static readonly el: HTMLElement = ha.comp.Util.getEl('div.hal-modul');

	private static readonly namaModulEl: HTMLElement = ha.comp.Util.getEl('div.header span.nama', document.body);

	static init(): void {
		this.namaModulEl.innerHTML = Modul.getAktif().judul;
	}

	static tampil(): void {
		document.body.appendChild(HalModul.el);
		this.load();
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
		FragFunction.load();
	}

}