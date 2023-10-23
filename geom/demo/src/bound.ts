/**
 * gambar bound dari garis manual
 */
window.onload = () => {
	const Garis = ha.geom.Garis;
	const Point = ha.geom.Point;

	let garis: ha.geom.IGaris = Garis.create(Point.buat(0, 0), Point.buat(100, 100));

	Grafis(300, 300);
	let p1: ISprite = MuatAnimasi("https://forkhub.github.io/gbr/bola.png", 16, 16, true);
	Posisi(p1, 10, 10);
	Handle(p1, 8, 8);

	let p2: ISprite = Copy(p1);
	Posisi(p2, 100, 100);
	Handle(p2, 8, 8);

	window.requestAnimationFrame(update);

	function update(): void {
		garis.v1.x = PosisiX(p1);
		garis.v1.y = PosisiY(p1);

		garis.v2.x = PosisiX(p2);
		garis.v2.y = PosisiY(p2);

		Bersih();
		gambarGaris();
		gambarBound();
		Gambar(p1);
		Gambar(p2, 1);
		Tulis("atas: " + Garis.hadapAtas(garis), 300 / 2, 20);

		window.requestAnimationFrame(update);
	}

	function gambarGaris() {
		let ctx: CanvasRenderingContext2D = Kontek();

		ctx.beginPath();
		ctx.moveTo(PosisiX(p1), PosisiY(p1));
		ctx.lineTo(PosisiX(p2), PosisiY(p2));

		ctx.stroke();
	}

	function gambarBound() {
		let ctx: CanvasRenderingContext2D = Kontek();

		ctx.beginPath();
		ctx.moveTo(PosisiX(p1), PosisiY(p1));
		ctx.lineTo(PosisiX(p2), PosisiY(p1));
		ctx.lineTo(PosisiX(p2), PosisiY(p2));
		ctx.lineTo(PosisiX(p1), PosisiY(p2));
		ctx.lineTo(PosisiX(p1), PosisiY(p1));

		ctx.stroke();
	}

};

