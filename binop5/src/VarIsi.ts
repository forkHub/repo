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
					varId: varIsi.varId,
					stmtType: varIsi.stmtType,
					type: varIsi.type,
					ket: varIsi.ket,
					value: varIsi.value,
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
			stmtType: STMT_VAR_ISI,
			type: TY_STMT,
			ket: '',
			value: '0'
		}

		Stmt.daftar.push(obj);
		dataObj.simpan();

		this.validasi(obj);

		return obj;
	}

	static terj(obj: IVarIsi): string {
		let hasil: string = Variable.nama(obj.varId) + " = ";

		hasil += obj.value;

		return hasil;
	}

	static validasi(obj: IVarIsi): void {
		if (obj.indukId > 0) {
			//masih ambigue tidak bisa dideteksi tipe dari induk apakah fungsi ataukah modul
		}

		if (obj.varId > 0) {
			Variable.getVar(obj.varId);
		}

	}

}