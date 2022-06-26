///<reference path="./InterfaceStmt.ts"/>

class PanggilFungsi extends ha.comp.BaseComponent {
	private _fungsi: IDekFungsi;
	private _item: IPanggilFungsi;
	private readonly paramAR: IParam[] = [];

	public get item(): IPanggilFungsi {
		return this._item;
	}
	public set item(value: IPanggilFungsi) {
		this._item = value;
	}
	public get fungsi(): IDekFungsi {
		return this._fungsi;
	}
	public set fungsi(value: IDekFungsi) {
		this._fungsi = value;
	}

	constructor() {
		super();
		this._template = `
			<div class='panggil-fungsi'>
				<div class='nama'></div>
				<div class='arg'></div>
			</div>
		`;
		this.build();
		this.populateParam();
	}

	renderParam(): void {
		this.paramAR.forEach(() => {

		})
	}

	populateParam(): void {
		// let param: IParam[] = [];

		//kumpulin param
		while (this.paramAR.length > 0) {
			this.paramAR.pop();
		}

		dataObj.paramAr.forEach((item: IParam) => {
			if (item.indukId == this._item.id) {
				this.paramAR.push(item);
			}
		})
	}
}