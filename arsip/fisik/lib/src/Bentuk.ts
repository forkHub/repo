namespace ha.fb {
    class BentukObj {
        readonly bola: BolaObj[] = [];
        private _id: number = 0;

        public set statik(value: boolean) {
            this.bola.forEach((item) => {
                item.statik = value;
            })
        }

        public get id(): number {
            return this._id;
        }
        public set id(value: number) {
            this._id = value;
        }
    }

    class Bentuk {
        readonly list: BentukObj[] = [];

        geser(b: BentukObj, x: number, y: number) {
            b.bola.forEach((item) => {
                item.x += x;
                item.y += y;
            })
        }

        buat(str: string[] = [], id = 0): BentukObj {
            let h: BentukObj = new BentukObj();

            this.bola(h, str, id);
            this.konst2(h);

            this.list.push(h);
            return h;
        }

        private dekat(b: BentukObj, bl: BolaObj): BolaObj {
            let h: BolaObj = null;
            let jarak = 999999;

            b.bola.forEach((item) => {
                if (item == bl) return;
                let jarak2 = geom.Transform.jarak(item.x, item.y, bl.x, bl.y);
                let k = kt.checkAda(bl, item);
                if (k) return;

                if (jarak2 < jarak) {
                    jarak = jarak2;
                    h = item;
                }
            })

            return h;
        }

        bola(bentuk: BentukObj, strAr: string[], id: number): void {
            // console.log(strAr);
            for (let y: number = 0; y < strAr.length; y++) {
                let str2: string = strAr[y];
                // console.log(str2);
                for (let x: number = 0; x < str2.length; x++) {
                    let char: string = str2[x].toLowerCase();

                    if (' ' != char) {

                        let bl: BolaObj = bola.buatBola();
                        bl.groupId = id;
                        bl.r = 8;
                        bl.x = x * bl.r * 2;
                        bl.y = y * bl.r * 2;
                        bl.label = char;

                        bentuk.bola.push(bl);
                    }
                }
            }
        }

        konst2(bentuk: BentukObj): void {
            for (let i = 0; i < bentuk.bola.length; i++) {
                for (let j = i + 1; j < bentuk.bola.length; j++) {
                    kt.buat(bentuk.bola[i], bentuk.bola[j]);
                }
            }
        }

        konst(bentuk: BentukObj): void {
            bentuk.bola.forEach((item) => {
                for (let j = 0; j < 3; j++) {
                    let dekat = this.dekat(bentuk, item);
                    if (dekat) {
                        kt.buat(dekat, item);
                    }
                }

                if (bentuk.bola[0]) {
                    kt.buat(bentuk.bola[0], item);
                }

                if (bentuk.bola.length > 1) {
                    kt.buat(bentuk.bola[bentuk.bola.length - 1], item);
                }
            })
        }

        debug(bl: BentukObj, ctx: CanvasRenderingContext2D, offx = 0, offy = 0): void {
            bl.bola.forEach((b) => {
                ctx.beginPath();
                ctx.arc(b.x + offx, b.y + offy, b.r, 0, 2 * Math.PI);
                ctx.stroke();

                if (b.statik) {
                    ctx.beginPath();
                    ctx.arc(b.x + offx, b.y + offy, b.r / 3, 0, 2 * Math.PI);
                    ctx.stroke();
                }
            })
        }

        update(): void {
            //update semua bentuk
        }

    }

    export const bentuk = new Bentuk();
}