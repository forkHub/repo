window.onload = () => {
	const Garis = ha.geom.Garis;
	const Point = ha.geom.Point;

	let kanvas: HTMLCanvasElement = document.querySelector('canvas');
	let canvasCont: HTMLDivElement = document.querySelector('.canvas-wrap');

	let garis: ha.geom.IGaris = Garis.create(Point.create(0, 0), Point.create(100, 100));

	document.querySelector('button').onclick = () => {
		garis = Garis.putarKeHor(garis, false);
		Posisi(p1, garis.v1.x, garis.v1.y);
		Posisi(p2, garis.v2.x, garis.v2.y);
	}

	Grafis(300, 300, kanvas, false);
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
		updateKanvas();
		gambarGaris();
		Gambar(p1);
		Gambar(p2, 1);
		Tulis("atas: " + Garis.hadapAtas(garis), 300 / 2, 20);

		window.requestAnimationFrame(update);
	}

	function updateKanvas(): void {
		let wp: number = parseInt(window.getComputedStyle(canvasCont).width);
		let wl: number = parseInt(window.getComputedStyle(canvasCont).height);

		wp *= .9;
		wl *= .9;

		let cp = kanvas.width;
		let cl = kanvas.height;

		let ratio = Math.min((wp / cp), (wl / cl));

		let cp2 = Math.floor(cp * ratio);
		let cl2 = Math.floor(cl * ratio);

		kanvas.style.width = cp2 + 'px';
		kanvas.style.height = cl2 + 'px';

	}

	function gambarGaris() {
		let ctx: CanvasRenderingContext2D = Kontek();

		ctx.beginPath();
		ctx.moveTo(PosisiX(p1), PosisiY(p1));
		ctx.lineTo(PosisiX(p2), PosisiY(p2));

		ctx.stroke();
	}

};

