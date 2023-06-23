/**
 * tutorial
 * isometrik
 * 
 * proyeksi isometrik
 * 
 */

window.onload = () => {
	Grafis(300, 300);

	//Muat gambar
	let ubin: ISprite = Muat("./gbr/ubin.png");
	Handle(ubin, 32, 0);

	window.requestAnimationFrame(upate);
	function upate(): void {

		Bersih();
		gambarUbin();

		window.requestAnimationFrame(upate);
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
