class Data {
	readonly variableAr: IVar[] = [];
	readonly modulAr: IModul[] = [];
	readonly dekFungsiAr: IDekFungsi[] = [];
	readonly paramAr: IParam[] = [];
	readonly stmtAr: IStmt[] = [];

	private _halModul: HalModule;
	public get halModul(): HalModule {
		return this._halModul;
	}

	private _halFungsi: df.HalDeklarasiFungsi;
	public get halFungsi(): df.HalDeklarasiFungsi {
		return this._halFungsi;
	}

	buatHalaman(): void {
		this._halFungsi = new df.HalDeklarasiFungsi();
		this._halModul = new HalModule();
	}

	simpan(): void {
		let str: string = '';
		let simpan: ISimpan;

		simpan = {
			var: this.variableAr,
			dekFung: this.dekFungsiAr,
			// exp: [],
			modul: this.modulAr,
			param: this.paramAr,
			// ref: [],
			stmt: this.stmtAr,
			value: [],
			arg: [] //TODO:
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

				//hapus data
				while (this.variableAr.length > 0) {
					this.variableAr.pop();
				}

				while (this.modulAr.length > 0) {
					this.modulAr.pop();
				}

				while (this.dekFungsiAr.length > 0) {
					this.dekFungsiAr.pop();
				}

				while (this.paramAr.length > 0) {
					this.paramAr.pop();
				}

				while (this.stmtAr.length > 0) {
					this.stmtAr.pop();
				}

				//TODO: 

				//isi data
				muatObj.var.forEach((item: IVar) => {
					this.variableAr.push({
						id: item.id,
						indukId: item.indukId,
						nama: item.nama,
						type: item.type
					})
				})

				muatObj.modul.forEach((item: IModul) => {
					this.modulAr.push({
						id: item.id,
						indukId: item.indukId,
						nama: item.nama,
						type: item.type
					})
				})

				muatObj.dekFung.forEach((item: IDekFungsi) => {
					this.dekFungsiAr.push({
						id: item.id,
						indukId: item.indukId,
						nama: item.nama,
						type: item.type
					})
				})

				muatObj.param.forEach((item: IParam) => {
					this.paramAr.push({
						id: item.id,
						indukId: item.indukId,
						nama: item.nama,
						type: item.type,
						prevIdx: item.prevIdx
					})
				})

				muatObj.stmt.forEach((item: IStmt) => {
					if (item.stmtType == STMT_PANGGIL_FUNGSI) {

					}
					else if (item.stmtType == STMT_VAR_ISI) {
						let varIsi: IVarIsi = item as IVarIsi;
						let obj: IVarIsi = {
							id: varIsi.id,
							indukId: varIsi.indukId,
							nama: varIsi.nama,
							prevIdx: varIsi.prevIdx,
							refExpId: varIsi.refExpId,
							refVarId: varIsi.refVarId,
							stmtType: varIsi.stmtType,
							type: varIsi.type,
						};
						this.stmtAr.push(obj);
					}

				})

			}
			else {

			}
		}
		catch (e) {
			ha.comp.dialog.tampil(e);
		}
	}
}
let data: Data = new Data();