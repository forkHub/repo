class Exp {
	private readonly daftar: IExp[] = [];

	buat(indukId: number, simpan: boolean): IExp {
		let hasil: IExp;

		hasil = {
			id: Id.id,
			binopId: 0,
			fungId: 0,
			indukId: indukId,
			ket: '',
			nama: '',
			type: TY_EXP,
			value: '',
			varId: 0,
			tipeExp: ARG_VALUE
		}

		if (simpan) {
			this.daftar.push(hasil);
		}

		return hasil;
	}

}
const exp: Exp = new Exp();