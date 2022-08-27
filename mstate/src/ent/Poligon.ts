class Poligon {
	private static daftar: IPoligon[];
	private static _onBuat: () => void;

	public static set onBuat(value: () => void) {
		Poligon._onBuat = value;
	}

	static slice(): IPoligon[] {
		return this.daftar;
	}

	static render(p: IPoligon, ctx: CanvasRenderingContext2D): void {
		// p.dot.forEach((n: number) => {
		// 	let dot: IDot = Dot.getById(n);
		// 	Dot.render(dot, ctx);
		// });

		ctx.beginPath();
		p.dot.forEach((n: number, idx: number) => {
			let dot: IDot = Dot.getById(n);

			if (idx == 0) {
				ctx.moveTo(dot.posGlobal.x, dot.posGlobal.y)
			}
			else {
				ctx.lineTo(dot.posGlobal.x, dot.posGlobal.y);
			}

		});

		ctx.stroke();
	}

	static buatKotak(x: number, y: number): number {
		let id: number;
		let p: IPoligon;

		p = {
			id: Id.id,
			dot: []
		}

		//tengah
		id = Dot.buat(x, y, 0);
		p.dot.push(id);

		//
		id = Dot.buat(-10, -10, id);
		p.dot.push(id);

		id = Dot.buat(10, -10, id);
		p.dot.push(id);

		id = Dot.buat(10, 10, id);
		p.dot.push(id);

		id = Dot.buat(-10, 10, id);
		p.dot.push(id);

		this.daftar.push(p);

		setTimeout(() => {
			this._onBuat();
		}, 0);

		return 0;
	}

	private static minX(p: IPoligon): IBound {
		if (p.dot.length == 0) return null;

		let dot0: IDot = Dot.getById(p.dot[0]);
		let hasil: IBound = {
			p1: {
				x: dot0.posGlobal.x,
				y: dot0.posGlobal.y
			},
			p2: {
				x: dot0.posGlobal.x,
				y: dot0.posGlobal.y
			}
		}

		p.dot.forEach((id: number) => {
			let dot: IDot = Dot.getById(id);

			if (dot.posGlobal.x < hasil.p1.x) {
				hasil.p1.x = dot.posGlobal.x;
			}


		})

		return hasil;
	}
}