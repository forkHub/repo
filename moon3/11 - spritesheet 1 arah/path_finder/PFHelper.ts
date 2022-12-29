namespace fg {
    export class PFHelper {

        private ruteJalan: Array<any> = [];
        private _cellWidth: number = 32;
        private _cellHeight: number = 32;
        private _langkahTotal: number = 3;
        private _langkahIdx: number = 0;
        private jalanIdx: number = 0;
        private _pos: Point = new Point();
        private posTemp: Point = new Point();

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

            this._pos.x = data[0][0] * this._cellWidth;
            this._pos.y = data[0][1] * this._cellHeight;
        }

        updatePos(): void {
            this._pos.x = this.ruteJalan[this.jalanIdx][0] * this._cellWidth;
            this._pos.y = this.ruteJalan[this.jalanIdx][1] * this._cellHeight;

            if (this.jalanIdx < this.ruteJalan.length - 1) {
                this.posTemp.x = this.ruteJalan[this.jalanIdx + 1][0] * this._cellWidth;
                this.posTemp.y = this.ruteJalan[this.jalanIdx + 1][1] * this._cellHeight;

                this._pos.x = this._pos.x + (this._langkahIdx / this._langkahTotal) * (this.posTemp.x - this._pos.x);
                this._pos.y = this._pos.y + (this._langkahIdx / this._langkahTotal) * (this.posTemp.y - this._pos.y);
            }
        }

        update(): void {
            if (this._sedangJalan) {
                this._langkahIdx++;
                if (this._langkahIdx >= this._langkahTotal) {
                    this.jalanIdx++;
                    this._langkahIdx = 0;
                    if (this.jalanIdx >= this.ruteJalan.length - 1) {
                        this._sedangJalan = false;
                        this.jalanIdx = this.ruteJalan.length - 1;
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

    }

}