import { EventEnum, EventSub, RumahBaru, event } from "../Event.js";
import { data } from "../data.js";
import { desa } from "../desa.js";
import { isoUtil } from "../isoUtil.js";
import { PetaKecil } from "./petaKecil.js";

class Peta {
    private readonly petaKecilAr: PetaKecil[][] = [];

    init() {
        for (let i = 0; i < 3; i++) {
            this.petaKecilAr[i] = [];
            for (let j = 0; j < 3; j++) {
                this.petaKecilAr[i][j] = new PetaKecil();
            }
        }

        event.subs.push(new EventSub<RumahBaru>(
            EventEnum.rumah_baru,
            (evt: RumahBaru) => {
                console.log('rumah baru event sub');
                // this.posx
                evt;
            }
        ))
    }

    bangungArea(rumahAr: number[]) {
        rumahAr.forEach((item) => {
            let rumah = desa.betById(item);
            this.updatePetaData(rumah.x, rumah.y, rumah.id);
        })
    }

    /**
     * 
     * @param i koordinat global
     * @param j koordinat global
     * @param n 
     */
    updatePetaData(i: number, j: number, n: number): void {
        let i1, j1: number;
        let i2, j2: number;

        i1 = Math.floor(i / 3);
        j1 = Math.floor(j / 3);

        i2 = i % 3;
        j2 = j % 3;

        console.group('update peta data');
        console.log("i", i, "j", j)
        console.log("i1", i1, "j1", j1);
        console.log("i2", i2, "j2", j2);
        console.groupEnd();

        this.petaKecilAr[i1][j1].updatePetaData(i2, j2, n);
        this.petaKecilAr[i1][j1].updateKanvas();
    }

    update() {

    }

    render() {
        this.gambarPetaKecil();
    }

    gambarPetaKecil(): void {
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
                // this.petaKecilAr[i][j].updateKanvas();

                let petaKecilSpr = this.petaKecilAr[i][j].kanvas;
                Posisi(petaKecilSpr, xs, ys);
                Gambar(petaKecilSpr)
            }
        }

    }
}

export const peta: Peta = new Peta();
