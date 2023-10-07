var ha;
(function (ha) {
    var partikel;
    (function (partikel) {
        class KonfigurasiItem {
            kecepatan;
            kecMaks;
            percepatan;
            kecepatanAlpha = .05;
            percepatanAlpha;
            alphaAwal = 1;
            umurMaks = 100;
        }
        class KonfigurasiPabrik {
            sudutAwalMin = -90;
            sudutAwalMax = -90;
            jmlProduksi = 1;
            periode = 1;
            aktif = true;
            jmlMaks = 10;
            minX = 0;
            minY = 0;
            MaxX = 240;
            maxY = 320;
            konfigure(p) {
                p.x = this.minX + (Math.random() * Math.abs(this.MaxX - this.minY));
                p.y = this.minY + (Math.random() * Math.abs(this.maxY - this.minY));
                p.umur = 0;
            }
        }
        class Pabrik {
            aktif;
        }
        class PartikelObj {
            aktif = false;
            x = 0;
            y = 0;
            konf;
            sudut = -90;
            alpha = 1;
            umur = 0;
            update() {
                this.y -= Math.random() * 3;
                //sudut
                //skala
                //rotasi
                //alpha
                this.alpha -= Math.random() * .1 + .1;
                if (this.alpha < 0)
                    this.alpha = 0;
                this.umur++;
            }
        }
        class Partikel {
            list = [];
            konfItem = new KonfigurasiItem();
            konfPabrik = new KonfigurasiPabrik();
            pabrik = new Pabrik();
            constructor() {
                this.konfItem;
                this.konfPabrik;
                this.pabrik;
            }
            items() {
                return this.list;
            }
            buat() {
                let part;
                //ambil yang sudah tidak aktif
                //buat baru bila belum ada
                this.list.forEach((item) => {
                    if (item.aktif == false) {
                        item.aktif = true;
                        part = item;
                        return;
                    }
                });
                if (!part && this.list.length < this.konfPabrik.jmlMaks) {
                    part = new PartikelObj();
                    part.konf = this.konfItem;
                    this.list.push(part);
                }
                //set partikel awal dari konfigurasi
                // part.konf = this.konfItem;
                if (part) {
                    this.konfPabrik.konfigure(part);
                }
                return part;
            }
            update() {
                this.buat();
                this.list.forEach((item) => {
                    if (item.aktif) {
                        item.update();
                        if (item.umur > this.konfItem.umurMaks) {
                            item.aktif = false;
                        }
                    }
                });
            }
        }
        partikel.Partikel = Partikel;
    })(partikel = ha.partikel || (ha.partikel = {}));
})(ha || (ha = {}));
