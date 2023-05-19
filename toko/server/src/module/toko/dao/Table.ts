import { IBarangObj } from "../Type";

export class Table {
	private _tblBarang: IBarangObj = {
	};

	public get tblBarang(): IBarangObj {
		return this._tblBarang;
	}
}