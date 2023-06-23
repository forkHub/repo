window.onload = () => {
    Grafis(300, 300);
    //Muat gambar
    let ubin = Muat("./gbr/ubin.png");
    Handle(ubin, 32, 0);
    let pohon = Muat("./gbr/pohon.png");
    Handle(pohon, 32, 60 - 32);
    //buat peta 
    //10 x 10
    let peta = [];
    for (let i = 0; i < 10; i++) {
        peta[i] = [];
        for (let j = 0; j < 10; j++) {
            peta[i][j] = 0;
        }
    }
    window.requestAnimationFrame(upate);
    function upate() {
        Bersih();
        //gambar ubin dan pohon
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                //ubah dari posisi peta ke posisi absolute di layar
                //ukuran tiap grid 32 pixel
                let xl = i * 32;
                let yl = j * 32;
                //proyeksi posisi isometrik ke posisi layar
                let xs = isoProjectX(xl, yl);
                let ys = isoProjectY(xl, yl);
                //geser ke kanan 150 pixel, karena posisi dimulai dari tengah
                xs = xs + 150;
                //bila peta ada isinya, gambar pohon
                if (peta[i][j]) {
                    Posisi(pohon, xs, ys);
                    Gambar(pohon);
                }
                else {
                    Posisi(ubin, xs, ys);
                    Gambar(ubin);
                }
                // debugger;
            }
        }
        //bila pointer di tap
        if (InputHit()) {
            //geser posisi 150 pixel untuk menyesuaikan dengan titik awal posisi isometri
            let xg = InputX() - 150;
            let yg = InputY();
            //proyeksi ke posisi isometrik
            let x = layar2IsoX(xg, yg);
            let y = layar2IsoY(xg, yg);
            //bagi dengan 32 (ukuran grid)
            x = Math.floor(x / 32);
            y = Math.floor(y / 32);
            isiMap(x, y);
        }
        window.requestAnimationFrame(upate);
    }
    /**
     * isi map dengan value (1 = ada pohon, 0 = kosong)
     * @param x posisi x
     * @param y posisi y
     * @returns
     */
    function isiMap(x, y) {
        //jangan isi kalau posisi di luar area peta
        if (x < 0)
            return;
        if (y < 0)
            return;
        if (x >= 10)
            return;
        if (y >= 10)
            return;
        if (peta[x][y]) {
            peta[x][y] = 0;
            return;
        }
        peta[x][y] = 1;
    }
    /**
     * proyeksi ke posisi isometric dari posisi layar
     * @param sx posisi x di layar
     * @param sy posisi y di layar
     * @returns posisi x di koordinat isometrik
     */
    function layar2IsoX(sx, sy) {
        return (sx + 2 * sy) / 2;
    }
    /**
     * proyeksi ke posisi isometric dari posisi layar
     * @param sx posisi x di layar
     * @param sy posisi y di layar
     * @returns posisi y di koordinat isometrik
     */
    function layar2IsoY(sx, sy) {
        return (2 * sy - sx) / 2;
    }
    /**
     * proyeksi dari posisi isometrik ke layar
     * @param isoX posisi x di koordinat isometrik
     * @param isoY posisi y di koordinat isometrik
     * @returns posisi x layar
     */
    function isoProjectX(isoX, isoY) {
        return (isoX - isoY);
    }
    /**
     * proyeksi dari posisi isometrik ke layar
     * @param isoX posisi x di koordinat isometrik
     * @param isoY posisi y di koordinat isometrik
     * @returns posisi y di layar
     */
    function isoProjectY(isoX, isoY) {
        return (isoX + isoY) / 2;
    }
};
