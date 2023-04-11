//TODO: dibuat static
class Value {

	static hapus(id: number): void {
		id;
		//TODO: sementara hapus tidak diimplement
	}

	static buat(indukId: number): IValue {
		let hasil: IValue;  //TODO:

		// console.log('buat value:');

		hasil = new ValueObj(
			Id.id,
			indukId,
			'',
			'',
			'teks',
			TY_VALUE,
			'0'
		)

		dataObj.push(hasil);
		dataObj.simpan();

		this.validasi(hasil);

		return hasil;
	}

	static get(id: number): IValue {
		let hasil: IValue;

		// console.log('get value by id: ' + id);

		hasil = dataObj.getById(id) as IValue;

		if (hasil.type != TY_VALUE) {
			console.log('get by id, value error: ')
			console.log(hasil);
			throw Error('value invalid, id: ' + id);
		}

		if (!hasil) {
			throw Error('value tidak ketemu: ' + id);
		}

		return hasil;
	}

	static validasi(obj: IValue): void {
		this.get(obj.id);
	}

	static setIndukId(obj: IValue, value: number): void {
		obj.indukId = value;
	}

}

// const value: Value = new Value();