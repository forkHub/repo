export class Id {
	private static _base: number = 0;

	static get id(): number {
		if (this._base <= 0) {
			this._base = Date.now();
		}

		this._base++;
		return this._base;
	}
}