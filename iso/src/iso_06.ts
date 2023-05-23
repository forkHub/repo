/**
 * isometrik
 * =========
 * 
 * viewport bergeser saat pointer ditekan dan pointer berada di pinggir
 * 
 */

window.onload = () => {
	Grafis(300, 300);

	//buat viewport
	//untuk menentukan area yang terlihat di layar
	const vp = {
		x: -150,
		y: 0,

		dipencet: false,
		xs: 0,	//posisi x awal viewport saat pointer dipencet
		ys: 0	//posisi y awal viewport saat pointer dipencet
	}

	//Muat gambar
	//gambar ubin
	const ubin = Muat("./gbr/ubin.png");
	Handle(ubin, 32, 0);

	//gambar kursor
	const kursorSpr = Muat("./gbr/ubin_cursor.png");
	Handle(kursorSpr, 32, 0);

	window.requestAnimationFrame(upate);
	function upate(): void {
		Bersih();

		gambarUbin();

		//bila sedang drag atau pointer ditekan
		if ((Pencet())) {
			geserViewport2();
		}

		window.requestAnimationFrame(upate);
	}

	/**
	 * geser viewport saat dipencet dan pointer ditekan
	 */
	function geserViewport2() {
		if (InputX() > 250) {
			vp.x++;
		}
		else if (InputX() < 50) {
			vp.x--;
		}
		else if (InputY() < 50) {
			vp.y--;
		}
		else if (InputY() > 250) {
			vp.y++;
		}
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

				//posisi relatif terhadap viewport
				xs = xs - vp.x;
				ys = ys - vp.y;

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
