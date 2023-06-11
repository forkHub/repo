/**
 * isometrik
 * =========
 *
 * peta kecil
 *
 */
window.onload = () => {
    Grafis(240, 360);
    //Muat gambar
    //gambar ubin
    const ubin = Muat("./gbr/ubin.png");
    Handle(ubin, 32, 0);
    class PetaKecil {
        peta = [];
        sprite;
        ubinDigambar = false;
        constructor() {
            this.sprite = Muat('./gbr/peta_kecil.png');
            Handle(this.sprite, 96, 0);
            for (let i = 0; i < 3; i++) {
                this.peta[i] = [];
                for (let j = 0; j < 3; j++) {
                    this.peta[i][j] = 1;
                }
            }
        }
        update() {
            if (!this.ubinDigambar) {
                if (Dimuat(ubin)) {
                    console.log('gambar ubin');
                    this.ubinDigambar = true;
                    this.gambarUbin();
                }
            }
        }
        gambarUbin() {
            let mKontek = Kontek();
            Kontek(SpriteKontek(this.sprite));
            Bersih(0, 0, 0, 0);
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    //ubah dari posisi grid ke posisi absolute
                    //ukuran tiap grid 32 pixel
                    let xl = i * 32;
                    let yl = j * 32;
                    //proyeksi posisi isometrik ke posisi layar
                    let xs = iso2LayarX(xl, yl) + 96;
                    let ys = iso2LayarY(xl, yl);
                    Posisi(ubin, xs, ys);
                    Gambar(ubin);
                }
            }
            Kontek(mKontek);
        }
    }
    const peta = [];
    for (let i = 0; i < 3; i++) {
        console.log(peta[i]);
        peta[i] = [];
        for (let j = 0; j < 3; j++) {
            peta[i][j] = new PetaKecil();
            // peta[i][j].update();
        }
    }
    //buat viewport
    //untuk menentukan area yang terlihat di layar
    const vp = {
        x: -120,
        y: 0,
        dipencet: false,
        xs: 0,
        ys: 0 //posisi y awal viewport saat pointer dipencet
    };
    window.requestAnimationFrame(upate);
    function upate() {
        geserViewport();
        Bersih();
        gambarPetaKecil();
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
    function gambarPetaKecil() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                //ubah dari posisi grid ke posisi absolute
                //ukuran tiap grid 32 pixel
                let xl = i * 32 * 3;
                let yl = j * 32 * 3;
                //proyeksi posisi isometrik ke posisi layar
                let xs = iso2LayarX(xl, yl);
                let ys = iso2LayarY(xl, yl);
                //posisi relatif terhadap viewport
                xs = xs - vp.x;
                ys = ys - vp.y;
                // Posisi(ubin, xs, ys)
                peta[i][j].update();
                let petaSpr = peta[i][j].sprite;
                Posisi(petaSpr, xs, ys);
                Gambar(petaSpr);
            }
        }
    }
    // function layar2Iso(xl: number, yl: number): void {
    //     isoPos.x = layar2IsoX(xl, yl);
    //     isoPos.y = layar2IsoY(xl, yl);
    //     isoPos.xgr = Math.floor(isoPos.x / 32);
    //     isoPos.ygr = Math.floor(isoPos.y / 32);
    // }
    // function iso2Layar(isoX: number, isoY: number): void {
    //     layarPos.x = iso2LayarX(isoX, isoY) - vp.x;
    //     layarPos.y = iso2LayarY(isoX, isoY) - vp.y;
    // }
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
    // function layar2IsoX(sx: number, sy: number): number {
    //     return (sx + 2 * sy) / 2;
    // }
    /**
     * proyeksi ke posisi isometric dari posisi layar
     * @param sx posisi x di layar
     * @param sy posisi y di layar
     * @returns posisi y di koordinat isometrik
     */
    // function layar2IsoY(sx: number, sy: number): number {
    //     return (2 * sy - sx) / 2;
    // }
};
