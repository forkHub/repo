/**
 * isometrik
 * 
 * drag mouse
 * taruh kursor di peta
 * taruh pohon di posisi kursor
 * 
 */

window.onload = () => {
	Grafis(300, 300);

	const tanamTbl: HTMLButtonElement = document.body.querySelector('button.tanam') as HTMLButtonElement;
	tanamTbl.onclick = () => {
		// console.log('tanam klik');
		updatePeta();
		updateTombolLabel();
	}

	//buat kursor
	const kursor = {
		xg: 0,
		yg: 0
	}

	//buat viewport
	const vp = {
		x: -150,
		y: 0,

		dipencet: false,
		xs: 0,
		ys: 0
	}

	//buat peta
	// 10 x 10
	const peta: number[][] = [];
	for (let i = 0; i < 10; i++) {
		peta[i] = [];
		for (let j = 0; j < 10; j++) {
			peta[i][j] = 0;
		}
	}

	//Muat gambar
	const ubin: ISprite = Muat("./gbr/ubin.png");
	Handle(ubin, 32, 0);

	const kursorSpr: ISprite = Muat("./gbr/ubin_cursor.png");
	Handle(kursorSpr, 32, 0);

	const pohon: ISprite = Muat("./gbr/pohon.png");
	Handle(pohon, 32, 60 - 32);

	window.requestAnimationFrame(upate);
	function upate(): void {
		Bersih();

		geserViewport();

		//bila pointer di tap
		if (InputHit()) {
			updateKursor();
			updateTombolLabel();
		}

		renderPeta();
		gambarKursor(kursor.xg, kursor.yg);

		window.requestAnimationFrame(upate);
	}

	function updateTombolLabel() {
		if (kursor.xg < 0) return;
		if (kursor.yg < 0) return;
		if (kursor.xg >= 10) return;
		if (kursor.yg >= 10) return;

		if (peta[kursor.xg][kursor.yg] == 0) {
			tanamTbl.innerText = 'tanam';
		}
		else {
			tanamTbl.innerText = 'tebang';
		}
	}

	function updatePeta(): void {
		console.log('update peta');
		if (kursor.xg < 0) return;
		if (kursor.yg < 0) return;
		if (kursor.xg >= 10) return;
		if (kursor.yg >= 10) return;

		if (peta[kursor.xg][kursor.yg] == 0) {
			peta[kursor.xg][kursor.yg] = 1;
		}
		else {
			peta[kursor.xg][kursor.yg] = 0;
		}


	}

	/**
	 * geser viewport
	 */
	function geserViewport() {

		//jika sedang dipencet
		if (Pencet()) {

			//jika status belum digeser
			//aktifkan status pencet
			if (vp.dipencet == false) {
				vp.dipencet = true;
				vp.xs = vp.x;
				vp.ys = vp.y;
			}
		}
		else {

			//bila tidak sedang dipencet, reset status pencet
			vp.dipencet = false;
		}

		//bisa sedang menggeser 
		if (Geser()) {

			//bila statusnya lagi dipencet
			if (vp.dipencet) {
				vp.x = vp.xs - GeserX();
				vp.y = vp.ys - GeserY();
			}
		}

	}

	/**
	 * menggambar peta di layar
	 */
	function renderPeta(): void {
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {

				//ubah dari posisi peta ke posisi absolute di layar
				//ukuran tiap grid 32 pixel
				let xl = i * 32;
				let yl = j * 32;

				//proyeksi posisi isometrik ke posisi layar
				let xs = iso2LayarX(xl, yl);
				let ys = iso2LayarY(xl, yl);

				//geser ke posisi relatif ke viewport
				xs = xs - vp.x;
				ys = ys - vp.y;

				if (peta[i][j]) {
					Posisi(pohon, xs, ys);
					Gambar(pohon);
				}
				else {
					Posisi(ubin, xs, ys)
					Gambar(ubin);
				}

			}
		}

	}

	/**
	 * mengupdate peta berdasarkan posisi yang di klik di layar
	 */
	function updateKursor(): void {
		let xg = InputX();
		let yg = InputY();

		//posisi absolute 
		xg = xg + vp.x;
		yg = yg + vp.y;

		//proyeksi ke posisi isometrik
		let x = layar2IsoX(xg, yg);
		let y = layar2IsoY(xg, yg);

		//bagi dengan 32 (ukuran grid)
		x = Math.floor(x / 32);
		y = Math.floor(y / 32);

		kursor.xg = x;
		kursor.yg = y;

	}


	/**
	 * 
	 * @param xg posisi x grid
	 * @param yg posisi y grid
	 */
	function gambarKursor(xg: number, yg: number): void {
		//ukuran tiap grid 32 pixel
		let xl = xg * 32;
		let yl = yg * 32;

		//proyeksi posisi isometrik ke posisi layar
		let xs = iso2LayarX(xl, yl);
		let ys = iso2LayarY(xl, yl);

		//geser untuk mengikuti viewport
		xs = xs - vp.x;
		ys = ys - vp.y;

		kursorSpr.x = xs;
		kursorSpr.y = ys;
		Gambar(kursorSpr);
	}

	/**
	 * proyeksi ke posisi isometric dari posisi layar
	 * @param sx posisi x di layar
	 * @param sy posisi y di layar
	 * @returns posisi x di koordinat isometrik
	 */
	function layar2IsoX(sx: number, sy: number): number {
		return (sx + 2 * sy) / 2;
	}

	/**
	 * proyeksi ke posisi isometric dari posisi layar
	 * @param sx posisi x di layar
	 * @param sy posisi y di layar
	 * @returns posisi y di koordinat isometrik
	 */
	function layar2IsoY(sx: number, sy: number): number {
		return (2 * sy - sx) / 2;
	}

	/**
	 * proyeksi dari posisi isometrik ke layar
	 * @param isoX posisi x di koordinat isometrik
	 * @param isoY posisi y di koordinat isometrik
	 * @returns posisi x layar
	 */
	function iso2LayarX(isoX: number, isoY: number): number {
		return (isoX - isoY);
	}

	/**
	 * proyeksi dari posisi isometrik ke layar
	 * @param isoX posisi x di koordinat isometrik
	 * @param isoY posisi y di koordinat isometrik
	 * @returns posisi y di layar
	 */
	function iso2LayarY(isoX: number, isoY: number): number {
		return (isoX + isoY) / 2;
	}

};
