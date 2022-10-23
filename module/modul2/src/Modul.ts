class Modul implements IModul {
	static readonly daftar: IModul[] = [];

	private _id: number;
	private _judul: string;

	readonly sub: number[] = [];
	readonly variable: number[] = [];
	readonly fungsi: number[] = [];

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

	constructor(id: number, judul: string) {
		this._judul = judul;
		this._id = id;
	}

	static buat(judul: string): IModul {
		let hasil: Modul;

		hasil = new Modul(ha.comp.Util.id(), judul);
		this.daftar.push(hasil);

		return hasil;
	}

	static getId(id: number): IModul {
		let hasil: IModul;

		this.daftar.forEach((item: IModul) => {
			if (item.id == id) {
				hasil = item;
			}
		});

		return hasil;
	}

	static getAktif(): IModul {
		return this.getId(Kontek.modulId);
	}


	static induk(modul: IModul): IModul {
		let hasil: IModul;

		this.daftar.forEach((item: IModul) => {
			if (item.sub.indexOf(modul.id) >= 0) {
				hasil = item;
			}
		});

		return hasil;
	}

	static keUtama(modul: IModul): IModul {
		//TODO:
		return modul;
	}

	static hapus(id: number): void {
		for (let i: number = 0; i < this.daftar.length; i++) {
			if (this.daftar[i].id == id) {
				this.daftar.splice(i, 1);
			}
		}
	}

	static toObj(modul: IModul): IModul {
		return {
			id: modul.id,
			judul: modul.judul,
			variable: modul.variable,
			sub: modul.sub,
			fungsi: modul.fungsi
		}
	}

	static fromObj(obj: IModul): Modul {
		let hasil: Modul = new Modul(obj.id, obj.judul);

		if (obj.variable) {
			obj.variable.forEach((n: number) => {
				hasil.variable.push(n);
			})
		}

		if (obj.sub) {
			obj.sub.forEach((n: number) => {
				hasil.sub.push(n);
			});
		}

		if (obj.fungsi) {
			obj.fungsi.forEach((id: number) => {
				hasil.fungsi.push(id);
			});
		}

		return hasil;
	}

	static load(data: IData[]) {
		while (this.daftar.length > 0) {
			this.daftar.pop();
		}

		data.forEach((item: IData) => {
			if (item.type == MODUL) {
				this.daftar.push(this.fromObj(JSON.parse(item.data)));
				console.log('modul push');
			}
		})
	}
}

interface IModul {
	id: number;
	judul: string
	sub: number[]
	variable: number[]
	fungsi: number[]
}