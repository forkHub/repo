/**
 * isometrik
 * =========
 *
 * peta kecil
 *
 */
window.onload = () => {
    Grafis(300, 300);
    class PetaKecil {
        peta;
        sprite;
        constructor() {
            this.sprite = Muat('./gbr/peta_kecil.png');
            for (let i = 0; i < 3; i++) {
                this.peta[i] = [];
                for (let j = 0; j < 3; j++) {
                    this.peta[i][j] = 1;
                }
            }
        }
        update() {
            gambarPetaKecil();
        }
        gambarUbin() {
            let mKontek = Kontek();
            Kontek(SpriteKontek(this.sprite));
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    //ubah dari posisi grid ke posisi absolute
                    //ukuran tiap grid 32 pixel
                    let xl = i * 32;
                    let yl = j * 32;
                    //proyeksi posisi isometrik ke posisi layar
                    let xs = iso2LayarX(xl, yl);
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
        peta[i] = [];
        for (let j = 0; j < 3; j++) {
            peta[i][j] = new PetaKecil();
        }
    }
    //buat kursor
    // const kursor = {
    //     aktif: false,	//status kursor apakah sudah aktif, kursor aktif bila layar di tap
    //     xg: 0,
    //     yg: 0
    // }
    //digunakan untuk menyimpan hasi proyeksi terakhir
    // const isoPos = {
    //     x: 0,
    //     y: 0,
    //     xgr: 0,
    //     ygr: 0
    // }
    //digunakan untuk menyimpan proyeksi terakhir dari iso ke layar
    // const layarPos = {
    //     x: 0,
    //     y: 0,
    // }
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
    window.requestAnimationFrame(upate);
    function upate() {
        Bersih();
        //update peta
        gambarPetaKecil();
        window.requestAnimationFrame(upate);
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
