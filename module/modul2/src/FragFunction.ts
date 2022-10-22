class FragFunction {
	private static _cont: HTMLElement = ha.comp.Util.getEl('div.fungsi div.daftar', document.body);
	private static _dipilih: HTMLElement;

	public static get dipilih(): HTMLElement {
		return this._dipilih;
	}
	public static set dipilih(value: HTMLElement) {
		this._dipilih = value;
	}

	static load(): void {
		let modul: IModul = Modul.getId(Kontek.modulId);

		modul.fungsi.forEach((id: number) => {
			let fungsi: IFungsi = Fungsi.getId(id);
			this.buatView(fungsi);
		});

	}

	private static buatView(hasil: IFungsi): void {
		let view: HTMLElement;

		view = ha.comp.Util.getTemplate('div.item');
		view.setAttribute('id', hasil.id + '');
		view.setAttribute('type', FUNGSI);
		view.querySelector('span.nama').innerHTML = hasil.judul;

		view.onclick = () => {
			FragFunction.itemKlik(view);
		}

		this._cont.appendChild(view);
	}

	static tombolTambahKlik(): void {
		console.log('tambah klik');

		let judul: string;
		let hasil: IFungsi;

		judul = window.prompt('nama modul:');

		if (judul) {
			hasil = Fungsi.buat(judul);
			Modul.getAktif().fungsi.push(hasil.id);
			this.buatView(hasil);
			Data.simpan();
		}
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
			Fungsi.hapus(id);
			Data.simpan();
		}
		else {
			console.log('tidak ada dipilih');
		}
	}

	static tombolViewKlik(): void {

	}

	static tombolEditKlik(): void {
		if (!this.dipilih) {
			console.error('tidak ada yang dipilih');
		}

		//halaman edit fungsi
	}
}