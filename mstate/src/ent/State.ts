///<reference path="./Id.ts"/>

class State implements IState {
	static readonly IDLE: string = 'idle';
	static readonly PILIH: string = 'pilih';
	static readonly DIPILIH: string = 'dipilih';
	static readonly GESER: string = 'geser';
	static readonly SKALA: string = 'skala';
	static readonly PUTAR: string = 'putar';
	static readonly PILIH_PIVOT: string = 'pilih_pivot';

	private static _daftar: IState[] = [];
	private static _history: string[] = [];
	private static _aktif: string;
	private static _onChange: () => void;

	private _id: number = 0;
	private _nama: string = '';
	private _trans: string[] = [];

	constructor(nama: string) {
		this._id = Id.id;
		this._nama = nama;
	}

	static init(): void {
		this.buat(State.IDLE);

		this.buat(State.PILIH);
		this.buat(State.DIPILIH);
		this.buat(State.PILIH_PIVOT);

		this.buat(State.GESER);
		this.buat(State.SKALA);
		this.buat(State.PUTAR);

		// this.ganti(this.getByNama(State.IDLE));
	}

	static getHistory(): string {
		let hasil: string = '';

		this._history.forEach((item: string) => {
			hasil += '/' + item
		})

		return hasil;
	}

	static getByNama(nama: string): IState {
		let hasil: IState;

		this.slice.forEach((item: IState) => {
			if (item.nama == nama) {
				hasil = item;
				return;
			}
		})

		return hasil;
	}

	static buat(nama: string): IState {
		let state: IState;

		state = new State(nama);
		this._daftar.push(state);

		return state;
	}

	static ganti(state: string): void {
		while (this._history.length > 0) {
			this._history.pop();
		}

		this.push(state);
	}

	static push(state: string): void {
		this._aktif = state;
		this._history.push(state);
		setTimeout(() => {
			this._onChange();
		}, 0);
	}

	static pop(): void {
		if (this._history.length == 0) return;
		this._history.pop();

		this._aktif = this._history[this._history.length - 1];
		setTimeout(() => {
			this._onChange();
		}, 0);
	}

	static refresh(): void {
		setTimeout(() => {
			this._onChange();
		}, 0);
	}

	static geser(state: string): void {
		this._history.pop();
		this._history.push(state);

		setTimeout(() => {
			this._onChange();
		}, 0);
	}

	public static get slice(): IState[] {
		return this._daftar.slice();
	}

	public static get aktif(): string {
		return this._aktif;
	}

	public static get onChange(): () => void {
		return this._onChange;
	}
	public static set onChange(value: () => void) {
		this._onChange = value;
	}

	public get trans(): string[] {
		return this._trans;
	}
	public set trans(value: string[]) {
		this._trans = value;
	}
	public get nama(): string {
		return this._nama;
	}
	public set nama(value: string) {
		this._nama = value;
	}
	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this._id = value;
	}


}