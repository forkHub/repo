/**
 * tutorial
 * isometrik
 *
 * proyeksi isometrik
 *
 */
window.onload = () => {
    Grafis(900, 900);
    let peta = [
        "X XXX X X XXX X",
        "X X X X X X X X",
        "X X X XXX X X X",
        "               ",
        "X XXX X X XXX X ",
        "X X X X X X X X",
        "X X X XXX X X X",
        "             ",
        "X XXX X X XXX X",
        "X X X X X X X X",
        "X X X XXX X X X",
        "             ",
        "X XXX X X XXX X",
        "X X X X X X X X",
        "X X X XXX X X X",
        "             ",
    ];
    //Muat gambar
    let ubin = Muat("./gbr/ubin.png");
    Handle(ubin, 32, 0);
    window.requestAnimationFrame(upate);
    function upate() {
        Bersih();
        gambarUbin();
        window.requestAnimationFrame(upate);
    }
    /**
     * menggambar ubin di layar
     */
    function gambarUbin() {
        let ctx = Kontek();
        for (let i = 0; i < peta.length; i++) {
            for (let k = 0; k < peta[i].length; k++) {
                if (peta[i][k] == 'X') {
                    //ubah dari posisi grid ke posisi absolute
                    //ukuran tiap grid 32 pixel
                    let xl = i * 32;
                    let yl = k * 32;
                    //proyeksi posisi isometrik ke posisi layar
                    let xs = iso2LayarX(xl, yl) + 450;
                    let ys = iso2LayarY(xl, yl);
                    ys = 900 - ys;
                    // Posisi(ubin, xs, ys)
                    // Gambar(ubin);
                    ctx.fillRect(xs, ys, 32, 16);
                    ctx.beginPath();
                    ctx.moveTo(xs, ys);
                    ctx.strokeRect(xs, ys, 32, 16);
                    ctx.stroke();
                }
            }
        }
        // for (let i = 0; i < 10; i++) {
        // 	for (let j = 0; j < 10; j++) {
        // 		//ubah dari posisi grid ke posisi absolute
        // 		//ukuran tiap grid 32 pixel
        // 		let xl = i * 32;
        // 		let yl = j * 32;
        // 		//proyeksi posisi isometrik ke posisi layar
        // 		let xs = iso2LayarX(xl, yl);
        // 		let ys = iso2LayarY(xl, yl);
        // 		Posisi(ubin, xs, ys)
        // 		Gambar(ubin);
        // 	}
        // }
    }
    /**
     * proyeksi dari koordinat isometrik ke layar
     * @param isoX posisi x di koordinat isometrik
     * @param isoY posisi y di koordinat isometrik
     * @returns posisi x layar
     */
    function iso2LayarX(isoX, isoY) {
        return (isoX - isoY);
    }
    /**
     * proyeksi dari koordinat isometrik ke layar
     * @param isoX posisi x di koordinat isometrik
     * @param isoY posisi y di koordinat isometrik
     * @returns posisi y di layar
     */
    function iso2LayarY(isoX, isoY) {
        return (isoX + isoY) / 2;
    }
};
