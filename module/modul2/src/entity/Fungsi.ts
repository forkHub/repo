class Fungsi implements IFungsi {
	static readonly daftar: IFungsi[] = [];

	private _id: number;
	private _judul: string;


	readonly variable: number[] = [];
	readonly stmt: number[] = [];
	readonly param: number[] = [];

	constructor(id: number, judul: string) {
		this._id = id;
		this._judul = judul;
	}

	static toObj(obj: IFungsi): IFungsi {
		return {
			id: obj.id,
			judul: obj.judul,
			param: obj.param,
			stmt: obj.stmt,
			variable: obj.variable
		}
	}

	static fromObj(obj: IFungsi): IFungsi {
		let hasil: IFungsi = new Fungsi(obj.id, obj.judul);

		//param
		if (obj.param) {
			obj.param.forEach((id: number) => {
				hasil.param.push(id);
			});
		}

		//variable
		if (obj.variable) {
			obj.variable.forEach((id: number) => {
				hasil.variable.push(id);
			});
		}

		//stmt
		if (obj.stmt) {
			obj.stmt.forEach((id: number) => {
				hasil.stmt.push(id);
			});
		}

		return hasil;
	}

	static hapus(id: number) {
		for (let i: number = 0; i < this.daftar.length; i++) {
			if (this.daftar[i].id == id) {
				this.daftar.splice(i, 1);
			}
		}
	}

	static getDipilih(): IFungsi {
		return this.getId(Kontek.fungsiId);
	}

	static getId(id: number): IFungsi {
		let hasil: IFungsi;

		this.daftar.forEach((item: IFungsi) => {
			if (item.id == id) {
				hasil = item;
			}
		})

		return hasil;
	}

	static buat(judul: string): IFungsi {
		let hasil: IFungsi = new Fungsi(ha.comp.Util.id(), judul);
		this.daftar.push(hasil);

		return hasil;
	}

	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this._id = value;
	}

	public get judul(): string {
		return this._judul;
	}

	public set judul(value: string) {
		this._judul = value;
	}



}

interface IFungsi {
	id: number
	judul: string
	param: number[]
	variable: number[];
	stmt: number[]
}