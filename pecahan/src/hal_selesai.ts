class HalSelesai {
	private static _el: HTMLElement;
	public static get el(): HTMLElement {
		return HalSelesai._el;
	}
	public static set el(value: HTMLElement) {
		HalSelesai._el = value;
	}

	static tombolMulaiLagiKlik() {
		window.top.location.reload();
	}

	static tombolHalUtamaKlik() {
		window.top.location.href = urlHalUtama;
	}

	static async tampil(cont: HTMLElement, nilai: number) {

		if (!this.el) {
			this.el = ha.comp.Util.createEl(await ha.comp.File.load('./data/selesai.html'));
		}

		this.el.querySelector('h3.nilai').innerHTML = 'Nilai: ' + nilai + '';

		cont.appendChild(this.el);
	}
}