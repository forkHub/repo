class MainChar {

	static readonly BERDIRI: number = 1;
	static readonly JALAN: number = 2;

	private pFind: ha.pf.PathFinder;
	private pfHelper: ha.pf.PFHelper;
	private _pos: ha.pf.Point;
	public get pos(): ha.pf.Point {
		return this._pos;
	}

	private ruteJalan: Array<any> = [];
	private _map: PfMap;

	public get map(): PfMap {
		return this._map;
	}
	public set map(value: PfMap) {
		this._map = value;
	}

	private _view: ISprite;
	public get view(): ISprite {
		return this._view;
	}

	private state: number = 1;

	constructor() {
	}

	init(): void {
		this.pFind = new ha.pf.PathFinder();
		this.pfHelper = new ha.pf.PFHelper();
		this._pos = new ha.pf.Point();

		this._view = MuatAnimasi('./gbr/jln.png', 32, 32);

		this.initPathFinder();
	}

	initPathFinder() {
		this.pFind.flBlocked = ha.pf.PathFinder.BL_TERDEKAT;
		this.pfHelper.langkahTotal = 10;
		// this.pfHelper.

		this.pFind.checkCanMoveToPos = (x: number, y: number): boolean => {
			return this.map.isPassable(x, y);
		}

		this.pFind.checkSampai = (i: number, j: number, tx: number, ty: number): boolean => {
			var jrkX: number;
			var jrkY: number;

			jrkX = Math.abs(tx - i);
			jrkY = Math.abs(ty - j);

			if (jrkX == 0) {
				if (jrkY <= 1) {

					return true;
				}
			}

			if (jrkY == 0) {
				if (jrkX <= 1) {
					return true;
				}
			}

			return false;
		}
	}

	jalanKePos(i: number, j: number): void {
		if (!this.pfHelper.sedangJalan) {
			this.ruteJalan = this.pFind.cari(Math.floor(this.pos.x / 32), Math.floor(this.pos.y / 32), i, j);
			if (this.ruteJalan.length > 0) {
				this.pfHelper.start(this.ruteJalan);
				// this.updateAnim();
				this.state = MainChar.JALAN;
			}
		}
	}

	updateView(): void {
		this.view.x = this.pos.x;
		this.view.y = this.pos.y;
	}

	update(): void {
		if (this.state == MainChar.BERDIRI) {
			//kosong
		}
		else {
			this.pfHelper.update();
			this.pos.x = this.pfHelper.pos.x;
			this.pos.y = this.pfHelper.pos.y;

			if (!this.pfHelper.sedangJalan) {
				this.state = MainChar.BERDIRI;
			}
		}

		this.updateView();
	}

}