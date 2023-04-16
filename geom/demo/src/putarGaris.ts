window.onload = () => {
	const Garis = ha.geom.Garis;

	let g: Garis2 = new Garis2();
	let g2: Garis2 = new Garis2(2);

	Grafis(300, 300);

	window.requestAnimationFrame(update);

	function update(): void {
		g.g2p();
		g2.g2p();

		Bersih();
		g.gambar();
		g2.gambar();

		Tulis("atas: " + (Garis.hadapAtas(g.garis)), 300 / 2, 20);

		window.requestAnimationFrame(update);
	}

	window.onkeyup = (e) => {
		console.log(e.key);
		if (e.key == 'p') {
			Garis.putarGaris([g.garis, g2.garis], -Garis.sudut(g.garis), false);
			g.p2g();
			g2.p2g();
		}
	}
};
