class Variable {

	private _id: number;
	private _judul: string;

	static readonly daftar: IVariable[] = [];

	constructor(id: number, judul: string) {
		this._id = id;
		this._judul = judul;
	}

	static buat(judul: string): IVariable {
		let hasil: IVariable = new Variable(ha.comp.Util.id(), judul);
		this.daftar.push(hasil);

		return hasil;
	}

	static toObj(obj: IVariable): IVariable {
		return {
			id: obj.id,
			judul: obj.judul
		}
	}

	static fromObj(obj: IVariable): Variable {
		return new Variable(obj.id, obj.judul);
	}

	static load(data: IData[]): void {
		while (this.daftar.length > 0) {
			this.daftar.pop();
		}

		data.forEach((data: IData) => {
			if (data.type == 'variable') {
				let obj: IVariable = JSON.parse(data.data);
				let variable: Variable = this.fromObj(obj);
				this.daftar.push(variable);
			}
		})
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

interface IVariable {
	id: number;
	judul: string;
}