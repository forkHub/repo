class Data implements IData {

	private _id: number;
	private _type: string;
	private _data: string;

	static readonly data: IData[] = [];
	static readonly namaDb: string = 'ha.modul.data';

	constructor(id: number, type: string, data: string) {
		this.id = id;
		this.type = type;
		this.data = data;
	}

	static toObj(data: IData): IData {
		return {
			id: data.id,
			type: data.type,
			data: data.data
		}
	}

	static simpan(): void {
		let obj: IData[] = [];

		//modul
		Modul.daftar.forEach((item: IModul) => {
			let data: IData = Data.toObj(new Data(item.id, MODUL, JSON.stringify(Modul.toObj(item))));
			obj.push(data);
		});

		//variable
		Variable.daftar.forEach((item: IVariable) => {
			obj.push(Data.toObj(new Data(
				item.id,
				VARIABLE,
				JSON.stringify(Variable.toObj(item))
			)));
		});

		//fungsi
		Fungsi.toData(obj);

		window.localStorage.setItem(this.namaDb, JSON.stringify(obj));
	}

	static load(): void {
		let str: string = window.localStorage.getItem(this.namaDb);
		let obj: IData[] = JSON.parse(str);

		while (this.data.length > 0) {
			this.data.pop();
		}

		obj.forEach((obj: IData) => {
			this.data.push(new Data(obj.id, obj.type, obj.data));
			// id: obj.id,
			// 	type: obj.type,
			// 		data: obj.data
		});
	};

	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this._id = value;
	}
	public get type(): string {
		return this._type;
	}
	public set type(value: string) {
		this._type = value;
		// if (value == MODUL) {
		// 	ha.comp.Util.stackTrace();
		// }
	}

	public get data(): string {
		return this._data;
	}
	public set data(value: string) {
		this._data = value;
	}

}

interface IData {
	id: number,
	type: string,
	data: string
}