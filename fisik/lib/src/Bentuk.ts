namespace ha.fb {
    class BentukObj {
        private _id: number = 0;
        readonly bola: BolaObj[] = [];

        public get id(): number {
            return this._id;
        }
        public set id(value: number) {
            this._id = value;
        }
    }

    class Bentuk {
        readonly list: BentukObj[] = [];

        buat(str: string[] = []): BentukObj {
            let h: BentukObj = new BentukObj();

            this.bola(h, str, id.id);

            this.list.push(h);
            return h;
        }

        bola(bentuk: BentukObj, strAr: string[], id: number): void {
            console.log(strAr);
            for (let y: number = 0; y < strAr.length; y++) {
                let str2: string = strAr[y];
                console.log(str2);
                for (let x: number = 0; x < str2.length; x++) {
                    let char: string = str2[x].toLowerCase();
                    if ('x' == char) {
                        let bl: BolaObj = bola.buatBola();
                        bl.groupId = id;
                        bl.r = 16;
                        bl.x = x * 32;
                        bl.y = y * 32;

                        if (bentuk.bola[0]) {
                            kt.buat(bentuk.bola[0], bl);
                        }

                        if (bentuk.bola.length > 1) {
                            kt.buat(bentuk.bola[bentuk.bola.length - 1], bl);
                        }

                        bentuk.bola.push(bl);
                    }
                }
            }
        }

        debug(bl: BentukObj, ctx: CanvasRenderingContext2D): void {
            bl.bola.forEach((b) => {
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
                ctx.stroke();
            })
        }

        update(): void {
            //update semua bentuk
        }

    }

    export const bentuk = new Bentuk();
}