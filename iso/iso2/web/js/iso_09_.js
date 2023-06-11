import { vp } from "./data.js";
import { isoUtil } from "./isoUtil.js";
import { PetaKecil } from "./petakecil.js";
export var ubin;
window.onload = () => {
    Grafis(240, 360);
    //Muat gambar
    //gambar ubin
    ubin = Muat("./gbr/ubin.png");
    Handle(ubin, 32, 0);
    const peta = [];
    for (let i = 0; i < 3; i++) {
        console.log(peta[i]);
        peta[i] = [];
        for (let j = 0; j < 3; j++) {
            peta[i][j] = new PetaKecil();
            // peta[i][j].update();
        }
    }
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
                let xs = isoUtil.iso2LayarX(xl, yl);
                let ys = isoUtil.iso2LayarY(xl, yl);
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
};
