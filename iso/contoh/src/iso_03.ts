/**
 * tutorial
 * isometrik
 * 
 * proyeksi isometrik
 * ditambah ofset
 * tap
 * 
 */

window.onload = () => {
	Grafis(300, 300);

	let offset: number = 150;

	//untuk menyimpan posisi isometrik hasil proyeksi
	const isoPos = {
		x: 0,
		y: 0,

		xgr: 0,
		ygr: 0
	}

	//Muat gambar
	let ubin: ISprite = Muat("./gbr/ubin.png");
	Handle(ubin, 32, 0);

	//gambar kursor
	const kursorSpr = Muat("./gbr/ubin_cursor.png");
	Handle(kursorSpr, 32, 0);
	let kursorAktif: boolean = false;

	window.requestAnimationFrame(upate);
	function upate(): void {

		if (JmlTap()) {
			layar2Iso(InputX() - offset, InputY());
			kursorAktif = true;
		}

		Bersih();
		gambarUbin();

		if (kursorAktif) {
			let x: number = isoPos.xgr * 32;
			let y: number = isoPos.ygr * 32;

			let xs = iso2LayarX(x, y);
			let ys = iso2LayarY(x, y);

			xs += offset;

			Posisi(kursorSpr, xs, ys);
			Gambar(kursorSpr);
		}

		window.requestAnimationFrame(upate);
	}

	/**
	 * mengubah posisi layar ke isometrik
	 * @param xl 
	 * @param yl 
	 */
	function layar2Iso(xl: number, yl: number): void {
		isoPos.x = layar2IsoX(xl, yl);
		isoPos.y = layar2IsoY(xl, yl);

		isoPos.xgr = Math.floor(isoPos.x / 32);
		isoPos.ygr = Math.floor(isoPos.y / 32);
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
	 * menggambar ubin di layar
	 */
	function gambarUbin(): void {
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {

				//ubah dari posisi grid ke posisi absolute
				//ukuran tiap grid 32 pixel
				let xl = i * 32;
				let yl = j * 32;

				//proyeksi posisi isometrik ke posisi layar
				let xs = iso2LayarX(xl, yl);
				let ys = iso2LayarY(xl, yl);

				xs += offset;

				Posisi(ubin, xs, ys)
				Gambar(ubin);
			}
		}

	}

	/**
	 * proyeksi dari koordinat isometrik ke layar
	 * @param isoX posisi x di koordinat isometrik
	 * @param isoY posisi y di koordinat isometrik
	 * @returns posisi x layar
	 */
	function iso2LayarX(isoX: number, isoY: number): number {
		return (isoX - isoY);
	}

	/**
	 * proyeksi dari koordinat isometrik ke layar
	 * @param isoX posisi x di koordinat isometrik
	 * @param isoY posisi y di koordinat isometrik
	 * @returns posisi y di layar
	 */
	function iso2LayarY(isoX: number, isoY: number): number {
		return (isoX + isoY) / 2;
	}

};
