namespace ha.partikel {

    class KonfigurasiItem {
        kecepatan: number;
        kecMaks: number;
        percepatan: number;
        kecepatanAlpha: number;
        percepatanAlpha: number;
        alphaAwal: number;
        umurMaks: number;
    }

    class KonfigurasiPabrik {
        jmlProduksi: number;
        periode: number;
        aktif: boolean;
    }

    class Pabrik {
        aktif: number;
    }

    class PartikelObj {
        aktif: boolean = false;
        x: number = 0;
        y: number = 0;
        konf: KonfigurasiItem;

        sudut: number = -90;
        // kecepatan: number = 1;
        // percepatan: number = 0;

        // kecepatanSudut: number = 0;
        // percepatanSudut: number = 0;

        alpha: number = 1;
        // alphaAwal: number = 1;
        // kecepatanAlpha: number = .1;
        // percepatanAlpha: number = 0;

        umur: number = 0;

        update(): void {
            this.y -= Math.random() * 3;
            this.alpha -= Math.random() * .1 + .1;

            if (this.alpha < 0) this.alpha = 0;

            this.umur++;
        }

        reset() {
            this.umur = 0;
            this.alpha = this.konf.alphaAwal;
        }
    }

    export class Partikel {
        private readonly list: PartikelObj[] = [];
        private readonly konfItem: KonfigurasiItem = new KonfigurasiItem();
        private readonly konfPabrik: KonfigurasiPabrik = new KonfigurasiPabrik();
        private readonly pabrik: Pabrik = new Pabrik();

        constructor() {
            this.konfItem;
            this.konfPabrik;
            this.pabrik;
        }

        buat(): PartikelObj {
            let part: PartikelObj;
            //ambil yang sudah tidak aktif
            //buat baru bila belum ada
            this.list.forEach((item) => {
                if (item.aktif == false) {
                    item.aktif = true;
                    part = item;
                    part.reset();
                    return;
                }
            })

            if (!part) {
                part = new PartikelObj();
                part.reset();
                this.list.push(part);
            }

            //set partikel awal dari konfigurasi
            part.konf = this.konfItem;

            return part;
        }

        update(): void {
            this.list.forEach((item) => {
                if (item.aktif) {
                    if (item.umur > this.konfItem.umurMaks) {
                        item.aktif = false;
                        return;
                    }

                    item.update();

                    if (item.umur > this.konfItem.umurMaks) {
                        item.aktif = false;
                    }

                }


            })
        }
    }
}