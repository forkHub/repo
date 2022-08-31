class DataObj {
	readonly paramAr: IParam[] = [];
	readonly argAr: IArg[] = [];
	private readonly dataAr: IData[] = [];

	private _halModul: HalModule;
	public get halModul(): HalModule {
		return this._halModul;
	}

	private _halFungsi: DekFungsiEditor;
	public get halFungsi(): DekFungsiEditor {
		return this._halFungsi;
	}

	push(item: IData): void {
		// console.group('push');
		// console.log('push, id: ' + item.id);

		// this.debug();

		if (this.getById(item.id)) {
			console.log(this.dataAr);
			console.log(JSON.stringify(this.dataAr));
			throw Error('duplikat');
		}

		// this.debug();

		this.dataAr.push(item);

		// console.log(this.dataAr);
		// console.log(JSON.stringify(this.dataAr));

		this.validasi()

		// console.groupEnd();
	}

	debug(): void {
		console.group('debug:');
		console.log(this.dataAr);
		console.log(JSON.stringify(this.dataAr));
		console.groupEnd();
	}

	getById(id: number): IData {
		let hasil: IData;

		this.dataAr.forEach((item: IData) => {
			if (item.id === id) {
				hasil = item;
			}
		})

		return hasil;
	}

	getByIndukId(id: number): IData {
		let hasil: IData;

		this.dataAr.forEach((item: IData) => {
			if (item.indukId == id) {
				hasil = item;
			}
		})

		if (!hasil) {
			throw Error('get by induk id, not found: ' + id);
		}
		else {
			return hasil;
		}

	}

	getByType(ty: string): IData[] {
		let hasil: IData[] = [];

		this.dataAr.forEach((item: IData) => {
			if (item.type == ty) {
				hasil.push(item);
			}
		})

		return hasil;
	}

	getType(id: number): string {
		let hasil: IData;

		hasil = this.getById(id);

		return hasil.type;
	}

	hapusSemua(): void {
		window.localStorage.clear();
	}

	hapusId(id: number): void {
		for (let i: number = 0; i < this.dataAr.length; i++) {
			if (this.dataAr[i].id == id) {
				this.dataAr.splice(i, 1);
				return;
			}
		}

		throw Error('delete tidak ketemu ' + id);
	}

	initHalaman(): void {
		this._halFungsi = new DekFungsiEditor();
		this._halModul = new HalModule();
	}

	simpan(): void {
		let str: string = '';
		let simpan: ISimpan;

		simpan = {
			var: Variable.daftar,
			// dekFung: DekFungsi.daftar,
			modul: Modul.daftar,
			param: this.paramAr,
			stmt: Stmt.daftar,
			value: [],	//TODO:
			arg: this.argAr
		};

		str = JSON.stringify(simpan);

		window.localStorage.setItem('ha.binop', str);
	}

	load(): void {
		try {
			let str: string;
			str = window.localStorage.getItem('ha.binop');

			if (str) {
				let muatObj: ISimpan;
				muatObj = JSON.parse(str);

				//def
				if (!muatObj.stmt) muatObj.stmt = []

				Stmt.muat(muatObj);

				//hapus data
				while (Variable.daftar.length > 0) {
					Variable.daftar.pop();
				}



				// while (DekFungsi.daftar.length > 0) {
				// 	DekFungsi.daftar.pop();
				// }

				while (this.paramAr.length > 0) {
					this.paramAr.pop();
				}

				while (this.argAr.length > 0) {
					this.argAr.pop();
				}

				//isi data
				muatObj.var.forEach((item: IVar) => {
					Variable.daftar.push({
						id: item.id,
						indukId: item.indukId,
						nama: item.nama,
						type: item.type,
						value: item.value,
						ket: item.ket
					})
				})

				Modul.muat(muatObj);

				// muatObj.dekFung.forEach((item: IDekFungsi) => {
				// 	DekFungsi.daftar.push({
				// 		id: item.id,
				// 		indukId: item.indukId,
				// 		nama: item.nama,
				// 		type: item.type,
				// 		stmtAr: item.stmtAr,
				// 		varAr: item.varAr,
				// 		ket: item.ket,
				// 		paramAr: item.paramAr
				// 	})
				// })

				muatObj.param.forEach((item: IParam) => {
					this.paramAr.push({
						id: item.id,
						indukId: item.indukId,
						nama: item.nama,
						type: item.type,
						ket: item.ket
					})
				})

				muatObj.arg.forEach((item: IArg) => {
					this.argAr.push({
						id: item.id,
						indukId: item.indukId,
						nama: item.nama,
						type: item.type,
						refParamId: item.refParamId,
						tipeArg: item.tipeArg,
						value: item.value,
						ket: item.ket
					})
				})

			}
			else {

			}
		}
		catch (e) {
			console.error(e);
			// ha.comp.dialog.tampil(e);
		}
	}

	validasi(): void {
		for (let i: number = 0; i < this.dataAr.length; i++) {
			for (let j: number = i + 1; j < this.dataAr.length; j++) {
				if (this.dataAr[i].id == this.dataAr[j].id) {
					throw Error('i: ' + i + '/j: ' + j);
				}
			}
		}
	}
}
let dataObj: DataObj = new DataObj();