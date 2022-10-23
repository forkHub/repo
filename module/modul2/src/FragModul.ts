class FragModul {
	private static _cont: HTMLElement = ha.comp.Util.getEl('div.sub-modul div.daftar', document.body);
	private static _dipilih: HTMLElement;
	public static get dipilih(): HTMLElement {
		return FragModul._dipilih;
	}
	public static set dipilih(value: HTMLElement) {
		FragModul._dipilih = value;
	}


	static load(): void {
		let modul: IModul = Modul.getId(Kontek.modulId);

		this._cont.innerHTML = '';

		modul.sub.forEach((id: number) => {
			let sub: IModul = Modul.getId(id);
			this.buatView(sub);
		});
	}

	private static buatView(hasil: IModul): void {
		let view: HTMLElement;

		view = ha.comp.Util.getTemplate('div.item');
		view.setAttribute('id', hasil.id + '');
		view.setAttribute('type', MODUL);
		view.querySelector('span.nama').innerHTML = hasil.judul;

		this._cont.appendChild(view);
	}

	static tombolTambahKlik(): void {
		console.log('tambah klik');

		let judul: string;

		judul = window.prompt('nama modul:');

		let hasil: IModul = Modul.buat(judul);

		Modul.getAktif().sub.push(hasil.id);

		this.buatView(hasil);

		Data.simpan();
	}

	static itemKlik(el: HTMLElement): void {
		console.log(el);

		if (this.dipilih) {
			this.dipilih.classList.remove('dipilih');
		}

		this.dipilih = el;
		this.dipilih.classList.add('dipilih');
	}

	static tombolHapusKlik(el: HTMLElement): void {
		console.log('hapus klik');

		if (this.dipilih) {
			el.parentElement.removeChild(el);
			let id: number = parseInt(el.getAttribute('id'));
			Modul.hapus(id);
			Data.simpan();
		}
		else {
			console.log('tidak ada dipilih');
		}
	}

	static tombolViewKlik(): void {

	}

	static tombolEditKlik(): void {

	}
}