/**
 * tutorial
 * isometrik
 * =========
 *
 * drag area, untuk memilih lebih dari satu ubin
 *
 */
window.onload = () => {
    Grafis(300, 300);
    //posisi isometrik hasil proyeksi
    //digunakan untuk menyimpan sementara hasi proyeksi
    const isoPos = {
        x: 0,
        y: 0,
        xgr: 0,
        ygr: 0
    };
    //posisi layar, relatif ke viewport
    //digunakan untuk menyimpan sementara hasil proyeksi
    const layarPos = {
        x: 0,
        y: 0,
    };
    //menyimpan informasi drag
    const isoDrag = {
        status: false,
        xgr: 0,
        ygr: 0,
        x2gr: 0,
        y2gr: 0
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
        Bersih();
        //bila sedang drag atau pointer ditekan
        gambarUbin();
        if (Pencet()) {
            if (!isoDrag.status) {
                isoDrag.status = true;
                layar2Iso(InputX() + vp.x, InputY() + vp.y);
                isoDrag.xgr = isoPos.xgr;
                isoDrag.ygr = isoPos.ygr;
            }
        }
        else {
            isoDrag.status = false;
        }
        if (Geser()) {
            gambarAreaDrag();
        }
        window.requestAnimationFrame(upate);
    }
    function gambarAreaDrag() {
        if (!isoDrag.status)
            return;
        //mencari posisi akhir drag di koordinat iso
        layar2Iso(InputX() + vp.x, InputY() + vp.y);
        //simpan hasilnya
        isoDrag.x2gr = isoPos.xgr;
        isoDrag.y2gr = isoPos.ygr;
        //gambar kotak area drag
        //cari posisi min dan mak.
        //drag bisa bergerak ke arah positif atau negatif
        let xmin = Math.min(isoDrag.xgr, isoDrag.x2gr);
        let ymin = Math.min(isoDrag.ygr, isoDrag.y2gr);
        let xmax = Math.max(isoDrag.xgr, isoDrag.x2gr);
        let ymax = Math.max(isoDrag.ygr, isoDrag.y2gr);
        for (let i = xmin; i <= xmax; i++) {
            for (let j = ymin; j <= ymax; j++) {
                iso2Layar(i * 32, j * 32);
                Posisi(kursorSpr, layarPos.x, layarPos.y);
                Gambar(kursorSpr);
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
