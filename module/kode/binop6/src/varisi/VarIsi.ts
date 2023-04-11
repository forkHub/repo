class VarIsi {

	static muat(muatObj: ISimpan): void {
		muatObj.stmt.forEach((item: IStmt) => {
			if (item.stmtType == STMT_VAR_ISI) {
				let varIsi: IVarIsi = item as IVarIsi;
				let obj: IVarIsi = {
					id: varIsi.id,
					indukId: varIsi.indukId,
					nama: varIsi.nama,
					// prevIdx: varIsi.prevIdx,
					varRefId: varIsi.varRefId,
					stmtType: varIsi.stmtType,
					type: varIsi.type,
					ket: varIsi.ket,
					// value: varIsi.value,
					// exp: varIsi.exp,
					expId: varIsi.expId
				};
				Stmt.daftar.push(obj);
			}

		})
	}

	static buatDef(indukId: number): IVarIsi {
		let hasil: IVarIsi;

		hasil = this.buatDasar(indukId);
		hasil.expId = Exp.buatDef(hasil.id).id;
		hasil.varRefId = VarRef.buat(hasil.id).id;

		Stmt.daftar.push(hasil);

		return hasil;
	}

	private static buatDasar(indukId: number): IVarIsi {
		let obj: IVarIsi;
		// let expObj: IExp;
		// let valueObj: IValue;

		//buat obj
		obj = {
			id: Id.id,
			indukId: indukId,
			nama: '',
			varRefId: -1,
			stmtType: STMT_VAR_ISI,
			type: TY_STMT,
			ket: '',
			expId: 0,
		}

		// valueObj = value.buat(0);
		// expObj = exp.buatValue(obj.id, valueObj.id);
		// obj.refId = expObj.id;

		return obj;
	}

	static terj(obj: IVarIsi): string {
		let hasil: string = Variable.nama(obj.varRefId) + " = ";

		// hasil += obj.value;

		return hasil;
	}

	static validasi(obj: IVarIsi): void {
		if (obj.indukId > 0) {
			//masih ambigue tidak bisa dideteksi tipe dari induk apakah fungsi ataukah modul
		}

		if (obj.varRefId > 0) {
			Variable.get(obj.varRefId);
		}


		//self
		Stmt.get(obj.id); //TODO: check
	}

	static get(id: number): IVarIsi {
		let hasil: IVarIsi;

		hasil = Stmt.get(id) as IVarIsi;
		if (hasil.type != TY_STMT) {
			throw Error('');
		}

		return hasil;
	}

}