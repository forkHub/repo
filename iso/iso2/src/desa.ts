// import { DragSelesai } from "./Event.js";
import { id } from "./Id.js";
// import { peta } from "./peta/peta.js";
import { pilihArea } from "./pilihArea.js";

export enum Bangunan {
    rumah = 'rumah'
}

export interface IBangunan {
    id: number,
    type: Bangunan,
    x: number,
    y: number,
    dimuat: boolean

    update: () => void;
}

class Desa {
    readonly list: Rumah[] = [];

    betById(id: number) {
        return this.list.find((item) => { return item.id == id });
    }

    constructor() {
    }

    buatRumah(): number[] {
        console.log('buat rumah', '');

        let hasil: number[] = [];
        let x1 = Math.min(pilihArea.x1, pilihArea.x2);
        let x2 = Math.max(pilihArea.x1, pilihArea.x2);
        let y1 = Math.min(pilihArea.y1, pilihArea.y2);
        let y2 = Math.max(pilihArea.y1, pilihArea.y2);

        for (let i = x1; i <= x2; i++) {
            for (let j = y1; j <= y2; j++) {
                let id = this.tambah(i, j);
                hasil.push(id);
            }
        }

        return hasil;
    }

    init() {

    }

    tambah(x: number, y: number): number {
        let rumah: Rumah;

        rumah = new Rumah();
        rumah.x = x;
        rumah.y = y;

        this.list.push(rumah);

        return rumah.id;

        // data.rumahBaruId.push(rumah.id);
    }

}
export const desa: Desa = new Desa();

class Rumah implements IBangunan {
    id: number;
    x: number = 0;
    y: number = 0;
    type: Bangunan;
    spr: ISprite;
    dimuat: boolean;

    constructor() {
        this.id = id();
        this.type = Bangunan.rumah;
        this.spr = Muat("./gbr/rumah.png", false, 0, () => {
            this.dimuat = true;
        });
        Handle(this.spr, 64 / 2, 52 - 32);
    }

    update(): void {

    }
}