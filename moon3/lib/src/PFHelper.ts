namespace fg {
    export class PFHelper {

        static readonly ATAS: number = 1;
        static readonly KANAN: number = 2;
        static readonly BAWAH: number = 3;
        static readonly KIRI: number = 4;

        static readonly KANAN_ATAS: number = 5;
        static readonly KANAN_BAWAH: number = 6;
        static readonly KIRI_ATAS: number = 7;
        static readonly KIRI_BAWAH: number = 8;

        private ruteJalan: Array<any> = [];
        private _cellWidth: number = 32;
        private _cellHeight: number = 32;
        private _langkahTotal: number = 3;
        private _langkahIdx: number = 0;
        private jalanIdx: number = 0;
        private _pos: Point = new Point();
        private posTemp: Point = new Point();
        private _arah: number = PFHelper.BAWAH;
        private _updateArahCallBack: Function;

        private _sedangJalan: Boolean = false;

        constructor() {

        }

        reset(): void {
            this._sedangJalan = false;
        }

        start(data: Array<any>): void {
            if (data.length == 0) {
                throw new Error();
            }

            this.ruteJalan = data;
            this._sedangJalan = true;
            this.jalanIdx = 0;
            this.updateArah();

            this._pos.x = data[0][0] * this._cellWidth;
            this._pos.y = data[0][1] * this._cellHeight;
        }

        private updateArah(): void {
            let x1: number;
            let y1: number;

            let x2: number;
            let y2: number;

            if (this.jalanIdx >= this.ruteJalan.length - 1) {
                return;
            }

            x1 = this.ruteJalan[this.jalanIdx][0];
            y1 = this.ruteJalan[this.jalanIdx][1];

            x2 = this.ruteJalan[this.jalanIdx + 1][0];
            y2 = this.ruteJalan[this.jalanIdx + 1][1];

            // console.log("x2 " + x2 + '/y2 ' + y2 + '/x1 ' + x1 + '/y1 ' + y1);
            // console.log(y1 + '-' + x1 + '/' + y2 + '-' + x2);

            if (x1 == x2) {
                if (y1 > y2) {
                    this._arah = PFHelper.ATAS;
                    return;
                }
                else if (y1 < y2) {
                    this._arah = PFHelper.BAWAH;
                    return;
                }
            }
            else if (y1 == y2) {
                if (x1 > x2) {
                    this._arah = PFHelper.KIRI;
                    return;
                }
                else if (x1 < x2) {
                    this._arah = PFHelper.KANAN;
                    return;
                }
            }

            else if (x1 > x2) {
                //kiri - atas
                if (y1 > y2) {
                    this._arah = PFHelper.KIRI_ATAS;
                    // console.log('kiri atas');
                    return;
                }

                //kiri - bawah
                else if (y1 < y2) {
                    this._arah = PFHelper.KIRI_BAWAH;
                    return;
                }
            }

            else if (x1 < x2) {
                //kanan-atas
                if (y1 > y2) {
                    this._arah = PFHelper.KANAN_ATAS;
                    return;
                }

                //kanan-bawah
                else if (y1 < y2) {
                    this._arah = PFHelper.KANAN_BAWAH;
                    // console.log('kanan bawah');
                    return;
                }

            }

            throw new Error();
        }

        // console.log("WARN: arah tidak terdefinisi x1 " + x1 + '/y1 ' + y1 + '/x2' + x2 + '/y2 ' + y2);
        // console.log('rute jalan: ' + this.ruteJalan);
        // console.log('jalan idx ' + this.jalanIdx);
        private updatePos(): void {
            this._pos.x = this.ruteJalan[this.jalanIdx][0] * this._cellWidth;
            this._pos.y = this.ruteJalan[this.jalanIdx][1] * this._cellHeight;

            if (this.jalanIdx < this.ruteJalan.length - 1) {
                this.posTemp.x = this.ruteJalan[this.jalanIdx + 1][0] * this._cellWidth;
                this.posTemp.y = this.ruteJalan[this.jalanIdx + 1][1] * this._cellHeight;

                this._pos.x = this._pos.x + (this._langkahIdx / this._langkahTotal) * (this.posTemp.x - this._pos.x);
                this._pos.y = this._pos.y + (this._langkahIdx / this._langkahTotal) * (this.posTemp.y - this._pos.y);
            }
        }

        // private gantiCell(): boolean {
        //     return true;
        // }

        update(): void {
            if (this._sedangJalan) {
                this._langkahIdx++;
                if (this._langkahIdx >= this._langkahTotal) {
                    this._langkahIdx = 0;

                    this.jalanIdx++;
                    if (this.jalanIdx >= this.ruteJalan.length - 1) {
                        this._sedangJalan = false;
                        this.jalanIdx = this.ruteJalan.length - 1;
                    }

                    this.updateArah();
                    // console.log('hasil arah ' + this._arah);
                    if (this._updateArahCallBack) {
                        this._updateArahCallBack();
                    }
                }

                this.updatePos();
            }
        }

        get cellWidth(): number {
            return this._cellWidth;
        }

        set cellWidth(value: number) {
            this._cellWidth = value;
        }

        get cellHeight(): number {
            return this._cellHeight;
        }

        set cellHeight(value: number) {
            this._cellHeight = value;
        }

        get langkahTotal(): number {
            return this._langkahTotal;
        }

        set langkahTotal(value: number) {
            this._langkahTotal = value;
        }

        get pos(): Point {
            return this._pos;
        }

        set pos(value: Point) {
            this._pos = value;
        }

        get sedangJalan(): Boolean {
            return this._sedangJalan;
        }

        public get arah(): number {
            return this._arah;
        }
        public set arah(value: number) {
            this._arah = value;
        }

        public get updateArahCallBack(): Function {
            return this._updateArahCallBack;
        }
        public set updateArahCallBack(value: Function) {
            this._updateArahCallBack = value;
        }

    }

}