class Tombol implements ITombol {

	static readonly DOT: string = 'dot';
	static readonly POLIGON: string = 'poligon';
	static readonly PILIH: string = 'pilih';

	static readonly DEBUG: string = 'debug';

	static readonly OK: string = 'ok';
	static readonly BATAL: string = 'batal';

	static readonly GESER: string = 'geser';
	static readonly SKALA: string = 'skala';
	static readonly PUTAR: string = 'putar';
	static readonly PIVOT: string = 'pivot';

	private static daftar: ITombol[] = [];

	private _label: string = '';
	private _view: HTMLButtonElement;

	constructor(label: string) {
		this._view = document.createElement('button');
		this._view.innerText = label;
		this._label = label;
	}

	static init(): void {
		this.buat(this.DOT);
		this.buat(this.POLIGON);
		this.buat(this.DEBUG);
		this.buat(this.PILIH);
		this.buat(this.OK);
		this.buat(this.BATAL);
		this.buat(this.GESER);
		this.buat(this.PIVOT);
		this.buat(this.SKALA);
		this.buat(this.PUTAR);
	}

	static getById(label: string): ITombol {
		let hasil: ITombol;

		this.daftar.forEach((item: ITombol) => {
			if (item.label == label) {
				hasil = item;
				return;
			}
		})

		if (!hasil) {
			throw Error('hasil tidak ketemu');
		}

		return hasil;
	}

	static buat(label: string): ITombol {
		let hasil: ITombol;

		hasil = new Tombol(label);

		this.push(hasil);

		return hasil;
	}

	static push(tbl: ITombol): void {
		this.daftar.push(tbl);

		//TODO: validate
	}

	public get label(): string {
		return this._label;
	}
	public set label(value: string) {
		this._label = value;
	}
	public get view(): HTMLButtonElement {
		return this._view;
	}
	public set view(value: HTMLButtonElement) {
		this._view = value;
	}


}