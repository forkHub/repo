class DataObj {
	// readonly modulAr: IModul[] = [];
	// readonly dekFungsiAr: IDekFungsi[] = [];
	readonly paramAr: IParam[] = [];
	// readonly stmtAr: IStmt[] = [];
	readonly argAr: IArg[] = [];

	private _halModul: HalModule;
	public get halModul(): HalModule {
		return this._halModul;
	}

	private _halFungsi: DekFungsiEditor;
	public get halFungsi(): DekFungsiEditor {
		return this._halFungsi;
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
			dekFung: DekFungsi.daftar,
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



				while (DekFungsi.daftar.length > 0) {
					DekFungsi.daftar.pop();
				}

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
						nilai: item.nilai,
						ket: item.ket
					})
				})

				Modul.muat(muatObj);

				muatObj.dekFung.forEach((item: IDekFungsi) => {
					DekFungsi.daftar.push({
						id: item.id,
						indukId: item.indukId,
						nama: item.nama,
						type: item.type,
						stmtAr: item.stmtAr,
						varAr: item.varAr,
						ket: item.ket
					})
				})

				muatObj.param.forEach((item: IParam) => {
					this.paramAr.push({
						id: item.id,
						indukId: item.indukId,
						nama: item.nama,
						type: item.type,
						prevIdx: item.prevIdx,
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
}
let dataObj: DataObj = new DataObj();