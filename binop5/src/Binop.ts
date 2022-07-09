class Binop {
	private static readonly daftar: IBinop[] = [];

	static baru(id: number, indukId: number, exp1Id: number, exp2Id: number): IBinop {
		let obj: IBinop = {
			// exp1: '',
			// exp1Tipe: '',
			// exp2: '',
			// exp2Tipe: '',
			id: id,
			indukId: indukId,
			ket: '',
			nama: '',
			type: TY_STMT,
			exp1Id: exp1Id,
			exp2Id: exp2Id
		}

		this.daftar.push(obj);
		return obj;
	}

	//todo hapus, read, update
}