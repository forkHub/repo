window.onload = () => {
	Grafis(800, 500);

	let sudut: number = 10;
	let sudutBulan: number = 0;

	//matahari
	let matahari: ISprite = Muat("https://forkhub.github.io/gbr/matahari.png", true);
	Ukuran(matahari, 100, 100);
	Handle(matahari, 50, 50);
	Posisi(matahari, 200, 250);

	//bumi
	let bumi: ISprite = Muat("https://forkhub.github.io/gbr/bumi.png");
	Handle(bumi, 25, 25);
	Ukuran(bumi, 50, 50);

	//bulan
	let bulan: ISprite = Muat("https://forkhub.github.io/gbr/bulan_32.png");
	Ukuran(bulan, 24, 24);
	Handle(bulan, 12, 12);

	window.requestAnimationFrame(update);
	function update(): void {
		Bersih();

		//perubahan sudut bumi
		sudut += .5;
		if (sudut > 360) {
			sudut -= 360;
		}

		//perubahan sudut bulan
		sudutBulan += 6;
		if (sudutBulan > 360) {
			sudutBulan -= 360;
		}

		//posisi bumi terhadap matahari
		//dengan skala vertikal .5
		//untuk membuat gerakan memutar oval
		PosisiPolar(bumi, sudut, 350, PosisiX(matahari), PosisiY(matahari), 1, .5);

		//geser posisi bumi agak ke kanan
		Posisi(bumi, PosisiX(bumi) + 180, PosisiY(bumi));

		//posisi bulan terhadap bumi
		PosisiPolar(bulan, sudutBulan, 60, PosisiX(bumi), PosisiY(bumi));

		//gambar oval
		Oval(PosisiX(matahari) + 180, PosisiY(matahari), 350, 1, .5);

		//gambar semua sprite
		GambarSemua();
		window.requestAnimationFrame(update);
	}
}