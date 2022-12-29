namespace fg {

	export class PFCell {

		protected _dist: number = 0;
		protected _parent: PFCell;
		protected _x: number = 0;
		protected _y: number = 0;
		protected _idx: number = -1;
		protected _open: Boolean = true;

		public PFCell() {

		}

		public destroy(): void {
			this._parent = null;
		}

		public toStringRef(): String {
			return "[" + this._x + "-" + this._y + "]";
		}

		public get dist(): number {
			return this._dist;
		}

		public set dist(value: number) {
			this._dist = value;
		}

		public get x(): number {
			return this._x;
		}

		public set x(value: number) {
			this._x = value;
		}

		public get y(): number {
			return this._y;
		}

		public set y(value: number) {
			this._y = value;
		}

		public get idx(): number {
			return this._idx;
		}

		public set idx(value: number) {
			this._idx = value;
		}

		public get open(): Boolean {
			return this._open;
		}

		public set open(value: Boolean) {
			this._open = value;
		}

		public get parent(): PFCell {
			return this._parent;
		}

		public set parent(value: PFCell) {
			this._parent = value;
		}
	}

}