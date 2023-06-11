import { EventSub, EventEnum, event } from "../Event.js";
import { data } from "../data.js";
import { desa } from "../desa.js";
import { isoUtil } from "../isoUtil.js";
export class PetaKecil {
    ubin = [];
    kanvas;
    posX;
    posY;
    constructor() {
        this.kanvas = Muat('./gbr/peta_kecil.png');
        Handle(this.kanvas, 96, 0);
        for (let i = 0; i < 3; i++) {
            this.ubin[i] = [];
            for (let j = 0; j < 3; j++) {
                this.ubin[i][j] = 1;
            }
        }
        event.subs.push(new EventSub(EventEnum.sprite_dimuat, (evt) => {
            // console.log(evt);
            if (evt.spr == data.ubinSpr) {
                console.log('gambar ubin');
                this.updateKanvas();
            }
        }));
        //TODO:
        this.posX;
        this.posY;
    }
    /**
     *
     * @param i koordinat lokal
     * @param j koordinat lokal
     * @param n
     */
    updatePetaData(i, j, n) {
        console.group('update ubin data');
        console.log("i", i, "j", j, "n", n);
        console.groupEnd();
        this.ubin[i][j] = n;
        // this.updateKanvas();
    }
    update() {
    }
    updateKanvas() {
        let mKontek = Kontek();
        Kontek(SpriteKontek(this.kanvas));
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
                let ubinData = this.ubin[i][j];
                if (ubinData > 1) {
                    let rumah = desa.betById(ubinData);
                    Posisi(rumah.spr, xs, ys);
                    Gambar(rumah.spr);
                }
                else {
                    Posisi(data.ubinSpr, xs, ys);
                    Gambar(data.ubinSpr);
                }
            }
        }
        Kontek(mKontek);
    }
}
