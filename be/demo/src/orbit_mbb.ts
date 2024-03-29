window.onload = () => {
	Grafis(480, 480);

	let matahari: ISprite;
	let bumi: ISprite;
	let sudut: number = 10;
	let bulan: ISprite;
	let sudutBulan: number = 0;

	matahari = Muat("https://forkhub.github.io/gbr/matahari.png", true);
	Ukuran(matahari, 100, 100);
	Handle(matahari, 50, 50);
	Posisi(matahari, 240, 240);

	bumi = Muat("https://forkhub.github.io/gbr/bumi.png");
	Handle(bumi, 25, 25);
	Ukuran(bumi, 50, 50);

	bulan = Muat("https://forkhub.github.io/gbr/bulan_32.png");
	Ukuran(bulan, 32, 32);
	Handle(bulan, 16, 16);

	window.requestAnimationFrame(update);
	function update(): void {
		Bersih();

		sudut += .5;
		if (sudut > 360) {
			sudut -= 360;
		}

		sudutBulan += 6;
		if (sudutBulan > 360) {
			sudutBulan -= 360;
		}

		PosisiPolar(bumi, sudut, 160, PosisiX(matahari), PosisiY(matahari));
		PosisiPolar(bulan, sudutBulan, 80, PosisiX(bumi), PosisiY(bumi));
		GambarSemua();
		window.requestAnimationFrame(update);
	}
}
