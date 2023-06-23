import { SpriteDimuat, event } from "./Event.js";
import { data } from "./data.js";
import { isoUtil } from "./isoUtil.js";
class PetaKecil {
    ubin = [];
    sprite;
    // private ubinDigambar: boolean = false;
    constructor() {
        this.sprite = Muat('./gbr/peta_kecil.png');
        Handle(this.sprite, 96, 0);
        for (let i = 0; i < 3; i++) {
            this.ubin[i] = [];
            for (let j = 0; j < 3; j++) {
                this.ubin[i][j] = 1;
            }
        }
        event.subs.push(SpriteDimuat.sub((dataEvt) => {
            if (dataEvt.spr == data.ubin) {
                console.log('this gambar ubin');
                this.gambarUbin();
            }
        }));
        this.gambarUbin();
    }
    update() {
        // this.gambarUbin();
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
                let xs = isoUtil.iso2LayarX(xl, yl) + 96;
                let ys = isoUtil.iso2LayarY(xl, yl);
                if (this.ubin[i][j] == 1) {
                    Posisi(data.ubin, xs, ys);
                    Gambar(data.ubin);
                }
            }
        }
        Kontek(mKontek);
    }
}
class Peta {
    petaKecilAr = [];
    init() {
        for (let i = 0; i < 3; i++) {
            // console.log(peta[i]);
            this.petaKecilAr[i] = [];
            for (let j = 0; j < 3; j++) {
                this.petaKecilAr[i][j] = new PetaKecil();
            }
        }
    }
    update() {
    }
    render() {
        this.gambarPetaKecil();
    }
    gambarPetaKecil() {
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
                xs = xs - data.vp.x;
                ys = ys - data.vp.y;
                // Posisi(ubin, xs, ys)
                this.petaKecilAr[i][j].update();
                let petaSpr = this.petaKecilAr[i][j].sprite;
                Posisi(petaSpr, xs, ys);
                Gambar(petaSpr);
            }
        }
    }
}
export const peta = new Peta();
