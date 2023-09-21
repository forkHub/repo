window.onload = () => {
	Grafis(480, 640);

	let spr1: ISprite = buatTombol(20, 20);
	let spr2: ISprite = buatTombol(20, 100);
	let spr3: ISprite = buatTombol(200, 100);
	let spr4: ISprite = buatTombol(200, 20);

	window.requestAnimationFrame(update);
	function update(): void {
		Bersih();
		gambarKurva();

		//gambar semua sprite
		GambarSemua();
		window.requestAnimationFrame(update);
	}

	function gambarKurva(): void {
		let ctx: CanvasRenderingContext2D = Kontek();

		ctx.beginPath();
		ctx.moveTo(PosisiX(spr1), PosisiY(spr1));

		ctx.bezierCurveTo(
			PosisiX(spr2), PosisiY(spr2),
			PosisiX(spr3), PosisiY(spr3),
			PosisiX(spr4), PosisiY(spr4)
		)

		//garis handle
		ctx.moveTo(PosisiX(spr1), PosisiY(spr1));
		ctx.lineTo(PosisiX(spr2), PosisiY(spr2));

		//garis handle
		ctx.moveTo(PosisiX(spr4), PosisiY(spr4));
		ctx.lineTo(PosisiX(spr3), PosisiY(spr3));

		ctx.stroke();
	}

	function buatTombol(x: number, y: number): ISprite {
		let spr: ISprite = Muat("https://forkhub.github.io/gbr/knob_tombol.png", true);
		Handle(spr, 16, 16);
		Posisi(spr, x, y);

		return spr;
	}
}