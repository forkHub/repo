/**
 * isometrik
 * =========
 *
 * drag untuk menggeser area
 * tap untuk menaruh kursor
 *
 */
window.onload = () => {
    Grafis(300, 300);
    //buat kursor
    const kursor = {
        aktif: false,
        xg: 0,
        yg: 0
    };
    //digunakan untuk menyimpan hasi proyeksi terakhir
    const isoPos = {
        x: 0,
        y: 0,
        xgr: 0,
        ygr: 0
    };
    //digunakan untuk menyimpan proyeksi terakhir dari iso ke layar
    const layarPos = {
        x: 0,
        y: 0,
    };
    //buat viewport
    //untuk menentukan area yang terlihat di layar
    const vp = {
        x: -150,
        y: 0,
        dipencet: false,
        xs: 0,
        ys: 0 //posisi y awal viewport saat pointer dipencet
    };
    //Muat gambar
    //gambar ubin
    const ubin = Muat("./gbr/ubin.png");
    Handle(ubin, 32, 0);
    //gambar kursor
    const kursorSpr = Muat("./gbr/ubin_cursor.png");
    Handle(kursorSpr, 32, 0);
    window.requestAnimationFrame(upate);
    function upate() {
        //apakah layar pernah di tap
        if (JmlTap()) {
            kursor.aktif = true;
            layar2Iso(InputX() + vp.x, InputY() + vp.y);
            kursor.xg = isoPos.xgr;
            kursor.yg = isoPos.ygr;
        }
        geserViewport();
        Bersih();
        gambarUbin();
        if (kursor.aktif) {
            iso2Layar(kursor.xg * 32, kursor.yg * 32);
            Posisi(kursorSpr, layarPos.x, layarPos.y);
            Gambar(kursorSpr);
        }
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
            //simpan posisi awal
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
        //bila sedang menggeser 
        if (Geser()) {
            //bila statusnya lagi dipencet
            //update posisi
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
    function layar2Iso(xl, yl) {
        isoPos.x = layar2IsoX(xl, yl);
        isoPos.y = layar2IsoY(xl, yl);
        isoPos.xgr = Math.floor(isoPos.x / 32);
        isoPos.ygr = Math.floor(isoPos.y / 32);
    }
    function iso2Layar(isoX, isoY) {
        layarPos.x = iso2LayarX(isoX, isoY) - vp.x;
        layarPos.y = iso2LayarY(isoX, isoY) - vp.y;
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
};
