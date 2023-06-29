window.onload = () => {
	Grafis(300, 300);

	const fb = ha.fb.bola
	const kt = ha.fb.kt;

	let b: ha.fb.BolaObj = fb.buatBola();
	b.x = 50;
	b.y = 50;

	let b2: ha.fb.BolaObj = fb.buatBola();
	b2.x = 100;
	b2.y = 50;

	let k = kt.buat(b, b2);
	b2.x = 65;
	b2.y = 65;

	window.requestAnimationFrame(update);

	window.onkeyup = (e: KeyboardEvent) => {
		if (e.key == 'p') {
			kt.geser(k, k.b1, k.b2);
		}
		console.log(e);
	}

	function update(): void {
		Bersih();
		gambarBola();

		window.requestAnimationFrame(update);
	}

	function gambarBola() {
		let ctx: CanvasRenderingContext2D = Kontek();

		ctx.beginPath();
		fb.bolaAr.forEach((b) => {
			ctx.moveTo(b.x, b.y);
			ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
		})

		ctx.moveTo(100, 100);
		ctx.arc(100, 100, b.r, 0, 2 * Math.PI);

		ctx.stroke();
	}
};

