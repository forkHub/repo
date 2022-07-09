class VarIsi {
	/**
	 * 
	 */

	static varRef(obj: IVarIsi, value: number) {
		ha.comp.Util.stackTrace();
		obj.varId = value;
	}

	static muat(muatObj: ISimpan): void {
		muatObj.stmt.forEach((item: IStmt) => {
			if (item.stmtType == STMT_VAR_ISI) {
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
					ket: item.ket
				};
				Stmt.daftar.push(obj);
			}

		})
	}

	static buatVarIsi(indukId: number): IVarIsi {
		let obj: IVarIsi;

		//buat obj
		obj = {
			id: Id.id,
			indukId: indukId,
			nama: '',
			prevIdx: 0,
			varId: -1,
			expId: -1,
			stmtType: STMT_VAR_ISI,
			type: TY_STMT,
			expTipe: ARG_VALUE,
			expValue: '0',
			ket: ''
		}

		Stmt.daftar.push(obj);
		dataObj.simpan();

		this.validasi(obj);

		return obj;
	}

	static terj(obj: IVarIsi): string {
		let hasil: string = Variable.nama(obj.varId) + " = ";

		if (obj.expTipe == ARG_REF_VAR) {
			hasil += Variable.nama(obj.expId);
		}
		else if (obj.expTipe == ARG_VALUE) {
			hasil += obj.expValue;
		}
		else {
			throw Error('');
		}

		return hasil;
	}

	static validasi(obj: IVarIsi): void {
		if (obj.indukId > 0) {
			//masih ambigue tidak bisa dideteksi tipe dari induk
		}

		if (obj.expId > 0) {
			//kemungkinan dihapus karena var isi biasa hanya berisi value
		}

		if (obj.varId > 0) {
			Variable.getVar(obj.varId);
		}

	}

}