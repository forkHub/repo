import { EventEnum, EventSub, event } from "./Event.js";
import { data } from "./data.js";
import { isoUtil } from "./isoUtil.js";
class PetaKecil {
    ubin = [];
    sprite;
    posX;
    posY;
    constructor() {
        this.sprite = Muat('./gbr/peta_kecil.png');
        Handle(this.sprite, 96, 0);
        for (let i = 0; i < 3; i++) {
            this.ubin[i] = [];
            for (let j = 0; j < 3; j++) {
                this.ubin[i][j] = 1;
            }
        }
        event.subs.push(new EventSub(EventEnum.sprite_dimuat, (evt) => {
            // console.log(evt);
            if (evt.spr == data.ubin) {
                console.log('gambar ubin');
                this.render();
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
    setPeta(i, j, n) {
        this.ubin[i][j] = n;
    }
    // posPeta(i: number, j: number): void {
    //     this.posX = i % 3;
    //     this.posY = j % 3;
    // }
    update() {
    }
    render() {
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
                //TODO: gambar rumah
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
        event.subs.push(new EventSub(EventEnum.rumah_baru, (evt) => {
            console.log('rumah baru event sub');
            // this.posx
            evt;
        }));
    }
    /**
     *
     * @param i koordinat global
     * @param j koordinat global
     * @param n
     */
    setPeta(i, j, n) {
        let i1, j1;
        let i2, j2;
        i1 = Math.floor(i / 3);
        j1 = Math.floor(j / 3);
        i2 = i % 3;
        j2 = j % 3;
        console.group('set peta');
        console.log("i", i, "j", j);
        console.log("i1", i1, "j1", j1);
        console.log("i2", i2, "j2", j2);
        console.groupEnd();
        this.petaKecilAr[i1][j1].setPeta(i2, j2, n);
        this.petaKecilAr[i1][j1].render();
        // this.render();
    }
    // getPetaKecil(i: number, j: number): PetaKecil {
    //     i = Math.floor(i / 3);
    //     j = Math.floor(j / 3);
    //     let hasil: PetaKecil = this.petaKecilAr[i][j];
    //     console.group('get peta kecil');
    //     console.log('i: ', i, "j:", j, "hasil", hasil);
    //     console.groupEnd();
    //     return hasil;
    // }
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
                this.petaKecilAr[i][j].render();
                let petaKecilSpr = this.petaKecilAr[i][j].sprite;
                Posisi(petaKecilSpr, xs, ys);
                Gambar(petaKecilSpr);
            }
        }
    }
}
export const peta = new Peta();
