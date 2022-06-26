class DataObj {
	// readonly modulAr: IModul[] = [];
	// readonly dekFungsiAr: IDekFungsi[] = [];
	readonly paramAr: IParam[] = [];
	readonly stmtAr: IStmt[] = [];
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
			stmt: this.stmtAr,
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

				//hapus data
				while (Variable.daftar.length > 0) {
					Variable.daftar.pop();
				}

				while (Modul.daftar.length > 0) {
					Modul.daftar.pop();
				}

				while (DekFungsi.daftar.length > 0) {
					DekFungsi.daftar.pop();
				}

				while (this.paramAr.length > 0) {
					this.paramAr.pop();
				}

				while (this.stmtAr.length > 0) {
					this.stmtAr.pop();
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
						nilai: item.nilai
					})
				})

				muatObj.modul.forEach((item: IModul) => {
					Modul.daftar.push({
						id: item.id,
						indukId: item.indukId,
						nama: item.nama,
						type: item.type,
						fungAr: item.fungAr,
						modulAr: item.modulAr,
						varAr: item.varAr
					})
				})

				muatObj.dekFung.forEach((item: IDekFungsi) => {
					DekFungsi.daftar.push({
						id: item.id,
						indukId: item.indukId,
						nama: item.nama,
						type: item.type,
						fungAr: item.fungAr,
						varAr: item.varAr
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
							expId: varIsi.expId,
							varId: varIsi.varId,
							stmtType: varIsi.stmtType,
							type: varIsi.type,
							expTipe: varIsi.expTipe,
							expValue: varIsi.expValue,
						};
						this.stmtAr.push(obj);
					}

				})

				muatObj.arg.forEach((item: IArg) => {
					this.argAr.push({
						id: item.id,
						indukId: item.indukId,
						nama: item.nama,
						type: item.type,
						refParamId: item.refParamId,
						tipeArg: item.tipeArg,
						value: item.value
					})
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
let dataObj: DataObj = new DataObj();