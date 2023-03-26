class Binop {

	static buatDef(indukId: number): IBinop {

		let obj: IBinop = {
			id: Id.id,
			indukId: indukId,
			ket: '',
			nama: '',
			type: TY_BINOP,
			exp1Id: Exp.buatDef(0).id,
			exp2Id: Exp.buatDef(0).id,
			opr: '*'
		}

		//TODO: validate

		dataObj.push(obj);

		return obj;
	}

	static hapus(id: number): void {
		dataObj.hapusId(id);
	}

	// static baru(indukId: number): IBinop {
	// 	let hasil: IBinop;

	// 	hasil = this.buatDef(indukId);
	// 	this.setExp(hasil, Exp.buatValue(hasil.id).id, Exp.buatValue(hasil.id).id);

	// 	return hasil;
	// }

	// private static setExp(binop: IBinop, id: number, id2: number): void {
	// 	binop.exp1Id = id;
	// 	binop.exp2Id = id2;
	// }

	static get(id: number): IBinop {
		let hasil: IBinop;

		hasil = dataObj.getById(id) as IBinop;

		if (hasil.type != TY_BINOP) {
			console.error(hasil);
			throw Error('invalid');
		}

		if (!hasil) {
			throw Error('binop gak ketemu: ' + id);
		}

		return hasil;
	}
}