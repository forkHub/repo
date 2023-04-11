class Data {
	static readonly nama: string = 'ha.binop';
	static readonly data: IData[] = [];

	static simpan() {
		console.group('simpan');

		window.localStorage.setItem(this.nama, JSON.stringify(this.data));
		console.groupEnd();
	}

	static kosong(): void {
		while (this.data.length > 0) {
			this.data.pop();
		}
	}

	static load() {
		try {
			let dataStr: string = window.localStorage.getItem(this.nama);

			this.kosong();

			if (dataStr != null) {
				let obj: IData[] = JSON.parse(dataStr);
				obj.forEach((item: IData) => {
					this.data.push(item);
				})
			}
		}
		catch (e) {
			console.error(e);
			ha.comp.dialog.tampil(e);
		}
	}
}

interface IData {
	id: number,
	type: string,
	meta: string
}