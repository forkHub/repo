window.onload = () => {
	Grafis(600, 600);

	let vx: number = buatKec();
	let vy: number = buatKec();
	let badan_ar: ISprite[] = [];

	//bola besar
	let kepalaUlar: ISprite = MuatAnimasi("https://forkhub.github.io/gbr/bola_b.png", 64, 64, true);
	Handle(kepalaUlar, 32, 32);
	Posisi(kepalaUlar, 150, 150);

	for (let i: number = 0; i < 24; i++) {
		badan_ar.push(buatBadan());
	}

	window.requestAnimationFrame(upate);
	function upate(): void {
		updateKepala();
		// updateKotak();
		updateBadanAr();

		Bersih();
		GambarSemua();

		window.requestAnimationFrame(upate);
	}

	function buatBadan(): ISprite {
		let kotak: ISprite = MuatAnimasi("https://forkhub.github.io/gbr/kotak_2.png", 32, 16);
		Handle(kotak, 0, 8);
		Alpha(kotak, 50);
		return kotak;
	}

	function updateBadan(kepala: ISprite, badan: ISprite) {
		let sdt = Sudut(PosisiX(badan) - PosisiX(kepala), PosisiY(badan) - PosisiY(kepala));
		Rotasi(badan, sdt + 180);
		PosisiPolar(badan, sdt, 32, PosisiX(kepala), PosisiY(kepala));
	}

	function buatKec(): number {
		return Math.floor(Math.random() * 5 + 5);
	}

	function updateKepala(): void {
		let x: number = PosisiX(kepalaUlar);
		let y: number = PosisiY(kepalaUlar);

		x += vx;
		y += vy;

		if (x + 32 > 600) {
			vx = -buatKec();
		}
		if (x - 32 < 0) {
			vx = buatKec();
		}

		if (y + 32 > 600) {
			vy = -buatKec();
		}
		if (y - 32 < 0) {
			vy = buatKec();
		}

		Posisi(kepalaUlar, x, y);
	}

	function updateBadanAr(): void {
		for (let i: number = 0; i < badan_ar.length; i++) {
			let badan: ISprite = badan_ar[i];
			if (i == 0) {
				updateBadan(kepalaUlar, badan);
			}
			else {
				updateBadan(badan_ar[i - 1], badan);
			}
		}
	}
};
