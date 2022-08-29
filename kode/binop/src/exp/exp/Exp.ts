class Exp {
	static buatDef(indukId: number): IExp {
		let hasil: IExp;

		hasil = {
			id: Id.id,
			indukId: indukId,
			ket: '',
			nama: '',
			type: TY_EXP,
			refId: 0,
		}

		dataObj.push(hasil);

		return hasil;
	}

	static validate(obj: IExp): void {
		this.get(obj.id);

		if (obj.refId > 0) {
			dataObj.getById(obj.refId);
		}
	}

	static get(id: number): IExp {
		let hasil: IExp;

		hasil = dataObj.getById(id) as IExp;

		if (!hasil) {
			throw Error('exp tidak ketemu, id: ' + id);
		}

		if (hasil.type != TY_EXP) {
			console.error(hasil);
			throw Error('tipe invalid, id: ' + id);
		}

		return hasil;
	}
}
