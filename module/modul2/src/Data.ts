class Data {
	static readonly data: IData[] = [];
	static readonly namaDb: string = 'ha.modul.data';

	static simpan(): void {
		let obj: IData[] = [];

		//modul
		Modul.daftar.forEach((item: IModul) => {
			obj.push({
				id: item.id,
				type: 'modul',
				data: JSON.stringify(Modul.toObj(item))
			});

		});

		//variable
		Variable.daftar.forEach((item: IVariable) => {
			obj.push({
				id: item.id,
				type: 'variable',
				data: JSON.stringify(Variable.toObj(item))
			});
		});

		//fungsi
		Fungsi.daftar.forEach((item: IFungsi) => {
			obj.push({
				id: item.id,
				type: FUNGSI,
				data: JSON.stringify(Fungsi.toObj(item))
			});
		});


		window.localStorage.setItem(this.namaDb, JSON.stringify(obj));
	}

	static load(): void {
		let str: string = window.localStorage.getItem(this.namaDb);
		let obj: IData[] = JSON.parse(str);

		while (this.data.length > 0) {
			this.data.pop();
		}

		obj.forEach((obj: IData) => {
			this.data.push({
				id: obj.id,
				type: obj.type,
				data: obj.data
			})
		})

	}
}

interface IData {
	id: number,
	type: string,
	data: string
}