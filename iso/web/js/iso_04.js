/**
 * tutorial
 * isometrik
 *
 * drag untuk menggeser layar
 *
 */
window.onload = () => {
    Grafis(300, 300);
    //buat viewport
    const vp = {
        x: -150,
        y: 0,
        dipencet: false,
        xs: 0,
        ys: 0
    };
    vp;
    //Muat gambar
    let ubin = Muat("./gbr/ubin.png");
    Handle(ubin, 32, 0);
    window.requestAnimationFrame(upate);
    function upate() {
        geserViewport();
        Bersih();
        gambarUbin();
        window.requestAnimationFrame(upate);
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
     * menggambar ubin di layar
     */
    function gambarUbin() {
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
                Posisi(ubin, xs, ys);
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
